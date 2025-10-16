# 🎯 PLAN D'EXÉCUTION - WORKSHOP POUDLARD RP
## Maison Géminiard - Objectif : Livrable Exceptionnel

---

## 📊 STRATÉGIE GLOBALE

### Objectif de Points : 310+ points
### Approche : Cohérence + Qualité + Quantité

---

## 🎪 ORDRE D'EXÉCUTION DES DÉFIS

### 🟢 PHASE 1 : Défis Rapides & Fondations (60 pts - 2h)

1. **#12 - Harry Potter Starter Pack** (5 pts) ⚡ RAPIDE
   - Générer une image créative et drôle du starter pack étudiant EPSI/Poudlard
   - Temps estimé : 15 min

2. **#18 - Le Cadet de Votre École** (25 pts) 
   - Déployer en local la plus petite version de Gemini
   - Documentation du processus
   - Temps estimé : 1h30

3. **#9 - Le Patronus d'EPSI** (30 pts + BONUS)
   - Animation 2D de chargement
   - Sera intégrée dans Hedwige pour le bonus
   - Temps estimé : 45 min

---

### 🔵 PHASE 2 : Application Web Complète (130 pts - 8h)

4. **#15 - Hedwige** (80 pts) 🎯 CŒUR DU PROJET
   - Web app d'envoi/réception de mails
   - OAuth2.0 pour connexion services
   - Front (React/Vue) + Middleware (Node.js/Python)
   - Tests unitaires
   - **Intégration du Patronus (#9) ici pour bonus**
   - Temps estimé : 5h

5. **#5 - CI/CD Express voie 9¾** (25 pts)
   - Pipeline complet pour Hedwige
   - Tests unitaires, non-régression, linting
   - SonarQube, Docker, déploiement
   - Temps estimé : 2h

6. **#2 - PRAcadabra** (25 pts)
   - Scripts Ansible/Terraform pour Hedwige
   - Automatisation du déploiement
   - Documentation PRA
   - Temps estimé : 1h30

---

### 🟡 PHASE 3 : Design & UX (45 pts - 3h)

7. **#6 - SpookEPSI** (45 pts)
   - Maquette Figma du site EPSI version Poudlard
   - Responsive design complet
   - Charte graphique détaillée
   - Temps estimé : 3h

---

### 🟣 PHASE 4 : IA & Data Science (60 pts - 5h)

8. **#20 - Is iT yOu hARrY?** (30 pts)
   - CNN sur Jupyter Notebook
   - Reconnaissance de 10+ personnages Harry Potter
   - Dataset + entraînement + tests
   - Temps estimé : 3h

9. **#21 - Le Nimbus 3000** (25 pts) 🔗 BONUS SYNERGIQUE
   - Benchmark des optimizers sur le réseau #20
   - Documentation format papier de recherche
   - Temps estimé : 2h

---

### 🔴 PHASE 5 : Mobile (45 pts - 4h)

10. **#16 - Tu es un sorcier Harry !** (45 pts)
    - App mobile cross-platform (React Native/Flutter)
    - QCM 20 questions
    - 4+ types de sorciers
    - Documentation gamification
    - Temps estimé : 4h

---

## 📈 RÉCAPITULATIF

| Défi | Nom | Points | Temps | Priorité |
|------|-----|--------|-------|----------|
| #12 | Starter Pack | 5 | 15 min | ⚡ HIGH |
| #18 | Cadet école | 25 | 1h30 | ⚡ HIGH |
| #9 | Patronus EPSI | 30+ | 45 min | ⚡ HIGH |
| #15 | Hedwige | 80 | 5h | 🎯 CORE |
| #5 | CI/CD | 25 | 2h | 🔗 SYNERGIE |
| #2 | PRA | 25 | 1h30 | 🔗 SYNERGIE |
| #6 | SpookEPSI | 45 | 3h | 📱 UX |
| #20 | CNN Harry | 30 | 3h | 🤖 AI |
| #21 | Nimbus 3000 | 25 | 2h | 🔗 SYNERGIE |
| #16 | Sorcier mobile | 45 | 4h | 📱 MOBILE |

**TOTAL : 335 POINTS**
**TEMPS TOTAL : ~24h de travail**

---

## 🗂️ STRUCTURE DU PROJET

```
poudlardRp/
├── prompts_historique.md          # Historique de tous les prompts
├── todo.md                         # TODO list générale
├── PLAN_EXECUTION.md              # Ce fichier
│
├── defis/                          # Tous les défis réalisés
│   ├── 02_PRAcadabra/
│   │   ├── scripts/
│   │   ├── documentation/
│   │   └── prompts.md
│   ├── 05_CI-CD_Express/
│   │   ├── .github/workflows/
│   │   ├── sonarqube/
│   │   └── prompts.md
│   ├── 06_SpookEPSI/
│   │   ├── figma_export/
│   │   ├── charte_graphique.pdf
│   │   └── prompts.md
│   ├── 09_Patronus_EPSI/
│   │   ├── animation/
│   │   ├── assets/
│   │   └── prompts.md
│   ├── 12_Starter_Pack/
│   │   ├── starter_pack.png
│   │   └── prompts.md
│   ├── 15_Hedwige/
│   │   ├── frontend/
│   │   ├── backend/
│   │   ├── tests/
│   │   └── prompts.md
│   ├── 16_Sorcier_Mobile/
│   │   ├── src/
│   │   ├── assets/
│   │   └── prompts.md
│   ├── 18_Cadet_Ecole/
│   │   ├── installation/
│   │   ├── documentation/
│   │   └── prompts.md
│   ├── 20_CNN_Harry/
│   │   ├── notebooks/
│   │   ├── datasets/
│   │   ├── models/
│   │   └── prompts.md
│   └── 21_Nimbus_3000/
│       ├── benchmark/
│       ├── research_paper.pdf
│       └── prompts.md
│
├── livrables/                      # Livrables finaux
│   ├── Workshop2025-26-M2gX-dossier.pdf
│   ├── Workshop2025-26-M2gX-pres.pptx
│   └── schemas_organisation/
│
└── outils/                         # Outils de gestion
    ├── trello_export/
    └── templates/
```

---

## ⏰ PLANNING HEBDOMADAIRE

### LUNDI 13/10 - JOUR 1
- ✅ Mise en place structure projet
- 🎯 Défis #12, #18, #9 (Phase 1)
- 🎯 Démarrage #15 Hedwige

### MARDI 14/10 - JOUR 2
- 🎯 Finalisation #15 Hedwige
- 🎯 Défis #5 CI/CD et #2 PRA
- 🎯 Défi #6 SpookEPSI

### MERCREDI 15/10 - JOUR 3
- 🎯 Défis #20 CNN et #21 Nimbus
- 🎯 Défi #16 App Mobile
- 📝 Début documentation livrables

### JEUDI 16/10 - JOUR 4
- 📦 Finalisation tous les défis
- 📄 Génération dossier de preuves
- 🎨 Création présentation PowerPoint
- ⏰ **DÉPÔT 17h-18h**

### VENDREDI 17/10 - JOUR 5
- 🎤 Répétition pitch
- 🎭 Préparation démo
- 🏆 **SOUTENANCE**

---

## 🎯 PROCHAINES ACTIONS IMMÉDIATES

1. ✅ Créer structure de dossiers
2. ⚡ Générer Défi #12 (Starter Pack)
3. ⚡ Documenter prompts au fur et à mesure
4. 🚀 Enchaîner sur Défi #18

---

**Date de création :** 13/10/2025  
**Maison :** Géminiard 🦅  
**Devise :** "L'IA est notre baguette magique" ✨

