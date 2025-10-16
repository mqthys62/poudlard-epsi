/**
 * Email Controller - Gestion des emails
 * Défi #15 - Hedwige - Workshop Poudlard RP 2025
 */

import { Request, Response } from 'express';
import { prisma } from '../database/client';
import { emailService } from '../services/email.service';
import { logger } from '../utils/logger';

/**
 * Récupérer la liste des emails
 */
export async function getEmails(req: Request, res: Response): Promise<void> {
  try {
    const userId = (req as any).userId;
    const { folder = 'inbox', limit = 50, offset = 0 } = req.query;

    const emails = await prisma.email.findMany({
      where: {
        userId,
        folder: folder as string,
        deletedAt: null,
      },
      orderBy: { createdAt: 'desc' },
      take: Number(limit),
      skip: Number(offset),
    });

    const total = await prisma.email.count({
      where: {
        userId,
        folder: folder as string,
        deletedAt: null,
      },
    });

    res.json({
      emails,
      total,
      limit: Number(limit),
      offset: Number(offset),
    });
  } catch (error) {
    logger.error('❌ Erreur getEmails:', error);
    res.status(500).json({ error: 'Erreur serveur' });
  }
}

/**
 * Récupérer un email par ID
 */
export async function getEmailById(req: Request, res: Response): Promise<void> {
  try {
    const userId = (req as any).userId;
    const { id } = req.params;

    const email = await prisma.email.findFirst({
      where: {
        id,
        userId,
        deletedAt: null,
      },
    });

    if (!email) {
      res.status(404).json({ error: 'Email non trouvé' });
      return;
    }

    // Marquer comme lu automatiquement
    if (!email.isRead) {
      await prisma.email.update({
        where: { id },
        data: { isRead: true },
      });
    }

    res.json(email);
  } catch (error) {
    logger.error('❌ Erreur getEmailById:', error);
    res.status(500).json({ error: 'Erreur serveur' });
  }
}

/**
 * Envoyer un email
 */
export async function sendEmail(req: Request, res: Response): Promise<void> {
  try {
    const userId = (req as any).userId;
    const { to, cc, bcc, subject, body, html, attachments } = req.body;

    // Validation
    if (!to || !subject) {
      res.status(400).json({ error: 'Destinataire et sujet requis' });
      return;
    }

    // Récupérer l'utilisateur pour l'adresse from
    const user = await prisma.user.findUnique({ where: { id: userId } });

    if (!user) {
      res.status(404).json({ error: 'Utilisateur non trouvé' });
      return;
    }

    // Envoyer via le service email
    const emailId = await emailService.sendEmail(
      {
        from: user.email,
        to,
        cc,
        bcc,
        subject,
        text: body,
        html,
        attachments,
      },
      userId
    );

    const sentEmail = await prisma.email.findUnique({ where: { id: emailId } });

    logger.info(`📧 Email envoyé par ${user.email}: ${subject}`);

    res.status(201).json(sentEmail);
  } catch (error) {
    logger.error('❌ Erreur sendEmail:', error);
    res.status(500).json({ error: 'Erreur lors de l\'envoi' });
  }
}

/**
 * Marquer un email comme lu/non lu
 */
export async function toggleReadStatus(req: Request, res: Response): Promise<void> {
  try {
    const userId = (req as any).userId;
    const { id } = req.params;
    const { isRead } = req.body;

    const email = await prisma.email.updateMany({
      where: {
        id,
        userId,
        deletedAt: null,
      },
      data: { isRead },
    });

    if (email.count === 0) {
      res.status(404).json({ error: 'Email non trouvé' });
      return;
    }

    res.json({ message: 'Statut mis à jour' });
  } catch (error) {
    logger.error('❌ Erreur toggleReadStatus:', error);
    res.status(500).json({ error: 'Erreur serveur' });
  }
}

/**
 * Supprimer un email (déplacer vers la corbeille)
 */
export async function deleteEmail(req: Request, res: Response): Promise<void> {
  try {
    const userId = (req as any).userId;
    const { id } = req.params;

    await emailService.deleteEmail(id, userId);

    res.json({ message: 'Email supprimé' });
  } catch (error) {
    logger.error('❌ Erreur deleteEmail:', error);
    res.status(500).json({ error: 'Erreur serveur' });
  }
}

/**
 * Rechercher des emails
 */
export async function searchEmails(req: Request, res: Response): Promise<void> {
  try {
    const userId = (req as any).userId;
    const { q } = req.query;

    if (!q) {
      res.status(400).json({ error: 'Query de recherche requise' });
      return;
    }

    const emails = await emailService.searchEmails(userId, q as string);

    res.json({ emails, count: emails.length });
  } catch (error) {
    logger.error('❌ Erreur searchEmails:', error);
    res.status(500).json({ error: 'Erreur serveur' });
  }
}

/**
 * Synchroniser les emails (IMAP fetch)
 */
export async function syncEmails(req: Request, res: Response): Promise<void> {
  try {
    const userId = (req as any).userId;

    // Récupérer les nouveaux emails via IMAP
    const newEmails = await emailService.fetchEmails(userId, 'INBOX', 50);

    res.json({
      message: 'Synchronisation terminée',
      count: newEmails.length,
      emails: newEmails,
    });
  } catch (error) {
    logger.error('❌ Erreur syncEmails:', error);
    res.status(500).json({ error: 'Erreur de synchronisation' });
  }
}

/**
 * Marquer comme favori
 */
export async function toggleStar(req: Request, res: Response): Promise<void> {
  try {
    const userId = (req as any).userId;
    const { id } = req.params;
    const { isStarred } = req.body;

    const email = await prisma.email.updateMany({
      where: {
        id,
        userId,
        deletedAt: null,
      },
      data: { isStarred },
    });

    if (email.count === 0) {
      res.status(404).json({ error: 'Email non trouvé' });
      return;
    }

    res.json({ message: 'Favoris mis à jour' });
  } catch (error) {
    logger.error('❌ Erreur toggleStar:', error);
    res.status(500).json({ error: 'Erreur serveur' });
  }
}

