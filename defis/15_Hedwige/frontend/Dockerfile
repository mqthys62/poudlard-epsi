# Frontend Dockerfile - Hedwige
# Défi #15 - Workshop Poudlard RP 2025

FROM node:20-alpine AS base

WORKDIR /app

# Installer les dépendances
COPY package*.json ./
RUN npm install

# Copier le code source
COPY . .

# Development
FROM base AS development
EXPOSE 5173
CMD ["npm", "run", "dev", "--", "--host"]

# Production build
FROM base AS builder
RUN npm run build

# Production - Serveur nginx
FROM nginx:alpine AS production

# Copier le build
COPY --from=builder /app/dist /usr/share/nginx/html

# Config nginx
COPY nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]

