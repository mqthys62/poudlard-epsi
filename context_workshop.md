# CONTEXTE ET PLAN D'ACTION - WORKSHOP "POUDLARD À L'EPSI/WIS"

Ce document sert de contexte de base pour l'IA qui nous assistera tout au long du workshop. Il contient une synthèse des règles, la liste des défis, et une proposition de plan d'action stratégique.

## 1. Synthèse du Sujet

### Objectif Principal
[cite_start]Réaliser une série de défis techniques en groupe de 3 à 5 personnes[cite: 84], sur une semaine, en incarnant des "apprentis sorciers". [cite_start]Le thème est "Poudlard à l'EPSI/WIS"[cite: 6].

### Règle d'Or (ABSOLUE)
[cite_start]**L'IA est notre unique outil de production ("baguette magique")**[cite: 22]. [cite_start]Il est **FORMELLEMENT INTERDIT** de coder, modifier, ou retoucher manuellement la moindre ligne de code, le moindre asset ou fichier de configuration[cite: 24]. [cite_start]L'intégralité des livrables, y compris les textes, doit être générée par l'IA[cite: 25].

### Preuve de Travail
[cite_start]Chaque défi validé **doit** être accompagné d'un **feuillet de prompts** contenant l'intégralité des instructions données à l'IA pour parvenir au résultat[cite: 30]. C'est une condition non négociable pour la validation.

### Équipes et Outils (Maisons)
Nous sommes répartis dans des maisons, chacune associée à une IA spécifique :
- [cite_start]**GPTaigle**: ChatGPT Free (GPT-5)[cite: 45].
- [cite_start]**Copilouffle**: Microsoft Copilot (Office 365) et GitHub Copilot Free[cite: 46].
- [cite_start]**Géminiard**: Gemini 2.5 Flash et Pro[cite: 47].

### Livrables Attendus (Pour le jeudi soir)
1.  [cite_start]**Dossier de preuves de travail (`Workshop2025-26-M2g<n>-dossier.pdf`)**[cite: 88]:
    * [cite_start]**Feuillets de prompts** classés par défi, avec des explications claires[cite: 86].
    * [cite_start]**Schéma organisationnel** (preuve d'utilisation d'un outil type Trello, Jira, etc.) montrant la répartition des tâches, la planification et le suivi[cite: 87].

2.  [cite_start]**Support de présentation (`Workshop2025-26-M2g<n>-pres.pptx`)**[cite: 100]:
    * [cite_start]Présentation de l'équipe (en anglais)[cite: 91].
    * [cite_start]Liste des défis réalisés et total des points obtenus[cite: 93].
    * [cite_start]Bilan des apprentissages sur les LLM, l'IA et le Prompt Engineering[cite: 94, 95, 96].
    * [cite_start]Réflexion critique sur la place de l'IA dans notre futur métier[cite: 97].
    * [cite_start]Bilan de l'expérience : l'avant/après workshop[cite: 98].

### Calendrier Clé
- [cite_start]**Période de travail** : Lundi 13/10/2025 au Jeudi 16/10/2025[cite: 7, 235, 241].
- [cite_start]**Clôture et dépôt des livrables** : Jeudi soir, à l'heure fixée par le campus[cite: 63, 243].
- [cite_start]**Soutenances locales** : Vendredi 17/10/2025 (5 min de pitch + 10 min de Q&R)[cite: 108, 245, 246, 248].
- [cite_start]**Finale Nationale** : Mardi 04/11/2025 pour le groupe gagnant[cite: 114].

---

## 2. Analyse des Défis

Voici la liste complète des défis avec leurs points, une description et une analyse des synergies potentielles.

### Axe Infrastructure, DevOps & Cybersécurité
- **#1 DOCKERWARTS (50 pts)**: Monter une infra Big Data complète avec Docker (GLPI, ElasticSearch, Grafana, Cassandra, pare-feu, HA) et rédiger un PRA détaillé.
- **#2 PRAcadabra (25 pts)**: Mettre en place un PRA fonctionnel (Ansible/Terraform) pour automatiser le déploiement d'au moins un autre de nos défis.
- **#3 Cape d’invisibilité (55 pts)**: Pentest d'un système concurrent avec rapport détaillé. **HAUT RISQUE**.
- **#4 Protego Maxima (5- pts)**: Mettre en place des défenses contre les intrusions. Points variables selon l'ingéniosité.
- **#5 CI/CD Express voie 9¾ (25 pts)**: Mettre en place une CI/CD complète (tests unitaires, non-régression, linting, test image Docker, SonarQube, déploiement) pour au moins un autre défi.

