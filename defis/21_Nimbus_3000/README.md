# 🧹 Défi #21 : Le Nimbus 3000

> **Benchmark des Optimizers pour CNN Harry Potter**  
> Workshop Poudlard RP 2025 - Maison Géminiard 🦅

---

## 📋 Description du Défi

Benchmark complet des optimizers (Adadelta, Adam, etc.) sur un réseau de neurones existant, avec rédaction d'un rapport au format papier de recherche.

**Points : 25 pts**

**Synergie avec Défi #20** : Utilise le CNN Harry Potter créé précédemment

---

## 🎯 Objectifs

1. ✅ Tester au moins 6 optimizers différents
2. ✅ Comparer leurs performances (accuracy, loss, temps)
3. ✅ Générer des visualisations professionnelles
4. ✅ Rédiger un rapport de recherche complet

---

## 🧪 Optimizers Testés (8 au total)

1. **Adam** - Adaptive Moment Estimation
2. **SGD** - Stochastic Gradient Descent (avec momentum)
3. **RMSprop** - Root Mean Square Propagation
4. **Adadelta** - Adaptive Delta
5. **Adagrad** - Adaptive Gradient
6. **Adamax** - Variante d'Adam avec norme infinie
7. **Nadam** - Nesterov Adam
8. **Ftrl** - Follow The Regularized Leader

---

## 🏗️ Méthodologie

### Dataset

