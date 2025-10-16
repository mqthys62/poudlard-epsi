# Backend Dockerfile - Hedwige
# Défi #15 - Workshop Poudlard RP 2025

FROM node:20-alpine AS base

# Installer OpenSSL pour Prisma
RUN apk add --no-cache openssl

WORKDIR /app

# Installer les dépendances
COPY package*.json ./
RUN npm install

# Copier le code source
COPY . .

# Générer le client Prisma
RUN npx prisma generate

# Development
FROM base AS development
EXPOSE 3001
CMD ["npm", "run", "dev"]

# Production build
FROM base AS builder
RUN npm run build

# Production
FROM node:20-alpine AS production

# Installer OpenSSL pour Prisma
RUN apk add --no-cache openssl

WORKDIR /app

# Copier les dépendances de production
COPY package*.json ./
RUN npm install --omit=dev

# Copier le build
COPY --from=builder /app/dist ./dist
COPY --from=builder /app/prisma ./prisma
COPY --from=builder /app/node_modules/.prisma ./node_modules/.prisma

EXPOSE 3001

CMD ["node", "dist/index.js"]

