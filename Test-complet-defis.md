# Tests complets – Défis validés (local)

Ce document regroupe les défis 100% terminés et la procédure de test locale. Environnement: Linux/WSL, Node 20+, Python 3.10+.

---

## ✅ #12 – Starter Pack (5 pts)
- Dossier: `defis/12_Starter_Pack/` (contenu documentaire)
- Test: lecture des livrables (aucun service à lancer).
- Critères d’acceptation (selon sujet):
  - Créer le starter pack d’un étudiant de l’école (contenu crédible/utile).

---

## ✅ #18 – Cadet école (Gemma 2B) (25 pts)
- Dossiers: `defis/18_Cadet_Ecole/installation/`, `.../documentation/`
- Prérequis: Ollama installé.
- Test:
  ```bash
  cd defis/18_Cadet_Ecole/installation
  ./deploy_gemma.sh          # déploie le modèle localement
  python ../installation/test_gemma.py  # prompt simple et vérification de réponse
  ```
- Critères d’acceptation (selon sujet):
  - Déployer localement la plus petite version du LLM de l’IA de l’école.
  - Documentation d’installation cohérente.

---

## ✅ #9 – Le patronus d’EPSI (30 pts)
- Dossiers: `defis/09_Patronus_EPSI/animation/`
- Test (navigateur):
  - Ouvrir `defis/09_Patronus_EPSI/animation/patronus_loader.html`
  - Ou intégrer le composant React `PatronusLoader.tsx` selon `INTEGRATION.md`.
- Critères d’acceptation (selon sujet):
  - Réaliser une animation de chargement 2D “patronus”.
  - Bonus si intégré dans un autre défi.

---

## ✅ #15 – Hedwige (80 pts + 5 bonus Patronus)
- Dossier: `defis/15_Hedwige/`
- Services: Docker Compose (backend, frontend, postgres, redis, mailhog, adminer)
- Prérequis: Docker & Docker Compose.
- Test:
  ```bash
  cd defis/15_Hedwige
  docker-compose up -d --build
  # Backend: http://localhost:3001/api/health
  # Frontend: http://localhost:5173
  # MailHog: http://localhost:8025
  # Adminer: http://localhost:8080
  ```
- Connexion démo:
  - Email: `harry.potter@poudlard.fr`
  - Mot de passe: `Poudlard2025!`
- Seed BDD confirmé via `backend/prisma/seed.ts`.
- Critères d’acceptation (selon sujet):
  - Web app permettant réception/envoi mail étudiant.
  - Connexion à n’importe quel service améliorant la vie (OAuth2.0 obligatoire).
  - Front + middleware documentés et testables.

---

## ✅ #5 – CI/CD Express voie 9¾ (25 pts)
- Dossier: `defis/05_CI-CD_Express/`
- Test local (dry-run pipeline):
  - Inspecter `.github/workflows/hedwige-ci-cd.yml` (8 jobs: lint, tests, intégration, build docker, sonar, push, deploy, notify)
  - Lancer manuellement les étapes clés localement si besoin (lint/tests/build) selon `README.md`.
- Critères d’acceptation (selon sujet):
  - Pipeline comprenant: tests unitaires, tests de non-régression, vérification norme (Airbnb/PEP8), test image Docker, compilation, SonarQube, déploiement après validations.
  - CI/CD fonctionnelle et implémentée sur au moins un autre défi.

---

## ✅ #20 – CNN Harry Potter (30 pts)
- Dossier: `defis/20_CNN_Harry/`
- Option Notebook: ouvrir `harry_potter_cnn.ipynb` (Jupyter).
- Option Script:
  ```bash
  cd defis/20_CNN_Harry
  python3 -m venv .venv && source .venv/bin/activate
  pip install -r requirements.txt
  python harry_potter_cnn.py
  ```
- Résultats attendus: `results/` (courbes, matrice de confusion), `models/` (modèles .h5).
- Critères d’acceptation (selon sujet):
  - Réseau de neurones convolutif sur Notebook capable de reconnaître au moins 10 personnages de la saga.

---

## ✅ #21 – Le Nimbus 3000 (Benchmark) (25 pts)
- Dossier: `defis/21_Nimbus_3000/`
- Test:
  ```bash
  cd defis/21_Nimbus_3000
  python3 -m venv .venv && source .venv/bin/activate
  pip install -r requirements.txt
  python optimizer_benchmark.py
  ```
