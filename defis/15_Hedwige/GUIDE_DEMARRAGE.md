# 🦉 Hedwige - Guide de Démarrage

## 🔑 Identifiants de Connexion

```
Email: harry.potter@poudlard.fr
Mot de passe: Poudlard2025!
```

## 🚀 Démarrage Rapide

### 1. Lancer l'application

```bash
cd defis/15_Hedwige
docker-compose up -d
```

### 2. Accéder aux services

| Service | URL | Description |
|---------|-----|-------------|
| **Frontend** | http://localhost:5173 | Interface utilisateur |
| **Backend API** | http://localhost:3001 | API REST |
| **MailHog** | http://localhost:8025 | Interface de test email |
| **PostgreSQL** | localhost:5432 | Base de données |
| **Redis** | localhost:6379 | Cache et sessions |

### 3. Se connecter

1. Ouvrir http://localhost:5173
2. Utiliser les identifiants ci-dessus
3. Vous verrez 3 emails de démo dans la boîte de réception

## 📧 Emails de Démo

Après connexion, vous trouverez :

1. **De Dumbledore** : "Bienvenue à Poudlard !" ⭐
2. **De Hermione** : "Devoirs de Potions"
3. **De Ron** : "Match de Quidditch" (lu)

## 🛠️ Commandes Utiles

### Voir les logs

```bash
# Backend
docker logs hedwige-backend -f

# Frontend
docker logs hedwige-frontend -f

# Tous les services
docker-compose logs -f
```

### Arrêter l'application

```bash
docker-compose down
```

### Recréer la base de données

```bash
docker-compose down -v  # Supprime les volumes
docker-compose up -d    # Relance tout
docker exec hedwige-backend npx prisma migrate dev --name init
docker exec hedwige-backend npm run seed
```

### Accéder au shell backend

```bash
docker exec -it hedwige-backend sh
```

## 🏗️ Architecture

```
Hedwige
├── Backend (Node.js + Express + Prisma)
│   ├── API REST sur port 3001
│   ├── PostgreSQL pour les données
│   ├── Redis pour les sessions
│   └── JWT pour l'authentification
│
├── Frontend (React + Vite + Tailwind)
│   ├── Interface sur port 5173
│   ├── React Query pour les données
│   ├── Zustand pour l'état global
│   └── PatronusLoader (Défi #9)
│
└── Services auxiliaires
    ├── MailHog (test SMTP/IMAP)
    └── Adminer (UI base de données)
```

## ✨ Fonctionnalités Implémentées

- ✅ Authentification JWT
- ✅ Gestion des emails (CRUD)
- ✅ Interface moderne avec Patronus Loader
- ✅ Base de données PostgreSQL
- ✅ Cache Redis
- ✅ API REST complète
- ✅ Tests avec MailHog
- ✅ Docker Compose multi-services

## 📝 Variables d'Environnement

Les variables sont configurées dans `docker-compose.yml` :

```yaml
# Backend
NODE_ENV: development
PORT: 3001
DATABASE_URL: postgresql://hedwige_user:hedwige_password_dev@postgres:5432/hedwige
REDIS_URL: redis://redis:6379
JWT_SECRET: dev_jwt_secret_change_in_production

# Frontend
VITE_API_URL: http://localhost:3001/api
VITE_APP_NAME: Hedwige
VITE_APP_VERSION: 1.0.0
```

## 🎯 Points du Défi

**Défi #15 : Hedwige - 80 points** ✅

Intégration bonus :
- Défi #9 : PatronusLoader (animation de chargement)

## 🐛 Dépannage

### Le backend ne démarre pas

```bash
# Vérifier les logs
docker logs hedwige-backend

# Reconstruire l'image
docker-compose build backend
docker-compose up -d backend
```

### La base de données est vide

```bash
# Exécuter les migrations et le seed
docker exec hedwige-backend npx prisma migrate dev
docker exec hedwige-backend npm run seed
```

### Port déjà utilisé

```bash
# Trouver et arrêter le processus
lsof -i :3001  # ou :5173, :5432, etc.
kill -9 <PID>
```

## 📚 Documentation API

L'API backend expose les endpoints suivants :

### Auth
- `POST /api/auth/register` - Inscription
- `POST /api/auth/login` - Connexion
- `POST /api/auth/logout` - Déconnexion
- `GET /api/auth/me` - Profil utilisateur

### Emails
- `GET /api/emails` - Liste des emails
- `GET /api/emails/:id` - Détail d'un email
- `POST /api/emails` - Envoyer un email
- `DELETE /api/emails/:id` - Supprimer un email
- `PATCH /api/emails/:id/read` - Marquer comme lu
- `PATCH /api/emails/:id/star` - Ajouter/retirer étoile

## 🦅 Maison Géminiard

Développé avec ❤️ pour le Workshop Poudlard RP 2025

---

**Bon test ! 🚀**

