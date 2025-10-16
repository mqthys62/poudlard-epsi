/**
 * Prisma Client Instance
 * Défi #15 - Hedwige
 */

import { PrismaClient } from '@prisma/client';
import { logger } from '../utils/logger';

// Créer l'instance Prisma
const prisma = new PrismaClient({
  log: process.env.NODE_ENV === 'development' 
    ? ['query', 'error', 'warn']
    : ['error'],
});

// Gérer la connexion
prisma.$connect()
  .then(() => {
    logger.info('✅ Connexion à la base de données établie');
  })
  .catch((error) => {
    logger.error('❌ Erreur de connexion à la base de données:', error);
    process.exit(1);
  });

// Gérer la fermeture propre
process.on('beforeExit', async () => {
  await prisma.$disconnect();
  logger.info('🔌 Déconnexion de la base de données');
});

export { prisma };