- Résultats: `benchmark_results/` (json/csv + 3 PNG + `research_paper.md`).
- Critères d’acceptation (selon sujet):
  - Benchmark d’un réseau existant (ou celui du #20) sur une liste d’optimizers.
  - Production d’une documentation “papier de recherche” concluant les optimizers les plus adaptés.

---

## ✅ #6 – SpookEPSI (45 pts)
- Dossier: `defis/06_SpookEPSI/`
- Test (serveur statique simple):
  ```bash
  cd defis/06_SpookEPSI
  python3 -m http.server 8000
  # Ouvrir http://localhost:8000
  ```
- Vérifier: navigation, mode 2D filaire (si ajouté), cohérence visuelle.
- Critères d’acceptation (selon sujet):
  - Maquette site vitrine responsive version Poudlard.
  - Tous les éléments de la page `https://www.epsi.fr/campus/` présents.
  - Mobile compatible.
  - Maquette Figma et charte graphique contenant: déclinaisons couleurs, polices, boutons (états), animations, pictogrammes, logos, format components.

---

## ✅ #16 – Tu es un sorcier Harry ! (45 pts)
- Dossier: `defis/16_Sorcier_Mobile/`
- Test Expo (tunnel prêt si besoin):
  ```bash
  cd defis/16_Sorcier_Mobile
  npm install
  npm start
  # Scanner le QR via Expo Go (URL https si tunnel)
  ```
- Critères d’acceptation (selon sujet):
  - App mobile cross-platform (Android/iOS).
  - QCM de 20 questions minimum pour définir le type de sorcier (≥4 types).
  - Document de gamification des mécanismes et résultats attendus.

---

## ✅ #22 – Le procès de J.K. Rowling (100 pts)
- Dossier: `defis/22_Proces_JK_Rowling/`
- Test:
  ```bash
  cd defis/22_Proces_JK_Rowling
  python3 -m venv .venv && source .venv/bin/activate
  pip install -r requirements.txt
  python analyze_hp.py --input data --out outputs
  ```
- Résultats: `outputs/` (`counts_table.csv`, `trend_lines.png`, `mentions_comparison.png`, `speech_share.png`, `report.md`).
- Critères d’acceptation (selon sujet):
  - Calcul des statistiques: cicatrice d’Harry, “Mais” d’Hermione, interventions de Dumbledore, comparaisons prises de parole, “Rogue being Rogue”, actes répréhensibles.
  - Déclinaison par livre et tendances; bonus: normalisation par pages (fait).
  - Documentation expliquant la méthodologie.

---

## ✅ #19 – Professeur Dumbledore (65 pts)
- Dossier: `defis/19_Professeur_Dumbledore/`
- Prérequis: `ffmpeg` installé (Linux/WSL: `sudo apt-get install -y ffmpeg`).
- Installation & test:
  ```bash
  cd defis/19_Professeur_Dumbledore
  python3 -m venv .venv && source .venv/bin/activate
  pip install -r requirements.txt
  # déposer vos enregistrements audio dans data/samples/ (mp3/m4a/ogg/wav)
  python recognize_spells.py --input data/samples --out outputs --model tiny
  pip install tabulate
  python evaluate.py --pred outputs/predictions.csv --out outputs
  ```
- Résultats: `outputs/predictions.csv`, `outputs/confusion_matrix.png`, `outputs/report.md`.
- Critères d’acceptation (selon sujet):
  - IA de reconnaissance vocale de ≥8 formules magiques.
  - Jeu d’essai, rapport et métriques d’évaluation.

---

# Défis en cours (tests partiels)

## 🟡 #10 – Oculus reparo (55 pts)
- Statut: cahier des charges en cours (structure prête). Test = relecture/validation contenu.
- Critères d’acceptation (selon sujet):
  - Cahier des charges crédible pour transformer un outil de Poudlard.
  - Fonctionnalités existantes recensées + enquête/plan d’accompagnement.

## 🟡 #8 – Plan 3D EPSI (100 pts)
- Dossier: `defis/08_Plan3D/`
- Test:
  ```bash
  cd defis/08_Plan3D
  python3 -m http.server 8001
  # Ouvrir http://localhost:8001 et vérifier le plan 3D
  # Touche P: mode filaire pour contrôle de géométrie
  ```
- Critères d’acceptation (selon sujet):
  - Générer en 3D les plans de Poudlard (ici: 1er étage EPSI) et mettre en surbrillance la chambre des secrets (myDiL).
  - Bonne répartition des surfaces, murs définis, portes apparentes.
  - Animation du plan (vue/rotation/interaction).

---

# Défis planifiés (pas encore livrables)
- #1 DOCKERWARTS (50 pts)
  - Critères: Infra dockerisée Big Data (GLPI, ElasticSearch, Grafana, Cassandra, pare-feu, HA) + PRA simplifié/documenté.
- #4 Protego Maxima (5+ pts)
  - Critères: défenses “ingénieuses” documentées (hardening, WAF, rate limiting, headers, etc.).
- #13 McGonagall (35 pts) — en initialisation (Electron + React + Playwright)
  - Critères: exécutable Windows récupérant l’emploi du temps via API/HTML Wigor; documentation + tests (>80% si exigé).

---

# Notes générales
- Tous les projets avec `.env.example` doivent être dupliqués en `.env` et complétés localement.
- Les ports par défaut peuvent être déjà utilisés; en cas de conflit, changer le port (python http.server) ou arrêter le service occupant.