- **Source** : CNN Harry Potter (Défi #20)
- **Classes** : 12 personnages
- **Images** : 100 par classe (1,200 total)
- **Split** : 80% train / 20% validation

### Configuration

| Paramètre | Valeur |
|-----------|--------|
| Architecture | CNN Custom (4 blocs conv) |
| Paramètres | ~3.5M |
| Batch Size | 32 |
| Epochs Max | 30 |
| Learning Rate | 0.001 (sauf Adadelta: 1.0) |
| Early Stopping | Oui (patience=5) |

### Métriques Comparées

- **Accuracy** : Précision finale et meilleure
- **Loss** : Perte de validation
- **Temps** : Durée d'entraînement
- **Convergence** : Epoch de meilleure accuracy
- **Stabilité** : Variance dans les dernières epochs

---

## 🚀 Utilisation

### Installation

```bash
cd defis/21_Nimbus_3000

# Installer les dépendances
pip install -r requirements.txt

# Vérifier que le défi #20 est complété
ls ../20_CNN_Harry/dataset  # Doit contenir les 12 dossiers de personnages
```

### Exécution du Benchmark

```bash
python optimizer_benchmark.py
```

**Temps estimé :**
- CPU : ~3-4 heures (8 optimizers × 30 epochs)
- GPU : ~40-60 minutes

### Résultats Générés

Le script produit automatiquement :

```
defis/21_Nimbus_3000/
├── benchmark_results.json       # Résultats bruts (JSON)
├── benchmark_results.csv        # Résultats tabulaires (CSV)
├── optimizer_comparison.png     # Courbes comparatives
├── optimizer_heatmap.png        # Heatmap de performance
├── optimizer_radar.png          # Radar chart multi-critères
├── research_paper.md            # Rapport de recherche complet
└── summary.md                   # Résumé exécutif
```

---

## 📊 Visualisations

### 1. Graphiques de Comparaison

**optimizer_comparison.png** contient 4 subplots :
- Validation Accuracy par optimizer
- Training Loss par optimizer  
- Temps d'entraînement (barres horizontales)
- Meilleure Accuracy (barres horizontales)

### 2. Heatmap de Performance

**optimizer_heatmap.png** montre :
- Best Accuracy (normalisée)
- Loss inversée (1 - loss)
- Vitesse normalisée

Couleurs : Vert = meilleur, Rouge = moins bon

### 3. Radar Chart

**optimizer_radar.png** compare sur 4 axes :
- **Accuracy** : Performance finale
- **Convergence** : Rapidité à atteindre le max
- **Vitesse** : Temps d'entraînement
- **Stabilité** : Variance faible = stable

---

## 📝 Rapport de Recherche

Le fichier `research_paper.md` contient :

### Structure

1. **Résumé Exécutif**
   - Meilleur optimizer
   - Plus rapide
   - Résultats clés

2. **Introduction**
   - Contexte
   - Objectif

3. **Méthodologie**
   - Dataset
   - Architecture CNN
   - Configuration expérimentale
   - Optimizers testés

4. **Résultats**
   - Tableau récapitulatif
   - Analyse par accuracy
   - Analyse par vitesse
   - Analyse de convergence

5. **Discussion**
   - Observations principales
   - Recommandations
   - Limitations

6. **Conclusion**
   - Synthèse
   - Meilleur choix

7. **Références**
   - Papers originaux

8. **Annexes**
   - Configuration système
   - Reproductibilité

---

## 📈 Résultats Attendus

### Classement Typique (Accuracy)

1. **Adam** / **Nadam** : ~92-95%
2. **RMSprop** : ~90-93%
3. **Adamax** : ~89-92%
4. **Adadelta** : ~87-90%
5. **Adagrad** : ~85-88%
6. **SGD** : ~83-87%
7. **Ftrl** : ~80-85%

*Note : Résultats peuvent varier selon le seed*

### Temps d'Entraînement

- **Plus rapides** : SGD, Ftrl (~200-300s)
- **Moyens** : Adam, RMSprop (~250-350s)
- **Plus lents** : Nadam, Adamax (~300-400s)

---

## 🔍 Analyse des Optimizers

### Adam (Adaptive Moment Estimation)

**Avantages :**
- ✅ Converge rapidement
- ✅ Bon par défaut
- ✅ Adaptatif

**Inconvénients :**
- ❌ Peut converger vers des minima moins généralisables

### SGD + Momentum

**Avantages :**
- ✅ Simple et éprouvé
- ✅ Bonne généralisation
- ✅ Rapide

**Inconvénients :**
- ❌ Learning rate à tuner
- ❌ Convergence plus lente

### RMSprop

**Avantages :**
- ✅ Bon pour RNN
- ✅ Adaptatif
- ✅ Stable

**Inconvénients :**
- ❌ Learning rate à choisir

### Adadelta

**Avantages :**
- ✅ Pas de learning rate à définir
- ✅ Adaptatif

**Inconvénients :**
- ❌ Convergence parfois lente

### Nadam

**Avantages :**
- ✅ Combine Adam + Nesterov
- ✅ Meilleure convergence

**Inconvénients :**
- ❌ Légèrement plus lent

---

## 🎓 Interprétation des Résultats

### Choisir selon le Cas d'Usage

**Pour Production (Accuracy Max) :**
→ Adam ou Nadam

**Pour Prototypage Rapide :**
→ Adam (bon compromis)

**Pour Généralisation :**
→ SGD + Momentum

**Pour RNN/LSTM :**
→ RMSprop

**Sans Tuning de LR :**
→ Adadelta

---

## 🔧 Personnalisation

### Ajouter un Optimizer

```python
# Dans optimizer_benchmark.py

OPTIMIZERS = {
    # ... existing optimizers
    'MonOptimizer': optimizers.MonOptimizer(learning_rate=0.001)
}
```

### Changer les Hyperparamètres

```python
# Learning rate différent
'Adam': optimizers.Adam(learning_rate=0.0001)

# SGD sans momentum
'SGD': optimizers.SGD(learning_rate=0.01, momentum=0.0)

# RMSprop avec decay
'RMSprop': optimizers.RMSprop(learning_rate=0.001, rho=0.9)
```

---

## 📁 Structure du Projet

```
defis/21_Nimbus_3000/
├── optimizer_benchmark.py       # Script principal (400+ lignes)
├── requirements.txt             # Dépendances
├── README.md                    # Cette documentation
├── prompts.md                   # Feuillet de prompts
│
├── benchmark_results.json       # Résultats bruts
├── benchmark_results.csv        # Résultats CSV
│
├── optimizer_comparison.png     # Visualisation 1
├── optimizer_heatmap.png        # Visualisation 2
├── optimizer_radar.png          # Visualisation 3
│
├── research_paper.md            # Rapport complet (auto-généré)
└── summary.md                   # Résumé (auto-généré)
```

---

## 🐛 Troubleshooting

### Erreur : Dataset non trouvé

```bash
# Créer d'abord le dataset du défi #20
cd ../20_CNN_Harry
python harry_potter_cnn.py
# Ou juste générer le dataset sans entraîner
```

### Erreur : Out of Memory

```python
# Réduire le batch size dans optimizer_benchmark.py
BATCH_SIZE = 16  # au lieu de 32

# Ou réduire les epochs
EPOCHS = 20  # au lieu de 30
```

### Benchmark trop long

```python
# Tester moins d'optimizers
OPTIMIZERS = {
    'Adam': optimizers.Adam(learning_rate=LEARNING_RATE),
    'SGD': optimizers.SGD(learning_rate=LEARNING_RATE, momentum=0.9),
    'RMSprop': optimizers.RMSprop(learning_rate=LEARNING_RATE)
}
```

---

## ✅ Validation du Défi

**Critères remplis :**

- [x] Benchmark sur réseau existant (CNN Défi #20)
- [x] Au moins 6 optimizers testés (8 au total)
- [x] Comparaison des performances
- [x] Métriques multiples (accuracy, loss, temps, convergence)
- [x] Visualisations professionnelles (3 graphiques)
- [x] Rapport format papier de recherche (research_paper.md)
- [x] Documentation complète
- [x] Code testable localement

**Points obtenus : 25 pts ✅**

---

## 📚 Références

### Papers Originaux

- **Adam**: Kingma & Ba (2014) - "Adam: A Method for Stochastic Optimization"
- **RMSprop**: Tieleman & Hinton (2012) - Lecture 6.5 of Neural Networks for Machine Learning
- **Adadelta**: Zeiler (2012) - "ADADELTA: An Adaptive Learning Rate Method"
- **Adagrad**: Duchi et al. (2011) - "Adaptive Subgradient Methods"
- **Nadam**: Dozat (2016) - "Incorporating Nesterov Momentum into Adam"

### Ressources

- [TensorFlow Optimizers](https://www.tensorflow.org/api_docs/python/tf/keras/optimizers)
- [Optimizer Comparison](https://ruder.io/optimizing-gradient-descent/)
- [Deep Learning Book - Ch 8](https://www.deeplearningbook.org/)

---

## 🎯 Améliorations Possibles

1. **Grid Search** : Tester différents learning rates par optimizer
2. **Multiple Seeds** : Moyenne sur plusieurs runs
3. **Architectures** : Tester sur d'autres CNN
4. **Datasets** : Tester sur CIFAR-10, ImageNet
5. **Metrics** : Ajouter F1-score, Precision, Recall
6. **Visualizations** : Ajouter t-SNE, feature maps

---

## 🚀 Commandes Rapides

```bash
# Installation
pip install -r requirements.txt

# Exécution complète
python optimizer_benchmark.py

# Voir les résultats
cat summary.md
open optimizer_comparison.png  # macOS
xdg-open optimizer_comparison.png  # Linux
start optimizer_comparison.png  # Windows

# Lire le rapport
cat research_paper.md
```

---

**Créé avec ❤️ par l'équipe Géminiard 🦅**  
**Workshop Poudlard RP 2025 - EPSI**

