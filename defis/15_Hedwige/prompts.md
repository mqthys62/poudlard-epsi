# FEUILLET DE PROMPTS - Défi #15 : Hedwige

**Défi :** Web app d'envoi/réception de mails avec OAuth2.0  
**Points :** 80 pts  
**Objectif :** Application complète avec front, middleware, tests unitaires  
**Temps estimé :** 5 heures  
**Intégration :** Patronus Loader (#9) pour BONUS

---

## 🎯 PROMPT 1 : Architecture de l'Application

**Prompt utilisé :**
```
Conçois l'architecture complète d'une web application appelée "Hedwige" qui permet :

1. **Fonctionnalités principales :**
   - Envoi et réception d'emails avec compte étudiant
   - Connexion à d'autres services via OAuth2.0 (Google, Microsoft, GitHub)
   - Interface utilisateur moderne et intuitive
   - Gestion des contacts
   - Recherche dans les emails

2. **Stack technique :**
   - Frontend : React + TypeScript + Tailwind CSS
   - Backend : Node.js + Express + TypeScript
   - Base de données : PostgreSQL
   - Auth : OAuth2.0 (Passport.js)
   - Email : IMAP/SMTP (Nodemailer)
   - Tests : Jest + React Testing Library (>80% coverage)

3. **Architecture :**
   Définis :
   - Structure des dossiers (monorepo)
   - API endpoints
   - Modèles de données
   - Flux d'authentification
   - Diagramme d'architecture

Format : Documentation technique détaillée avec diagrammes ASCII.
```

**Résultat obtenu :**

```
ARCHITECTURE HEDWIGE
====================

📁 Structure du Projet (Monorepo)
----------------------------------
hedwige/
├── frontend/                 # Application React
│   ├── src/
│   │   ├── components/      # Composants réutilisables
│   │   │   ├── PatronusLoader/  # Défi #9 intégré !
│   │   │   ├── EmailList/
│   │   │   ├── EmailComposer/
│   │   │   └── Header/
│   │   ├── pages/           # Pages de l'app
│   │   │   ├── Login/
│   │   │   ├── Inbox/
│   │   │   ├── Compose/
│   │   │   └── Settings/
│   │   ├── services/        # API calls
│   │   ├── hooks/           # Custom hooks
│   │   ├── types/           # TypeScript types
│   │   └── utils/
│   ├── tests/               # Tests unitaires
│   └── package.json
│
├── backend/                  # API Node.js
│   ├── src/
│   │   ├── controllers/     # Logique métier
│   │   │   ├── auth.controller.ts
│   │   │   ├── email.controller.ts
│   │   │   └── oauth.controller.ts
│   │   ├── services/        # Services métier
│   │   │   ├── email.service.ts
│   │   │   ├── imap.service.ts
│   │   │   └── smtp.service.ts
│   │   ├── routes/          # Routes API
│   │   ├── middleware/      # Middlewares
│   │   ├── models/          # Modèles DB
│   │   ├── config/          # Configuration
│   │   └── utils/
│   ├── tests/               # Tests unitaires
│   └── package.json
│
├── shared/                   # Code partagé
│   └── types/               # Types partagés
│
├── docker-compose.yml       # Dev environment
├── README.md
└── package.json             # Root package

🔗 API Endpoints
----------------
Auth:
  POST   /api/auth/login              - Login avec email
  POST   /api/auth/oauth/google       - OAuth Google
  POST   /api/auth/oauth/microsoft    - OAuth Microsoft
  POST   /api/auth/oauth/github       - OAuth GitHub
  POST   /api/auth/refresh            - Refresh token
  POST   /api/auth/logout             - Logout

Emails:
  GET    /api/emails                  - Liste des emails
  GET    /api/emails/:id              - Détail email
  POST   /api/emails                  - Envoyer email
  DELETE /api/emails/:id              - Supprimer email
  PUT    /api/emails/:id/read         - Marquer lu
  GET    /api/emails/search?q=        - Rechercher

Contacts:
  GET    /api/contacts                - Liste contacts
  POST   /api/contacts                - Ajouter contact
  DELETE /api/contacts/:id            - Supprimer contact

Services:
  GET    /api/services/connected      - Services connectés
  POST   /api/services/connect        - Connecter service
  DELETE /api/services/:id            - Déconnecter

📊 Modèles de Données
---------------------
User:
  - id: UUID
  - email: string
  - name: string
  - password: hash (optionnel si OAuth)
  - refresh_token: string
  - created_at: timestamp
  - updated_at: timestamp

Email:
  - id: UUID
  - user_id: UUID (FK)
  - from: string
  - to: string[]
  - cc: string[]
  - subject: string
  - body: text
  - html: text
  - attachments: json
  - is_read: boolean
  - is_draft: boolean
  - folder: string (inbox/sent/trash)
  - created_at: timestamp

Contact:
  - id: UUID
  - user_id: UUID (FK)
  - name: string
  - email: string
  - avatar: string
  - created_at: timestamp

OAuthService:
  - id: UUID
  - user_id: UUID (FK)
  - provider: string (google/microsoft/github)
  - access_token: string (encrypted)
  - refresh_token: string (encrypted)
  - expires_at: timestamp
  - created_at: timestamp

🔐 Flux d'Authentification OAuth2.0
------------------------------------
1. User clique "Se connecter avec Google/Microsoft/GitHub"
2. Redirection vers provider OAuth
3. User autorise l'application
4. Provider redirige avec code d'autorisation
5. Backend échange code contre access_token
6. Backend crée/récupère User en DB
7. Backend génère JWT pour l'app
8. Frontend stocke JWT (httpOnly cookie)
9. Requêtes suivantes incluent JWT

🏗️ Diagramme d'Architecture
----------------------------
┌─────────────┐
│   Browser   │
│   (React)   │
└──────┬──────┘
       │ HTTPS
       ▼
┌─────────────────────┐
│   Load Balancer     │
└──────┬──────────────┘
       │
       ▼
┌─────────────────────┐      ┌──────────────┐
│   API Gateway       │◄─────┤  OAuth2.0    │
│   (Express)         │      │  Providers   │
└──────┬──────────────┘      └──────────────┘
       │
       ├──────────┬──────────┬──────────┐
       ▼          ▼          ▼          ▼
  ┌─────────┐ ┌─────────┐ ┌──────┐ ┌──────┐
  │  Auth   │ │  Email  │ │ IMAP │ │ SMTP │
  │ Service │ │ Service │ │Client│ │Client│
  └────┬────┘ └────┬────┘ └──┬───┘ └──┬───┘
       │           │          │        │
       └───────────┴──────────┴────────┘
                   │
                   ▼
            ┌──────────────┐
            │  PostgreSQL  │
            │   Database   │
            └──────────────┘

📈 Tests Unitaires (>80% Coverage)
-----------------------------------
Frontend Tests:
  - Components (React Testing Library)
  - Hooks (custom hooks)
  - Services (API calls mocked)
  - Utils (helpers)

Backend Tests:
  - Controllers (business logic)
  - Services (email, auth)
  - Routes (API endpoints)
  - Middleware (auth, validation)

Coverage Targets:
  - Statements: >80%
  - Branches: >75%
  - Functions: >80%
  - Lines: >80%
```

---

## 🎯 PROMPT 2 : Configuration du Projet et Dépendances

**Prompt utilisé :**
```
Génère tous les fichiers de configuration pour le projet Hedwige :

1. **Package.json** (root, frontend, backend)
2. **TypeScript config** (tsconfig.json)
3. **ESLint et Prettier** config
4. **Jest config** pour les tests
5. **Docker compose** pour dev
6. **Environment variables** (.env.example)
7. **README** avec instructions setup

Technologies :
- React 18 + TypeScript + Vite
- Node.js 20 + Express + TypeScript
- PostgreSQL 15
- Tailwind CSS
- Jest + Testing Library
- Passport.js (OAuth2.0)

Génère le code complet et commenté.
```

**Résultat :** Fichiers de config dans `backend/` et `frontend/`

---

## 🎯 PROMPT 3 : Backend - API et Services Email

**Prompt utilisé :**
```
Implémente le backend complet de Hedwige :

1. **Service Email (IMAP/SMTP)**
   - Connexion IMAP pour recevoir emails
   - Connexion SMTP pour envoyer emails
   - Parsing des emails
   - Gestion des pièces jointes

2. **Authentication Service**
   - JWT tokens
   - OAuth2.0 (Google, Microsoft, GitHub)
   - Passport.js strategies
   - Refresh tokens

3. **Controllers**
   - Email controller (CRUD)
   - Auth controller
   - OAuth controller

4. **Routes avec validation**
   - Input validation (Joi/Zod)
   - Error handling
   - Rate limiting

5. **Middleware**
   - Auth middleware (JWT)
   - Error handler
   - Logger

Code TypeScript complet avec:
- Typage strict
- Error handling
- Logging
- Tests unitaires Jest (>80%)
```

**Résultat :** Code backend complet dans `backend/src/`

---

## 🎯 PROMPT 4 : Frontend - Interface Utilisateur

**Prompt utilisé :**
```
Crée le frontend complet de Hedwige avec React + TypeScript :

1. **Pages principales :**
   - Login (avec OAuth buttons)
   - Inbox (liste emails)
   - Email Detail (lecture)
   - Compose (rédaction)
   - Settings (paramètres)

2. **Composants réutilisables :**
   - EmailList (liste virtualisée)
   - EmailCard (aperçu email)
   - EmailComposer (éditeur riche)
   - Header (navigation)
   - Sidebar (folders)
   - **PatronusLoader (intégration défi #9) !**

3. **Features :**
   - Recherche temps réel
   - Pagination/infinite scroll
   - Drag & drop pour pièces jointes
   - Dark mode
   - Responsive design (mobile-first)

4. **State Management :**
   - React Query pour data fetching
   - Zustand pour state global
   - React Hook Form pour formulaires

5. **Design System :**
   - Tailwind CSS
   - Headless UI pour modals/dropdowns
   - Lucide React pour icônes
   - Framer Motion pour animations

Génère le code avec :
- TypeScript strict
- Accessibilité (ARIA)
- Performance optimisée
- Tests (React Testing Library)
```

**Résultat :** Code frontend complet dans `frontend/src/`

---

## 🎯 PROMPT 5 : Tests Unitaires Complets

**Prompt utilisé :**
```
Génère une suite de tests complète pour Hedwige (>80% coverage) :

**Backend Tests (Jest):**

1. **Services Tests :**
   - email.service.test.ts (IMAP/SMTP mocking)
   - auth.service.test.ts (JWT, OAuth flow)
   
2. **Controllers Tests :**
   - email.controller.test.ts
   - auth.controller.test.ts

3. **Routes Tests (supertest) :**
   - API endpoints testing
   - Error cases
   - Validation

**Frontend Tests (RTL):**

1. **Components Tests :**
   - EmailList.test.tsx
   - EmailComposer.test.tsx
   - PatronusLoader.test.tsx

2. **Hooks Tests :**
   - useAuth.test.ts
   - useEmails.test.ts

3. **Integration Tests :**
   - Login flow
   - Send email flow
   - OAuth flow

Avec :
- Mocking (API, DB)
- Coverage reports
- CI/CD ready
```

**Résultat :** Tests dans `backend/tests/` et `frontend/tests/`

---

## 🎯 PROMPT 6 : Documentation Technique

**Prompt utilisé :**
```
Rédige la documentation technique complète de Hedwige :

1. **README.md principal**
   - Description du projet
   - Features
   - Screenshots (descriptions textuelles)
   - Installation
   - Usage
   - Architecture

2. **API Documentation (OpenAPI/Swagger)**
   - Tous les endpoints
   - Schémas de données
   - Exemples de requêtes

3. **Guide de Déploiement**
   - Docker deployment
   - Environment variables
   - Database setup
   - OAuth setup (Google, Microsoft, GitHub)

4. **Guide de Contribution**
   - Code style
   - Git workflow
   - Tests

5. **ARCHITECTURE.md**
   - Décisions techniques
   - Patterns utilisés
   - Sécurité

Format Markdown professionnel avec diagrammes.
```

**Résultat :** Documentation complète

---

## 📊 VALIDATION DU DÉFI

### Critères de Validation

- ✅ **Frontend React + TypeScript** : Complet
- ✅ **Backend Node.js + Express** : Complet  
- ✅ **OAuth2.0 (Google/Microsoft/GitHub)** : Implémenté
- ✅ **Envoi/Réception emails** : IMAP/SMTP fonctionnel
- ✅ **Tests unitaires >80%** : Coverage atteint
- ✅ **Documentation complète** : README, API docs, Architecture
- ✅ **PatronusLoader intégré** : BONUS défi #9 !
- ✅ **Responsive & Accessible** : Mobile-first, ARIA
- ✅ **Code de qualité** : TypeScript strict, ESLint, Prettier

### Stack Technique Finale

**Frontend :**
- React 18 + TypeScript + Vite
- Tailwind CSS + Headless UI
- React Query + Zustand
- React Hook Form
- PatronusLoader (Défi #9) ✨

**Backend :**
- Node.js 20 + Express + TypeScript
- PostgreSQL 15 + Prisma ORM
- Passport.js (OAuth2.0)
- Nodemailer (SMTP) + node-imap (IMAP)
- Jest (tests)

**DevOps :**
- Docker + Docker Compose
- GitHub Actions (CI/CD - Défi #5)
- Terraform (PRA - Défi #2)

### Bonus Obtenus

- 🎨 **Intégration Patronus** : +5 pts (défi #9)
- 🧪 **Tests >80% coverage** : Requis
- 📚 **Documentation excellente** : Requis
- 🎨 **UI/UX exceptionnelle** : Bonus possible

**Statut :** ✅ VALIDÉ  
**Points :** 80 pts (+ 5 pts bonus Patronus) = **85 pts**  
**Temps réel :** 5 heures  
**Total cumulé :** 145 pts

