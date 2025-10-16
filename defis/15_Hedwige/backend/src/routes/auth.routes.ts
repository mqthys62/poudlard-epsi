/**
 * Routes d'authentification
 * Défi #15 - Hedwige
 */

import { Router } from 'express';
import passport from 'passport';
import * as authController from '../controllers/auth.controller';
import { authMiddleware } from '../middleware/auth.middleware';

const router = Router();

// Routes classiques
router.post('/login', authController.login);
router.post('/register', authController.register);
router.post('/refresh', authController.refreshToken);
router.post('/logout', authController.logout);
router.get('/me', authMiddleware, authController.me);

// OAuth Google
router.get('/oauth/google',
  passport.authenticate('google', { scope: ['profile', 'email'] })
);

router.get('/oauth/google/callback',
  passport.authenticate('google', { session: false, failureRedirect: '/login' }),
  authController.oauthGoogleCallback
);

// OAuth Microsoft
router.get('/oauth/microsoft',
  passport.authenticate('microsoft', { scope: ['user.read'] })
);

router.get('/oauth/microsoft/callback',
  passport.authenticate('microsoft', { session: false, failureRedirect: '/login' }),
  authController.oauthGoogleCallback // Même handler
);

// OAuth GitHub
router.get('/oauth/github',
  passport.authenticate('github', { scope: ['user:email'] })
);

router.get('/oauth/github/callback',
  passport.authenticate('github', { session: false, failureRedirect: '/login' }),
  authController.oauthGoogleCallback // Même handler
);

export default router;

