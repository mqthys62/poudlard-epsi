# 📝 Feuillet de Prompts - Défi #5 : CI/CD Express voie 9¾

> **Défi Workshop Poudlard RP 2025**  
> **Équipe :** Géminiard 🦅  
> **Date :** 13 octobre 2025  
> **Points :** 25 pts

---

## 🎯 Contexte du Défi

**Objectif :** Mettre en place un pipeline CI/CD complet pour l'application Hedwige (Défi #15)

**Exigences :**
- Tests unitaires automatisés
- Tests de non-régression
- Vérification de norme de code (Airbnb pour JS/TS)
- Test des images Docker
- Analyse SonarQube
- Déploiement automatique si toutes les étapes sont validées

---

## 📋 Prompts Utilisés

### Prompt 1 : Création du Workflow GitHub Actions Principal

```
Crée un workflow GitHub Actions complet pour le pipeline CI/CD de l'application Hedwige.

Contexte :
- Application fullstack avec backend Node.js/TypeScript et frontend React/TypeScript
- Base de données PostgreSQL et cache Redis
- Déjà dockerisée (voir defis/15_Hedwige/)
- Besoin de respecter les standards Airbnb pour le code

Le workflow doit contenir les jobs suivants :

1. LINTING & CODE QUALITY
   - ESLint avec configuration Airbnb
   - Prettier pour le formatage
   - Vérification backend et frontend

2. UNIT TESTS
   - Jest pour les tests
   - Services PostgreSQL et Redis pour les tests
   - Coverage > 80% requis
   - Upload des rapports vers Codecov

3. INTEGRATION TESTS
   - Lancer Docker Compose
   - Tests d'intégration avec vraie BDD
   - Tests de non-régression (API health check, build frontend)

4. DOCKER BUILD & TEST
   - Build des images backend et frontend
   - Test des images
   - Scan de sécurité avec Trivy
   - Upload des résultats SARIF

5. SONARQUBE ANALYSIS
   - Analyse de qualité du code
   - Vérification des Quality Gates
   - Coverage des tests

6. BUILD & PUSH
   - Build production des images
   - Push vers GitHub Container Registry
   - Tagging avec version et SHA

7. DEPLOY
   - Déploiement SSH sur serveur de production
   - Health check post-déploiement
   - Uniquement si branche main et tous les tests OK

8. NOTIFICATIONS
   - Notifier le résultat du déploiement

Utilise les dernières versions des actions GitHub et optimise le cache.
```

**Résultat :** Fichier `.github/workflows/hedwige-ci-cd.yml` créé avec 8 jobs orchestrés

---

### Prompt 2 : Configuration SonarQube

```
Crée un fichier de configuration SonarQube (sonar-project.properties) pour analyser le projet Hedwige.

Spécifications :
- Projet : poudlard-hedwige
- Sources : backend/src et frontend/src de defis/15_Hedwige
- Tests : fichiers *.test.ts et *.spec.ts
- Coverage reports : lcov.info pour backend et frontend
- Exclusions : node_modules, dist, build, coverage, fichiers de test, .d.ts
- Language : TypeScript
- Quality Gates : wait=true, timeout=300s

Ajoute des règles d'ignore pour :
- S1186 (fonctions vides dans les tests)
- S3776 (complexité cognitive dans seed.ts)
- S4328 (fonction index.ts)

Configure l'analyse en mode publish avec Git SCM provider.
```

**Résultat :** Fichier `sonar-project.properties` créé avec toutes les configurations

---

### Prompt 3 : Configuration ESLint Backend (Airbnb)

```
Crée un fichier .eslintrc.json pour le backend Hedwige avec la configuration Airbnb.

Contraintes :
- Environnement : Node.js, ES2021, Jest
- Extends : airbnb-base, airbnb-typescript/base, @typescript-eslint/recommended
- Parser : @typescript-eslint/parser avec tsconfig.json
- Plugins : @typescript-eslint, prettier

Règles personnalisées :
- Prettier en mode error
- import/prefer-default-export: off (on utilise named exports)
- class-methods-use-this: off (méthodes de service)
- no-console: off (logging nécessaire)
- @typescript-eslint/no-explicit-any: warn (à éviter mais parfois nécessaire)
- @typescript-eslint/explicit-function-return-type: off (TypeScript infère)
- Variables/args non utilisés: ignorer si préfixés par _

Settings :
- Import resolver TypeScript avec alwaysTryTypes
- Ignore : dist, node_modules, coverage, *.js

Le chemin du tsconfig est ./tsconfig.json relatif au fichier.
```

**Résultat :** Fichier `backend/.eslintrc.json` créé avec config Airbnb complète

---

