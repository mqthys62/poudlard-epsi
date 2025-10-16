/**
 * Auth Controller - Authentification et OAuth2.0
 * Défi #15 - Hedwige - Workshop Poudlard RP 2025
 */

import { Request, Response } from 'express';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { prisma } from '../database/client';
import { logger } from '../utils/logger';

const JWT_SECRET = process.env.JWT_SECRET || 'dev_secret';
const JWT_REFRESH_SECRET = process.env.JWT_REFRESH_SECRET || 'dev_refresh_secret';

/**
 * Génère un access token JWT
 */
function generateAccessToken(userId: string): string {
  return jwt.sign({ userId }, JWT_SECRET, { expiresIn: '15m' });
}

/**
 * Génère un refresh token JWT
 */
function generateRefreshToken(userId: string): string {
  return jwt.sign({ userId }, JWT_REFRESH_SECRET, { expiresIn: '7d' });
}

/**
 * Login avec email/password
 */
export async function login(req: Request, res: Response): Promise<void> {
  try {
    const { email, password } = req.body;

    // Validation
    if (!email || !password) {
      res.status(400).json({ error: 'Email et mot de passe requis' });
      return;
    }

    // Trouver l'utilisateur
    const user = await prisma.user.findUnique({ where: { email } });

    if (!user || !user.password) {
      res.status(401).json({ error: 'Identifiants invalides' });
      return;
    }

    // Vérifier le mot de passe
    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
      res.status(401).json({ error: 'Identifiants invalides' });
      return;
    }

    // Générer les tokens
    const accessToken = generateAccessToken(user.id);
    const refreshToken = generateRefreshToken(user.id);

    // Sauvegarder le refresh token
    await prisma.session.create({
      data: {
        userId: user.id,
        refreshToken,
        expiresAt: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000), // 7 jours
      },
    });

    logger.info(`✅ Login réussi pour ${email}`);

    res.json({
      accessToken,
      refreshToken,
      user: {
        id: user.id,
        email: user.email,
        name: user.name,
        avatar: user.avatar,
      },
    });
  } catch (error) {
    logger.error('❌ Erreur login:', error);
    res.status(500).json({ error: 'Erreur serveur' });
  }
}

/**
 * Register - Inscription
 */
export async function register(req: Request, res: Response): Promise<void> {
  try {
    const { email, password, name } = req.body;

    // Validation
    if (!email || !password) {
      res.status(400).json({ error: 'Email et mot de passe requis' });
      return;
    }

    // Vérifier si l'email existe
    const existingUser = await prisma.user.findUnique({ where: { email } });

    if (existingUser) {
      res.status(409).json({ error: 'Email déjà utilisé' });
      return;
    }

    // Hasher le mot de passe
    const hashedPassword = await bcrypt.hash(password, 10);

    // Créer l'utilisateur
    const user = await prisma.user.create({
      data: {
        email,
        password: hashedPassword,
        name: name || email.split('@')[0],
      },
    });

    // Générer les tokens
    const accessToken = generateAccessToken(user.id);
    const refreshToken = generateRefreshToken(user.id);

    // Sauvegarder le refresh token
    await prisma.session.create({
      data: {
        userId: user.id,
        refreshToken,
        expiresAt: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
      },
    });

    logger.info(`✅ Nouvel utilisateur créé: ${email}`);

    res.status(201).json({
      accessToken,
      refreshToken,
      user: {
        id: user.id,
        email: user.email,
        name: user.name,
        avatar: user.avatar,
      },
    });
  } catch (error) {
    logger.error('❌ Erreur registration:', error);
    res.status(500).json({ error: 'Erreur serveur' });
  }
}

/**
 * Refresh token - Renouveler l'access token
 */
export async function refreshToken(req: Request, res: Response): Promise<void> {
  try {
    const { refreshToken } = req.body;

    if (!refreshToken) {
      res.status(400).json({ error: 'Refresh token requis' });
      return;
    }

    // Vérifier le refresh token
    const decoded = jwt.verify(refreshToken, JWT_REFRESH_SECRET) as { userId: string };

    // Vérifier si la session existe
    const session = await prisma.session.findUnique({
      where: { refreshToken },
      include: { user: true },
    });

    if (!session || session.expiresAt < new Date()) {
      res.status(401).json({ error: 'Refresh token invalide ou expiré' });
      return;
    }

    // Générer un nouveau access token
    const newAccessToken = generateAccessToken(session.userId);

    res.json({
      accessToken: newAccessToken,
    });
  } catch (error) {
    logger.error('❌ Erreur refresh token:', error);
    res.status(401).json({ error: 'Refresh token invalide' });
  }
}

/**
 * Logout
 */
export async function logout(req: Request, res: Response): Promise<void> {
  try {
    const { refreshToken } = req.body;

    if (refreshToken) {
      // Supprimer la session
      await prisma.session.deleteMany({
        where: { refreshToken },
      });
    }

    res.json({ message: 'Déconnexion réussie' });
  } catch (error) {
    logger.error('❌ Erreur logout:', error);
    res.status(500).json({ error: 'Erreur serveur' });
  }
}

/**
 * Callback OAuth Google
 */
export async function oauthGoogleCallback(req: Request, res: Response): Promise<void> {
  try {
    // L'utilisateur est déjà authentifié par Passport
    const user = req.user as any;

    if (!user) {
      res.status(401).json({ error: 'Authentification OAuth échouée' });
      return;
    }

    // Générer les tokens
    const accessToken = generateAccessToken(user.id);
    const refreshToken = generateRefreshToken(user.id);

    // Sauvegarder le refresh token
    await prisma.session.create({
      data: {
        userId: user.id,
        refreshToken,
        expiresAt: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
      },
    });

    logger.info(`✅ OAuth Google réussi pour ${user.email}`);

    // Redirection vers le frontend avec les tokens
    res.redirect(`${process.env.FRONTEND_URL}/auth/callback?accessToken=${accessToken}&refreshToken=${refreshToken}`);
  } catch (error) {
    logger.error('❌ Erreur OAuth Google:', error);
    res.status(500).json({ error: 'Erreur serveur' });
  }
}

/**
 * Me - Récupérer l'utilisateur connecté
 */
export async function me(req: Request, res: Response): Promise<void> {
  try {
    const userId = (req as any).userId; // Ajouté par le middleware auth

    const user = await prisma.user.findUnique({
      where: { id: userId },
      select: {
        id: true,
        email: true,
        name: true,
        avatar: true,
        emailVerified: true,
        createdAt: true,
      },
    });

    if (!user) {
      res.status(404).json({ error: 'Utilisateur non trouvé' });
      return;
    }

    res.json(user);
  } catch (error) {
    logger.error('❌ Erreur me:', error);
    res.status(500).json({ error: 'Erreur serveur' });
  }
}

