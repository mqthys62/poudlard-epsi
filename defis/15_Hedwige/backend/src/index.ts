/**
 * Serveur principal Hedwige
 * Défi #15 - Workshop Poudlard RP 2025
 */

import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import compression from 'compression';
import rateLimit from 'express-rate-limit';
import dotenv from 'dotenv';
import passport from 'passport';
import { logger } from './utils/logger';

// Routes
import authRoutes from './routes/auth.routes';
import emailRoutes from './routes/email.routes';

// Charger les variables d'environnement
dotenv.config();

const app = express();
const PORT = process.env.PORT || 3001;

// ============================================
// MIDDLEWARES GLOBAUX
// ============================================

// Sécurité
app.use(helmet());

// CORS
app.use(cors({
  origin: process.env.FRONTEND_URL || 'http://localhost:5173',
  credentials: true,
}));

// Compression
app.use(compression());

// Body parsing
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));

// Rate limiting
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // limite de 100 requêtes par IP
  message: 'Trop de requêtes, veuillez réessayer plus tard',
});
app.use('/api/', limiter);

// Passport initialization
app.use(passport.initialize());

// ============================================
// ROUTES
// ============================================

// Health check
app.get('/health', (req, res) => {
  res.json({ 
    status: 'OK', 
    timestamp: new Date().toISOString(),
    service: 'Hedwige API',
  });
});

// API Routes
app.use('/api/auth', authRoutes);
app.use('/api/emails', emailRoutes);

// Route 404
app.use('*', (req, res) => {
  res.status(404).json({ error: 'Route non trouvée' });
});

// ============================================
// ERROR HANDLER
// ============================================

app.use((err: any, req: express.Request, res: express.Response, next: express.NextFunction) => {
  logger.error('❌ Erreur serveur:', err);
  
  res.status(err.status || 500).json({
    error: process.env.NODE_ENV === 'production' 
      ? 'Erreur serveur' 
      : err.message,
  });
});

// ============================================
// DÉMARRAGE DU SERVEUR
// ============================================

app.listen(PORT, () => {
  logger.info(`
╔════════════════════════════════════════════╗
║                                            ║
║     🦉 HEDWIGE API - DÉMARRÉ              ║
║                                            ║
║     Port: ${PORT}                            ║
║     Env: ${process.env.NODE_ENV || 'development'}                ║
║     URL: http://localhost:${PORT}            ║
║                                            ║
║     Défi #15 - Workshop Poudlard RP       ║
║     Maison Géminiard 🦅                    ║
║                                            ║
╚════════════════════════════════════════════╝
  `);
});

// Gestion des erreurs non gérées
process.on('unhandledRejection', (reason, promise) => {
  logger.error('❌ Unhandled Rejection:', reason);
});

process.on('uncaughtException', (error) => {
  logger.error('❌ Uncaught Exception:', error);
  process.exit(1);
});

