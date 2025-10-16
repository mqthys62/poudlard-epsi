/**
 * Routes des emails
 * Défi #15 - Hedwige
 */

import { Router } from 'express';
import * as emailController from '../controllers/email.controller';
import { authMiddleware } from '../middleware/auth.middleware';

const router = Router();

// Toutes les routes nécessitent l'authentification
router.use(authMiddleware);

// Liste et détails
router.get('/', emailController.getEmails);
router.get('/search', emailController.searchEmails);
router.get('/:id', emailController.getEmailById);

// Actions
router.post('/', emailController.sendEmail);
router.post('/sync', emailController.syncEmails);

// Mise à jour
router.put('/:id/read', emailController.toggleReadStatus);
router.put('/:id/star', emailController.toggleStar);

// Suppression
router.delete('/:id', emailController.deleteEmail);

export default router;