### Prompt 4 : Configuration ESLint Frontend (Airbnb + React)

```
Crée un fichier .eslintrc.json pour le frontend React/TypeScript Hedwige avec Airbnb.

Contraintes :
- Environnement : Browser, ES2021, Jest
- Extends : airbnb, airbnb-typescript, airbnb/hooks, react, @typescript-eslint
- Parser : @typescript-eslint/parser avec support JSX
- Plugins : react, react-hooks, @typescript-eslint, prettier

Règles spécifiques React :
- react/react-in-jsx-scope: off (React 18+ avec new JSX transform)
- react/jsx-props-no-spreading: off (utilisé avec libraries)
- react/require-default-props: off (TypeScript gère les optionnels)
- react/function-component-definition: arrow-function obligatoire

Règles TypeScript :
- @typescript-eslint/no-explicit-any: warn
- @typescript-eslint/explicit-function-return-type: off
- Variables/args inutilisés : ignorer si _ prefix

Settings :
- React version: detect automatiquement
- Import resolver TypeScript
- Ignore : dist, node_modules, coverage, vite.config.ts, *.config.js
```

**Résultat :** Fichier `frontend/.eslintrc.json` créé avec config Airbnb React

---

### Prompt 5 : Configuration Prettier Backend

```
Crée un fichier .prettierrc.json pour le backend avec une configuration standard professionnelle.

Règles :
- semi: true (points-virgules obligatoires)
- trailingComma: "es5" (virgules traînantes ES5)
- singleQuote: true (guillemets simples)
- printWidth: 100 (largeur max 100 caractères)
- tabWidth: 2 (indentation 2 espaces)
- useTabs: false (espaces, pas de tabs)
- arrowParens: "always" (parenthèses sur arrow functions)
- endOfLine: "lf" (Unix line endings)
- bracketSpacing: true (espaces dans les objets)
- bracketSameLine: false (bracket JSX sur nouvelle ligne)

Compatible avec ESLint et la config Airbnb.
```

**Résultat :** Fichier `backend/.prettierrc.json` créé

---

### Prompt 6 : Configuration Prettier Frontend

```
Crée un fichier .prettierrc.json pour le frontend React avec les mêmes règles que le backend, mais ajoute :

- jsxSingleQuote: false (guillemets doubles pour JSX, c'est la convention React)

Toutes les autres règles identiques au backend pour la cohérence.
```

**Résultat :** Fichier `frontend/.prettierrc.json` créé

---

### Prompt 7 : Documentation README Complète

```
Crée une documentation README.md complète pour le défi CI/CD Express voie 9¾.

Structure :
1. En-tête avec description du défi et points
2. Architecture du pipeline avec diagramme ASCII
3. Détails de chaque étape :
   - Outils utilisés
   - Commandes
   - Métriques
4. Structure des fichiers
5. Configuration requise (secrets, variables d'env)
6. Guide d'utilisation
7. Métriques & monitoring
8. Checklist de validation
9. Points obtenus
10. Troubleshooting

Style :
- Émojis pour les sections
- Code blocks pour les exemples
- Tableaux pour les données structurées
- Diagrammes ASCII pour la visualisation
- Liens vers la documentation externe
- Section troubleshooting pratique

Ton professionnel mais accessible, adapté à un workshop étudiant.
```

**Résultat :** Fichier `README.md` créé avec documentation exhaustive

---

### Prompt 8 : Mise à Jour des package.json

```
Ajoute les scripts manquants et dépendances nécessaires pour le CI/CD dans les package.json du backend et frontend de Hedwige.

Backend (defis/15_Hedwige/backend/package.json) :
Scripts à ajouter :
- "lint": "eslint src --ext .ts"
- "lint:fix": "eslint src --ext .ts --fix"  
- "format": "prettier --write \"src/**/*.{ts,tsx,js,jsx,json}\""
- "format:check": "prettier --check \"src/**/*.{ts,tsx,js,jsx,json}\""
- "test:integration": "jest --testPathPattern=integration --passWithNoTests"
- "test:coverage": "jest --coverage"

DevDependencies à ajouter :
- eslint-config-airbnb-base
- eslint-config-airbnb-typescript
- eslint-plugin-import
- prettier
- eslint-config-prettier
- eslint-plugin-prettier

Frontend (defis/15_Hedwige/frontend/package.json) :
Scripts à ajouter :
- "lint": "eslint src --ext .ts,.tsx"
- "lint:fix": "eslint src --ext .ts,.tsx --fix"
- "format": "prettier --write \"src/**/*.{ts,tsx,js,jsx,json}\""
- "format:check": "prettier --check \"src/**/*.{ts,tsx,js,jsx,json}\""

DevDependencies à ajouter :
- eslint-config-airbnb
- eslint-config-airbnb-typescript
- eslint-plugin-react
- eslint-plugin-react-hooks
- eslint-plugin-jsx-a11y
- prettier
- eslint-config-prettier
- eslint-plugin-prettier

Garde les versions compatibles entre elles.
```

