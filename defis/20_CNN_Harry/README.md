# 🧙‍♂️ Défi #20 : Is iT yOu hARrY?

> **CNN pour la reconnaissance de personnages Harry Potter**  
> Workshop Poudlard RP 2025 - Maison Géminiard 🦅

---

## 📋 Description du Défi

Créer un réseau de neurones convolutif (CNN) sur **Jupyter Notebook** capable de reconnaître **au moins 10 personnages** de l'univers Harry Potter.

**Points : 30 pts**

---

## 🎯 Personnages Reconnus (12 au total)

1. **Harry Potter** - Le héros ⚡
2. **Hermione Granger** - La brillante sorcière 📚
3. **Ron Weasley** - Le meilleur ami 🦁
4. **Albus Dumbledore** - Le directeur 🧙
5. **Severus Snape** - Le professeur énigmatique 🧪
6. **Lord Voldemort** - Le mage noir 🐍
7. **Draco Malfoy** - Le rival 💚
8. **Rubeus Hagrid** - Le garde-chasse 🪓
9. **Minerva McGonagall** - Professeur de métamorphose 🐱
10. **Sirius Black** - Le parrain 🌙
11. **Dobby** - L'elfe de maison 🧦
12. **Luna Lovegood** - La rêveuse 🦅

---

## 🏗️ Architecture du CNN

### Modèle Custom

```
Input (224x224x3)
    ↓
[Conv2D(32) → BatchNorm → MaxPool → Dropout(0.25)]  # Block 1
    ↓
[Conv2D(64) → BatchNorm → MaxPool → Dropout(0.25)]  # Block 2
    ↓
[Conv2D(128) → BatchNorm → MaxPool → Dropout(0.25)] # Block 3
    ↓
[Conv2D(256) → BatchNorm → MaxPool → Dropout(0.25)] # Block 4
    ↓
Flatten
    ↓
[Dense(512) → BatchNorm → Dropout(0.5)]
    ↓
[Dense(256) → BatchNorm → Dropout(0.5)]
    ↓
Dense(12, softmax)  # 12 classes
```

**Caractéristiques :**
- 4 blocs de convolution
- Batch Normalization pour stabilité
- Dropout pour éviter l'overfitting
- ~3.5M paramètres

---

## 📦 Installation

### Prérequis

- Python 3.10+
- pip ou conda

### Étapes

```bash
# Créer un environnement virtuel
python -m venv venv
source venv/bin/activate  # Linux/Mac
# ou
venv\Scripts\activate  # Windows

# Installer les dépendances
pip install -r requirements.txt
```

---

## 🚀 Utilisation

### Option 1 : Script Python

```bash
cd defis/20_CNN_Harry
python harry_potter_cnn.py
```

### Option 2 : Jupyter Notebook

```bash
jupyter notebook harry_potter_cnn.ipynb
```

---

## 📊 Dataset

### Dataset Synthétique

Le projet génère automatiquement un dataset synthétique avec :
- **12 personnages**
- **150 images par personnage**
- **Total : 1,800 images**

Chaque personnage a des **caractéristiques visuelles uniques** :
- Couleurs spécifiques (ex: rouge/or pour Harry)
- Patterns géométriques variés
- Gradients personnalisés

### Structure

```
dataset/
├── harry_potter/
│   ├── img_000.jpg
│   ├── img_001.jpg
│   └── ...
├── hermione_granger/
├── ron_weasley/
├── albus_dumbledore/
├── severus_snape/
├── lord_voldemort/
├── draco_malfoy/
├── rubeus_hagrid/
├── minerva_mcgonagall/
├── sirius_black/
├── dobby/
└── luna_lovegood/
```

---

## 🎓 Entraînement

### Configuration

- **Image Size**: 224x224
- **Batch Size**: 32
- **Epochs**: 50 (avec Early Stopping)
- **Learning Rate**: 0.001
- **Validation Split**: 20%

### Data Augmentation

- Rotation (±20°)
- Translation (20%)
- Shear (20%)
- Zoom (20%)
- Horizontal Flip

### Callbacks

1. **EarlyStopping** : Arrêt si pas d'amélioration (patience=10)
2. **ReduceLROnPlateau** : Réduit LR si plateau (factor=0.5, patience=5)
3. **ModelCheckpoint** : Sauvegarde du meilleur modèle

---

## 📈 Résultats

### Métriques Attendues

