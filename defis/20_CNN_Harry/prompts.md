# 📝 Feuillet de Prompts - Défi #20 : Is iT yOu hARrY?

> **Défi Workshop Poudlard RP 2025**  
> **Équipe :** Géminiard 🦅  
> **Date :** 13 octobre 2025  
> **Points :** 30 pts

---

## 🎯 Contexte du Défi

**Objectif :** Créer un CNN (Convolutional Neural Network) sur Jupyter Notebook capable de reconnaître au moins 10 personnages de l'univers Harry Potter.

**Exigences :**
- Réseau de neurones convolutif fonctionnel
- Au moins 10 personnages différents
- Dataset d'entraînement
- Tests et visualisations
- Documentation sur Jupyter Notebook

---

## 📋 Prompts Utilisés

### Prompt 1 : Architecture Générale du Projet

```
Crée une solution complète pour le défi #20 "Is iT yOu hARrY?" - reconnaissance de personnages Harry Potter par CNN.

Contexte :
- Besoin d'un CNN pour reconnaître 12 personnages Harry Potter
- Doit être testable localement sur Jupyter Notebook
- Dataset synthétique (pas besoin de scraper des images)

Créer :
1. Un script Python complet (harry_potter_cnn.py) qui :
   - Génère un dataset synthétique avec des caractéristiques visuelles uniques par personnage
   - Construit un CNN avec 4 blocs de convolution
   - Data augmentation (rotation, translation, zoom, flip)
   - Entraînement avec callbacks (EarlyStopping, ReduceLR, ModelCheckpoint)
   - Évaluation avec métriques complètes
   - Visualisations (matrice de confusion, courbes d'entraînement)
   - Sauvegarde du modèle

2. Un Jupyter Notebook (harry_potter_cnn.ipynb) avec :
   - Cellules markdown explicatives
   - Code commenté
   - Visualisations intégrées
   - Section par section (dataset, modèle, entraînement, tests)

3. requirements.txt avec toutes les dépendances

Personnages à reconnaître (12) :
- Harry Potter, Hermione Granger, Ron Weasley
- Albus Dumbledore, Severus Snape, Lord Voldemort
- Draco Malfoy, Rubeus Hagrid, Minerva McGonagall
- Sirius Black, Dobby, Luna Lovegood

Architecture CNN :
- Input: 224x224x3
- 4 blocs Conv2D (32, 64, 128, 256 filtres)
- BatchNormalization + MaxPooling + Dropout après chaque bloc
- 2 couches Dense (512, 256) avec Dropout
- Output: 12 classes (softmax)

Dataset synthétique :
- 150 images par personnage (total 1800)
- Chaque personnage a des couleurs caractéristiques
- Patterns géométriques variés (cercles, rectangles, triangles)
- Gradients et bruit aléatoire

Configuration :
- IMG_SIZE = 224
- BATCH_SIZE = 32
- EPOCHS = 50
- LEARNING_RATE = 0.001
- Validation split = 20%

Code Python professionnel avec :
- Docstrings
- Type hints si possible
- Gestion d'erreurs
- Logs informatifs
- Sauvegarde des résultats
```

**Résultat :** 
- Script Python `harry_potter_cnn.py` créé (200+ lignes)
- Notebook Jupyter initié
- Requirements.txt avec 12 dépendances

---

### Prompt 2 : Génération du Dataset Synthétique

```
Dans la fonction create_synthetic_dataset(), implémente une logique qui crée des images synthétiques reconnaissables.

Contraintes :
- Chaque personnage doit avoir 2 couleurs caractéristiques (couleurs RGB)
- Utiliser des gradients entre les 2 couleurs
- Ajouter du bruit aléatoire (-30 à +30 sur chaque canal RGB)
- Alterner entre 3 patterns géométriques (cercle, rectangle, triangle)
- Taille : 224x224 pixels

Couleurs par personnage (exemples) :
- Harry Potter : Rouge foncé (139,0,0) → Or (255,215,0) [Gryffondor]
- Hermione : Marron (165,42,42) → Beige (255,228,196)
- Voldemort : Vert foncé (0,100,0) → Gris (128,128,128)
- Etc.

Utilise OpenCV (cv2) pour :
- Dessiner les cercles : cv2.circle()
- Dessiner les rectangles : cv2.rectangle()
- Dessiner les triangles : cv2.fillPoly()

Sauvegarde les images en JPEG dans dataset/{character_name}/img_{i:03d}.jpg
```

**Résultat :** Fonction génératrice de dataset synthétique avec patterns uniques

---

### Prompt 3 : Architecture CNN Optimisée

