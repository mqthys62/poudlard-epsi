/**
 * Middleware d'authentification JWT
 * Défi #15 - Hedwige
 */

import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import { logger } from '../utils/logger';

const JWT_SECRET = process.env.JWT_SECRET || 'dev_secret';

export async function authMiddleware(
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> {
  try {
    // Récupérer le token depuis le header Authorization
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      res.status(401).json({ error: 'Token manquant' });
      return;
    }

    const token = authHeader.substring(7); // Enlever "Bearer "

    // Vérifier et décoder le token
    const decoded = jwt.verify(token, JWT_SECRET) as { userId: string };

    // Ajouter userId à la requête
    (req as any).userId = decoded.userId;

    next();
  } catch (error) {
    if (error instanceof jwt.TokenExpiredError) {
      res.status(401).json({ error: 'Token expiré' });
    } else if (error instanceof jwt.JsonWebTokenError) {
      res.status(401).json({ error: 'Token invalide' });
    } else {
      logger.error('❌ Erreur auth middleware:', error);
      res.status(500).json({ error: 'Erreur serveur' });
    }
  }
}