### Axe Design, Vidéo & 3D
- **#6 SpookEPSI (45 pts)**: Maquetter un site vitrine responsive (version Poudlard) sur Figma avec une charte graphique complète.
- **#7 Harry Potter 9 ? (30 pts)**: Réaliser une vidéo de 30s à 3min entièrement générée en images de synthèse.
- **#8 Où est la chambre des secrets ? (100 pts)**: Générer les plans de Poudlard en 3D avec animation, mettant en surbrillance la salle myDiL. **TRÈS COÛTEUX EN POINTS**.
- **#9 Le patronus d’EPSI (30 pts)**: Créer une animation de chargement 2D du "patronus" de l'EPSI. Points bonus si intégrée dans un autre défi.

### Axe Gestion de Projet & Transformation Digitale
- **#10 Oculus reparo (55 pts)**: Rédiger un cahier des charges complet pour la transformation digitale d'un outil de Poudlard.
- **#11 Le cours de Filius Flitwick (45 pts)**: Définir un scénario d'accompagnement au changement (ADKAR, 7s McKinsey) pour une transformation digitale.

### Axe Développement (Web, Mobile, Logiciel)
- **#13 On n’avait pas cours avec McGonagall ? (35 pts)**: Exécutable Windows qui récupère l'emploi du temps via l'API "wigorservices". Tests unitaires (>80%).
- **#14 La boite magique de Serverus Rogue (25 pts)**: Logiciel cross-platform (Linux/Windows) avec Cmake pour automatiser l'ajout des sources sur GitHub.
- **#15 Hedwige (80 pts)**: Web app d'envoi/réception de mails étudiants, avec connexion à d'autres services via OAuth2.0. Front + middleware, tests unitaires.
- **#16 Tu es un sorcier Harry !” (45 pts)**: Application mobile cross-platform (Android/iOS) avec un QCM de 20 questions pour déterminer son "type de sorcier".
- **#17 Tableau des scores de Poudlard (35 pts)**: Application mobile native (Kotlin ou Swift) pour compter les points des maisons. Front + API + BDD (pas de BaaS). Tests unitaires (>80%).

### Axe IA & Data
- **#18 Le cadet de votre école (25 pts)**: Déployer en local la plus petite version de LLM de l'IA de notre maison.
- **#19 Professeur Dumbledore (65 pts)**: IA de reconnaissance vocale pour 8+ formules magiques d'Harry Potter (NLU, NLP, NLG).
- **#20 Is iT yOu hARrY? (30 pts)**: CNN sur un Jupyter Notebook pour reconnaître au moins 10 personnages d'Harry Potter.
- **#21 Le nimbus 3000 (25 pts)**: Benchmark des optimizers (Adadelta, Adam, etc.) sur un réseau de neurones existant, avec rédaction d'un rapport de recherche.
- **#22 Le procès de J.K. Rowling (100 pts)**: Analyse de données et data visualisation sur l'ensemble des livres Harry Potter (stats sur les personnages, les actions, etc.). **TRÈS COÛTEUX EN POINTS**.

### Divers & Chaos
- **#12 Harry Potter Starter Pack (5 pts)**: Créer une image du "starter pack" d'un étudiant. Facile et rapide.
- **#23 EASTER EGGS ( pts)**: Défis de "magie noire" : faire planter l'IA, reverse-engineering, se faire bloquer, créer une fork bomb. **À ÉVITER**.

---

## 3. Plan d'Action Stratégique

### Phase 0 : Constitution et Configuration (Lundi Matin)
1.  **Définir les rôles** : Qui est le lead pour le project management, qui centralise les prompts, etc. ?
2.  **Mettre en place l'outil de gestion de projet** (Trello, Jira, Notion...). Créer le backlog avec tous les défis listés ci-dessus.
3.  **Créer les comptes nécessaires** pour l'IA de notre maison, en s'assurant que tout le monde y a accès.
4.  **Mettre en place un dépôt Git** central pour stocker les prompts et les livrables générés.