```
Crée une architecture CNN optimale pour la classification de 12 classes avec des images 224x224.

Spécifications :
- 4 blocs convolutionnels croissants (32→64→128→256 filtres)
- Kernel size 3x3 pour toutes les convolutions
- Activation ReLU
- BatchNormalization après chaque Conv2D
- MaxPooling2D (2,2) après chaque bloc
- Dropout (0.25) après chaque MaxPooling
- Flatten puis Dense(512) → Dense(256)
- Dropout (0.5) sur les couches denses
- Output: Dense(12, activation='softmax')

Utilise Keras Sequential API.
Compile avec :
- Optimizer: Adam (lr=0.001)
- Loss: categorical_crossentropy
- Metrics: accuracy + top_3_accuracy
```

**Résultat :** Architecture CNN avec ~3.5M paramètres

---

### Prompt 4 : Data Augmentation et Callbacks

```
Configure la data augmentation et les callbacks pour un entraînement optimal.

Data Augmentation (ImageDataGenerator) :
- rescale=1./255 (normalisation)
- rotation_range=20
- width_shift_range=0.2
- height_shift_range=0.2
- shear_range=0.2
- zoom_range=0.2
- horizontal_flip=True
- validation_split=0.2 (80/20 train/val)

Callbacks :
1. EarlyStopping :
   - monitor='val_loss'
   - patience=10
   - restore_best_weights=True

2. ReduceLROnPlateau :
   - monitor='val_loss'
   - factor=0.5
   - patience=5
   - min_lr=1e-7

3. ModelCheckpoint :
   - filepath='best_model.h5'
   - monitor='val_accuracy'
   - save_best_only=True

Flow_from_directory avec :
- target_size=(224, 224)
- batch_size=32
- class_mode='categorical'
- shuffle=True pour train, False pour validation
```

**Résultat :** Pipeline de préparation des données robuste

---

### Prompt 5 : Visualisations et Évaluation

```
Crée des visualisations professionnelles pour analyser les performances du CNN.

Génère 3 figures :

1. training_history.png :
   - 2 subplots côte à côte (figsize=16,6)
   - Gauche : Loss (train vs validation)
   - Droite : Accuracy (train vs validation)
   - Grilles, légendes, titres
   - Style seaborn

2. confusion_matrix.png :
   - Heatmap seaborn (figsize=14,12)
   - Colormap 'YlOrRd'
   - Annotations avec nombres
   - Labels des personnages (remplacer _ par espace)
   - Titre formaté

3. classification_report.txt :
   - Utiliser sklearn.classification_report
   - Precision, Recall, F1-score par classe
   - Macro et weighted averages
   - Sauvegarder dans un fichier texte

Métriques à calculer :
- Accuracy globale
- Precision (weighted)
- Recall (weighted)
- F1-score (weighted)
- Matrice de confusion (12x12)

Afficher un résumé final avec :
- Nombre de classes
- Nombre d'images train/val
- Nombre de paramètres du modèle
- Accuracy finale
```

**Résultat :** 3 visualisations PNG + rapport txt

---

### Prompt 6 : Documentation README Complète

```
Crée un README.md professionnel et complet pour le défi CNN Harry Potter.

Structure :
1. En-tête avec badges (si applicable), description, points
2. Liste des 12 personnages avec émojis
3. Architecture CNN (diagramme texte ASCII)
4. Installation (prérequis, étapes)
5. Utilisation (script Python + Jupyter)
6. Dataset (structure, caractéristiques)
7. Entraînement (config, augmentation, callbacks)
8. Résultats (métriques attendues, visualisations)
9. Test du modèle (exemple de code)
10. Structure du projet (arborescence)
11. Troubleshooting (GPU, mémoire, dataset perso)
12. Améliorations possibles (Transfer Learning, deployment)
13. Validation du défi (checklist)
14. Commandes rapides
15. Ressources et liens

Style :
- Émojis pour les sections
- Code blocks avec syntax highlighting
- Tables pour les données structurées
- Diagrammes ASCII pour l'architecture
- Sections repliables si nécessaire
- Ton professionnel mais accessible

Ajouter :
- Badge de statut (si GitHub)
- Exemples de résultats
- Screenshots des visualisations
- Commandes copy-paste prêtes
```

**Résultat :** README.md de 400+ lignes avec documentation exhaustive

---

### Prompt 7 : Fichier requirements.txt

```
Génère un fichier requirements.txt avec toutes les dépendances nécessaires.

Librairies requises avec versions minimales :
- tensorflow (>=2.13.0) pour le CNN
- keras (>=2.13.0) API haut niveau
- numpy (>=1.24.0) calculs matriciels
- pandas (>=2.0.0) manipulation de données
- matplotlib (>=3.7.0) visualisations
- seaborn (>=0.12.0) visualisations statistiques
- scikit-learn (>=1.3.0) métriques et split
- pillow (>=10.0.0) traitement d'images
- opencv-python (>=4.8.0) génération du dataset
- tqdm (>=4.65.0) barres de progression
- jupyter (>=1.0.0) notebook
- ipykernel (>=6.25.0) kernel Jupyter

Format :
package>=version

Un package par ligne, commentaires si nécessaire.
```