**Résultat :** package.json mis à jour avec tous les scripts et dépendances

---

## 📊 Résultats Obtenus

### ✅ Livrables Créés

1. **Workflow GitHub Actions** (`.github/workflows/hedwige-ci-cd.yml`)
   - 8 jobs orchestrés
   - ~350 lignes de configuration
   - Pipeline complet automatisé

2. **Configuration SonarQube** (`sonar-project.properties`)
   - Analyse de qualité
   - Quality Gates configurés
   - Règles d'exclusion pertinentes

3. **Configuration ESLint** (`.eslintrc.json` × 2)
   - Airbnb style guide backend
   - Airbnb + React style guide frontend
   - Règles TypeScript

4. **Configuration Prettier** (`.prettierrc.json` × 2)
   - Formatage cohérent
   - Compatible ESLint
   - Standards professionnels

5. **Documentation** (`README.md`)
   - Guide complet
   - Architecture détaillée
   - Troubleshooting

6. **Ce feuillet de prompts** (`prompts.md`)
   - Historique des prompts
   - Contexte et résultats

### 📈 Métriques

- **Temps de développement** : ~2h
- **Nombre de fichiers créés** : 8
- **Lignes de code** : ~800
- **Jobs CI/CD** : 8
- **Coverage requis** : >80%
- **Quality Gates** : 6

### 🎯 Validation

✅ **Défi #5 : CI/CD Express voie 9¾ - 25 points**

**Critères validés :**
- [x] Tests unitaires avec Jest
- [x] Tests de non-régression
- [x] Norme Airbnb (ESLint)
- [x] Test images Docker
- [x] SonarQube implémenté
- [x] Déploiement automatique
- [x] Appliqué sur Hedwige (#15)

---

## 🔄 Itérations et Améliorations

### Version 1.0 (Initiale)
- Pipeline de base avec 5 jobs
- ESLint simple sans Airbnb

### Version 2.0 (Actuelle)
- 8 jobs orchestrés
- Configuration Airbnb complète
- Scan de sécurité Trivy
- Quality Gates SonarQube
- Déploiement SSH automatique

### Version 3.0 (Future)
- Tests E2E avec Playwright
- Déploiement Kubernetes
- Rollback automatique
- A/B testing

---

## 📝 Notes Techniques

### Choix d'Architecture

1. **GitHub Actions** plutôt que Jenkins/GitLab CI
   - Intégration native GitHub
   - Gratuit pour projets publics
   - Marketplace d'actions riche

2. **Airbnb Style Guide** plutôt que Standard
   - Plus strict et professionnel
   - Bien documenté
   - Support TypeScript excellent

3. **SonarQube** pour la qualité
   - Standard industrie
   - Métriques complètes
   - Quality Gates configurables

4. **Trivy** pour la sécurité
   - Gratuit et open-source
   - Scan rapide
   - Format SARIF pour GitHub

### Difficultés Rencontrées

1. **Coverage threshold dans CI**
   - Solution : Script bash custom pour vérifier >80%

2. **Dépendances ESLint Airbnb**
   - Solution : Version compatible airbnb-typescript

3. **Prisma dans tests**
   - Solution : Service PostgreSQL dans GitHub Actions

---

## 🎓 Apprentissages

### Prompt Engineering

- **Contexte détaillé** : Fournir toute la structure du projet
- **Spécifications précises** : Lister exactement ce qui est attendu
- **Exemples concrets** : Montrer le format de sortie désiré
- **Itération** : Affiner progressivement les configs

### DevOps

- **Pipeline as Code** : Tout versionné dans Git
- **Fail Fast** : Tests rapides d'abord (lint puis tests)
- **Security First** : Scan de vulnérabilités automatique
- **Quality Gates** : Ne déployer que du code de qualité

### Best Practices

- **Separation of Concerns** : 1 job = 1 responsabilité
- **Caching** : npm cache pour accélérer
- **Parallelization** : Jobs indépendants en parallèle
- **Monitoring** : Métriques et notifications

---

**Créé le :** 13 octobre 2025  
**Équipe :** Géminiard 🦅  
**IA utilisée :** Gemini 2.5 Flash & Pro  
**Temps total :** ~2 heures

---

**Note :** Ce feuillet de prompts est une preuve de travail conforme aux exigences du Workshop Poudlard RP 2025. Tous les fichiers ont été générés par l'IA sans modification manuelle.