### Phase 1 : Sélection et Priorisation des Défis (Lundi Après-midi)
L'objectif n'est pas de tout faire, mais de créer des synergies pour maximiser les points et la cohérence.

**Proposition de "Combos de Défis" :**

-   **Combo "Application Web Complète" (Très rentable)**
    1.  **#15 Hedwige (80 pts)**: Le cœur du projet, une application web.
    2.  **#5 CI/CD Express (25 pts)**: Automatiser le déploiement de l'app Hedwige.
    3.  **#2 PRAcadabra (25 pts)**: Scripter la mise en place de l'infra pour l'app Hedwige.
    4.  **#9 Le patronus d’EPSI (30 pts + bonus)**: Intégrer l'animation de chargement dans l'app Hedwige.
    * **Total potentiel : 160+ points** pour un projet cohérent et techniquement solide.

-   **Combo "Infrastructure & Big Data" (Spécialisé)**
    1.  **#1 DOCKERWARTS (50 pts)**: La base de l'infrastructure.
    2.  **#22 Le procès de J.K. Rowling (100 pts)**: Le cas d'usage parfait pour une infra Big Data. Utiliser ElasticSearch/Grafana pour visualiser les données collectées.
    3.  **#4 Protego Maxima (5+ pts)**: Sécuriser l'infrastructure mise en place.
    * **Total potentiel : 155+ points**, très orienté infra/data.

-   **Combo "Mobile & IA" (Orienté utilisateur)**
    1.  **#16 Tu es un sorcier Harry ! (45 pts)**: L'application mobile principale.
    2.  **#19 Professeur Dumbledore (65 pts)**: Intégrer la reconnaissance vocale des sorts dans l'application mobile pour une interaction unique.
    3.  **#20 Is iT yOu hARrY? (30 pts)**: Ajouter une fonctionnalité où l'utilisateur peut prendre une photo et l'app reconnaît le personnage.
    * **Total potentiel : 140 points**, projet très visuel et interactif, parfait pour la soutenance.

**Action :** Choisir l'un de ces combos ou en créer un nouveau en fonction des compétences de l'équipe. Ajouter le défi **#12 Starter Pack (5 pts)** pour des points faciles.

### Phase 2 : Réalisation et Itération (Mardi - Jeudi Matin)
1.  **Focus sur le Prompt Engineering** :
    * Commencer par des prompts généraux pour la structure, puis affiner itérativement.
    * Utiliser des techniques comme le "Chain of Thought", le "Zero-shot", ou donner des exemples précis à l'IA.
    * Détailler le contexte à chaque nouvelle interaction.
2.  **Documentation EN CONTINU** : Remplir le feuillet de prompts **au fur et à mesure**. Ne pas attendre la fin. Utiliser un modèle standard (voir ci-dessous).
3.  **Points de synchronisation quotidiens** : Un "daily meeting" de 15 minutes chaque matin pour discuter des blocages et de la répartition des tâches de la journée.

### Phase 3 : Finalisation des Livrables (Jeudi Après-midi)
1.  **Assembler le dossier de preuves** : Compiler tous les feuillets de prompts, ajouter les explications et exporter l'état du Trello/Jira en PDF.
2.  **Générer le support de présentation** : Utiliser l'IA pour créer les slides en respectant la structure demandée. Entraîner la présentation en anglais de l'équipe.
3.  **Vérification croisée** : Chaque membre de l'équipe relit les livrables pour s'assurer qu'ils respectent toutes les consignes du sujet.

### Phase 4 : Préparation de la Soutenance (Vendredi Matin)
1.  **Répéter le pitch** : S'entraîner à présenter en 5 minutes. Le timing est crucial.
2.  **Préparer la démo** : Choisir le défi le plus visuel et impressionnant à montrer en direct.
3.  **Anticiper les questions** : Préparer des réponses sur les difficultés rencontrées, les choix techniques (même s'ils sont faits par l'IA), et les apprentissages.

---

## 4. Modèle de Fiche de Prompts

Utiliser ce modèle pour chaque défi afin de standardiser la documentation.