**Résultat :** requirements.txt avec 12 dépendances

---

## 📊 Résultats Obtenus

### ✅ Livrables Créés

1. **Script Python** (`harry_potter_cnn.py`)
   - 200+ lignes de code
   - 6 étapes (dataset, préparation, modèle, callbacks, entraînement, évaluation)
   - Génération automatique du dataset
   - Entraînement complet avec callbacks
   - Visualisations sauvegardées

2. **Jupyter Notebook** (`harry_potter_cnn.ipynb`)
   - Cellules markdown + code
   - Documentation intégrée
   - Visualisations inline

3. **README.md**
   - 400+ lignes
   - Documentation complète
   - Guides d'installation et utilisation
   - Troubleshooting

4. **requirements.txt**
   - 12 dépendances
   - Versions spécifiées

5. **Ce feuillet de prompts** (`prompts.md`)
   - Historique des 7 prompts
   - Contexte et résultats

### 📈 Caractéristiques Techniques

- **Dataset** : 1,800 images (150 par classe)
- **Architecture** : 4 blocs Conv + 2 Dense
- **Paramètres** : ~3.5 millions
- **Accuracy attendue** : >90%
- **Temps d'entraînement** : ~30-40 min (CPU), ~5-10 min (GPU)

### 🎯 Validation

✅ **Défi #20 : Is iT yOu hARrY? - 30 points**

**Critères validés :**
- [x] CNN fonctionnel
- [x] 12 personnages (> 10 requis)
- [x] Jupyter Notebook
- [x] Dataset créé
- [x] Entraînement avec validation
- [x] Tests et métriques
- [x] Visualisations (matrice, courbes)
- [x] Documentation complète

---

## 🔄 Itérations

### Version 1.0 (Initiale)
- Architecture de base
- Dataset synthétique simple

### Version 2.0 (Actuelle)
- 4 blocs convolutionnels
- BatchNormalization
- Data augmentation avancée
- Callbacks multiples
- Visualisations professionnelles
- Documentation exhaustive

### Version 3.0 (Future - optionnelle)
- Transfer Learning (ResNet50)
- Dataset réel scraped
- API de prédiction
- Interface web

---

## 📝 Notes Techniques

### Choix d'Architecture

1. **CNN Custom vs Transfer Learning**
   - Custom : Contrôle total, apprentissage de A à Z
   - Transfer Learning : Plus rapide, meilleure accuracy avec moins de data
   - **Choix** : Custom pour démontrer la compréhension

2. **Dataset Synthétique**
   - Avantages : Génération rapide, pas de scraping, patterns contrôlés
   - Inconvénients : Moins réaliste
   - **Justification** : Testable immédiatement, pas de problèmes de copyright

3. **Taille d'Image (224x224)**
   - Standard pour les CNNs
   - Compatible Transfer Learning si besoin
   - Bon compromis vitesse/précision

### Difficultés Rencontrées

1. **Génération de patterns uniques**
   - Solution : Couleurs caractéristiques + formes géométriques

2. **Overfitting potentiel**
   - Solution : Dropout + Data Augmentation + Early Stopping

3. **Temps d'entraînement CPU**
   - Solution : Réduire epochs, utiliser GPU si disponible

---

## 🎓 Apprentissages

### Prompt Engineering

- **Spécifications détaillées** : Architecture complète en un prompt
- **Exemples concrets** : Couleurs RGB exactes, dimensions
- **Structure claire** : Étapes numérotées, paramètres listés
- **Contraintes explicites** : Versions de packages, format de sortie

### Machine Learning

- **Architecture CNN** : Importance de BatchNorm et Dropout
- **Data Augmentation** : Crucial pour la généralisation
- **Callbacks** : Early Stopping évite l'overfitting
- **Métriques** : Accuracy + Confusion Matrix = vue complète

### Best Practices

- **Code modulaire** : Fonctions séparées, réutilisables
- **Logging** : tqdm pour progression, prints informatifs
- **Sauvegarde** : Modèle + poids + visualisations
- **Documentation** : README + prompts + code commenté

---

## 🚀 Utilisation Rapide

```bash
# Installation
cd defis/20_CNN_Harry
pip install -r requirements.txt

# Exécution
python harry_potter_cnn.py

# Résultats
ls *.png *.h5 *.txt
# → confusion_matrix.png
# → training_history.png
# → best_model.h5
# → harry_potter_cnn_final.h5
# → classification_report.txt
```

---

**Créé le :** 13 octobre 2025  
**Équipe :** Géminiard 🦅  
**IA utilisée :** Gemini 2.5 Flash & Pro  
**Temps total :** ~1 heure

---

**Note :** Ce feuillet de prompts est une preuve de travail conforme aux exigences du Workshop Poudlard RP 2025. Tous les fichiers ont été générés par l'IA sans modification manuelle.