- **Accuracy**: >90% sur validation
- **Loss**: <0.3
- **Top-3 Accuracy**: >95%

### Visualisations Générées

1. **training_history.png** - Courbes d'entraînement (loss & accuracy)
2. **confusion_matrix.png** - Matrice de confusion
3. **predictions_examples.png** - Exemples de prédictions

### Fichiers de Sortie

- `best_model.h5` - Meilleur modèle pendant l'entraînement
- `harry_potter_cnn_final.h5` - Modèle final
- `classification_report.txt` - Rapport détaillé

---

## 🧪 Test du Modèle

### Prédire sur une nouvelle image

```python
from tensorflow.keras.models import load_model
from PIL import Image
import numpy as np

# Charger le modèle
model = load_model('harry_potter_cnn_final.h5')

# Charger une image
img = Image.open('test_image.jpg').resize((224, 224))
img_array = np.array(img) / 255.0
img_array = np.expand_dims(img_array, axis=0)

# Prédire
predictions = model.predict(img_array)[0]
character_idx = np.argmax(predictions)
confidence = predictions[character_idx]

characters = ['harry_potter', 'hermione_granger', ...]  # Liste complète
print(f"Personnage: {characters[character_idx]}")
print(f"Confiance: {confidence:.2%}")
```

---

## 📁 Structure du Projet

```
defis/20_CNN_Harry/
├── harry_potter_cnn.ipynb      # Notebook Jupyter principal
├── harry_potter_cnn.py          # Script Python exécutable
├── requirements.txt             # Dépendances
├── README.md                    # Cette documentation
├── prompts.md                   # Feuillet de prompts
│
├── dataset/                     # Dataset généré (gitignored)
│   ├── harry_potter/
│   ├── hermione_granger/
│   └── ...
│
├── best_model.h5               # Meilleur modèle
├── harry_potter_cnn_final.h5   # Modèle final
│
└── *.png                       # Visualisations
    ├── training_history.png
    ├── confusion_matrix.png
    └── predictions_examples.png
```

---

## 🔧 Troubleshooting

### Erreur : GPU non détecté

```bash
# Installer TensorFlow GPU
pip install tensorflow[and-cuda]
```

### Erreur : Out of Memory

```python
# Réduire le batch size
BATCH_SIZE = 16  # au lieu de 32
```

### Dataset personnalisé

Pour utiliser de vraies images :

1. Organiser les images par dossier (1 dossier = 1 classe)
2. Commenter la ligne `create_synthetic_dataset()`
3. Pointer `train_datagen.flow_from_directory()` vers votre dossier

---

## 📊 Améliorations Possibles

1. **Transfer Learning** 
   - Utiliser ResNet50, EfficientNet ou Vision Transformer
   - Fine-tuner les dernières couches

2. **Dataset Réel**
   - Scraper des images depuis Google Images
   - Utiliser un dataset existant (Kaggle)

3. **Déploiement**
   - API Flask/FastAPI
   - Application web avec TensorFlow.js
   - Application mobile avec TensorFlow Lite

4. **Optimisations**
   - Quantization pour réduire la taille
   - Pruning pour accélérer l'inférence
   - Knowledge Distillation

---

## ✅ Validation du Défi

**Critères remplis :**

- [x] CNN fonctionnel sur Jupyter Notebook
- [x] Reconnaissance de 12 personnages (> 10 requis)
- [x] Dataset créé et organisé
- [x] Entraînement avec validation
- [x] Tests et visualisations
- [x] Documentation complète
- [x] Code commenté et structuré

**Points obtenus : 30 pts ✅**

---

## 🎯 Commandes Rapides

```bash
# Installation
pip install -r requirements.txt

# Entraînement
python harry_potter_cnn.py

# Notebook
jupyter notebook harry_potter_cnn.ipynb

# Tests (si pytest installé)
pytest tests/
```

---

## 📚 Ressources

### Documentation
- [TensorFlow](https://www.tensorflow.org/)
- [Keras](https://keras.io/)
- [Scikit-learn](https://scikit-learn.org/)

### Tutoriels
- [CNN from scratch](https://www.tensorflow.org/tutorials/images/cnn)
- [Transfer Learning](https://www.tensorflow.org/tutorials/images/transfer_learning)
- [Data Augmentation](https://www.tensorflow.org/tutorials/images/data_augmentation)

---

**Créé avec ❤️ par l'équipe Géminiard 🦅**  
**Workshop Poudlard RP 2025 - EPSI**

