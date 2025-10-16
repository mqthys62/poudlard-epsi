# 📝 Feuillet de Prompts - Défi #21 : Le Nimbus 3000

> **Défi Workshop Poudlard RP 2025**  
> **Équipe :** Géminiard 🦅  
> **Date :** 13 octobre 2025  
> **Points :** 25 pts

---

## 🎯 Contexte du Défi

**Objectif :** Benchmarker différents optimizers (Adadelta, Adam, etc.) sur le CNN Harry Potter (Défi #20), avec rédaction d'un rapport au format papier de recherche.

**Exigences :**
- Tester au moins 6 optimizers
- Comparer performances (accuracy, loss, temps)
- Générer des visualisations
- Rapport de recherche format académique

**Synergie :** Utilise le CNN du Défi #20

---

## 📋 Prompts Utilisés

### Prompt 1 : Script de Benchmark Principal

```
Crée un script Python complet pour benchmarker différents optimizers sur le CNN Harry Potter (Défi #20).

Contexte :
- Réutiliser le CNN créé dans ../20_CNN_Harry/
- Tester 8 optimizers différents : Adam, SGD, RMSprop, Adadelta, Adagrad, Adamax, Nadam, Ftrl
- Comparer leurs performances sur les mêmes données
- Générer des visualisations professionnelles
- Produire un rapport de recherche

Script à créer : optimizer_benchmark.py

Structure :
1. Imports et configuration
2. Classe BenchmarkResults pour stocker les résultats
3. Fonction prepare_data() : charge le dataset du défi #20
4. Fonction benchmark_optimizer() : entraîne avec un optimizer
5. Fonction plot_comparison() : génère 3 visualisations
6. Fonction generate_research_paper() : crée le rapport MD
7. main() : orchestre tout

Configuration :
- IMG_SIZE = 224
- BATCH_SIZE = 32
- EPOCHS = 30 (réduit vs défi #20 pour vitesse)
- LEARNING_RATE = 0.001 (sauf Adadelta = 1.0)

Optimizers avec TensorFlow :
OPTIMIZERS = {
    'Adam': optimizers.Adam(learning_rate=0.001),
    'SGD': optimizers.SGD(learning_rate=0.001, momentum=0.9),
    'RMSprop': optimizers.RMSprop(learning_rate=0.001),
    'Adadelta': optimizers.Adadelta(learning_rate=1.0),
    'Adagrad': optimizers.Adagrad(learning_rate=0.001),
    'Adamax': optimizers.Adamax(learning_rate=0.001),
    'Nadam': optimizers.Nadam(learning_rate=0.001),
    'Ftrl': optimizers.Ftrl(learning_rate=0.001)
}

Métriques à collecter par optimizer :
- History (loss, accuracy par epoch)
- Training time (en secondes)
- Final validation accuracy
- Final validation loss
- Best validation accuracy
- Epoch du best
- Nombre d'epochs avant early stopping

BenchmarkResults.to_dataframe() doit créer un DataFrame pandas avec :
- Colonnes : Optimizer, Final Val Accuracy, Best Val Accuracy, Final Val Loss, Best Epoch, Training Time (s), Epochs Trained

Callbacks :
- EarlyStopping (monitor='val_loss', patience=5, restore_best_weights=True)

Sauvegardes :
- benchmark_results.json (détails complets)
- benchmark_results.csv (tableau)

Importer depuis défi #20 :
- from harry_potter_cnn import create_synthetic_dataset, build_cnn_model
- Ajouter sys.path.insert(0, '../20_CNN_Harry')
```

**Résultat :** Script optimizer_benchmark.py créé (400+ lignes)

---

### Prompt 2 : Visualisations Comparatives

```
Dans la fonction plot_comparison(benchmark_results), crée 3 visualisations professionnelles.

Visualisation 1 : optimizer_comparison.png (4 subplots)
Figure size : (18, 10)

Subplot 1 (top-left) : Validation Accuracy
- Courbes des val_accuracy de tous les optimizers
- X-axis : Epoch, Y-axis : Accuracy
- Légendes, grid, titre

Subplot 2 (top-right) : Training Loss
- Courbes des training loss de tous les optimizers
- Légendes, grid, titre

Subplot 3 (bottom-left) : Temps d'Entraînement
- Barres horizontales (plt.barh)
- Trier par temps croissant
- Afficher les valeurs en secondes à droite des barres
- Couleur : skyblue

Subplot 4 (bottom-right) : Meilleure Accuracy
- Barres horizontales (plt.barh)
- Trier par accuracy décroissante
- Afficher les valeurs (format .4f) dans les barres
- Couleur : lightgreen
- xlim : [0, 1]

Visualisation 2 : optimizer_heatmap.png
Figure size : (12, 8)

Créer une heatmap seaborn avec 3 colonnes :
- Best Accuracy (tel quel)
- Loss (inv) : 1 - final_val_loss (pour que plus = mieux)
- Vitesse (norm) : 1 / (train_time / 100) (normaliser)

Index : noms des optimizers
Colormap : 'RdYlGn' (rouge-jaune-vert)
Annotations : format '.3f'

Visualisation 3 : optimizer_radar.png
Figure size : (14, 14)
Projection : polar

4 critères (axes) :
1. Accuracy : best_val_accuracy
2. Convergence : 1 - (best_epoch / EPOCHS) [plus tôt = mieux]
3. Vitesse : 1 - (train_time / max_train_time)
4. Stabilité : 1 - std(val_accuracy[-5:]) [moins de variance = mieux]

Pour chaque optimizer :
- Tracer un polygone avec plot() et fill()
- Alpha = 0.15 pour le fill
- Légendes

Sauvegarder toutes les figures en PNG (dpi=150, bbox_inches='tight')
```

**Résultat :** 3 visualisations PNG générées

---

### Prompt 3 : Rapport de Recherche Format Académique

```
Dans generate_research_paper(benchmark_results), crée un rapport au format Markdown qui suit la structure d'un paper de recherche.

Structure obligatoire :

# Titre : "Le Nimbus 3000 : Benchmark des Optimizers pour CNN"

## Résumé Exécutif
- Contexte de l'étude
- Nombre d'optimizers testés
- Meilleur optimizer (nom + accuracy)
- Plus rapide (nom + temps)
- Dataset et architecture utilisés

## 1. Introduction
### 1.1 Contexte
- Importance des optimizers en Deep Learning
- Impact sur convergence, qualité, temps

### 1.2 Objectif
- Comparer empiriquement N optimizers
- Liste des optimizers testés

## 2. Méthodologie
### 2.1 Dataset
- Source, classes, nombre d'images, résolution, split

### 2.2 Architecture CNN
- Diagramme texte de l'architecture
- Nombre de paramètres
- Loss function et métriques

### 2.3 Configuration Expérimentale
- Tableau avec : Batch Size, Epochs, LR, Early Stopping, Data Augmentation

### 2.4 Optimizers Testés
- Liste avec descriptions

## 3. Résultats
### 3.1 Tableau Récapitulatif
- df.to_markdown(index=False) pour afficher le tableau

### 3.2 Analyse des Performances
#### 3.2.1 Accuracy
- Meilleur optimizer + valeur
- Classement par accuracy

#### 3.2.2 Vitesse d'Entraînement
- Plus rapide + temps
- Classement par vitesse

#### 3.2.3 Convergence
- Meilleur convergence (epoch le plus bas)

### 3.3 Visualisations
- Liste des 3 images générées

## 4. Discussion
### 4.1 Observations Principales
- Comparaisons Adam vs SGD
- Observations sur adaptive LR
- Convergence et stabilité

### 4.2 Recommandations
- Pour production
- Pour dev rapide
- Compromis

### 4.3 Limitations
- Dataset synthétique
- Architecture fixe
- Hyperparamètres non optimisés
- Single seed

## 5. Conclusion
- Synthèse des résultats
- Meilleur choix global

## 6. Références
- Papers originaux (Adam, RMSprop, Adadelta, Adagrad)

## 7. Annexes
### 7.1 Configuration Système
- TensorFlow version
- Python version
- Hardware (GPU/CPU)

### 7.2 Reproductibilité
- Commande pour reproduire

Sauvegarder :
- research_paper.md (rapport complet)
- summary.md (résumé court avec meilleur optimizer)

Le rapport doit être auto-généré avec les vraies valeurs du benchmark.
Utiliser f-strings pour insérer les résultats dynamiquement.
```

**Résultat :** Rapport de recherche auto-généré en Markdown

---

### Prompt 4 : README Documentation

```
Crée un README.md complet pour le défi #21 Le Nimbus 3000.

Structure :
1. En-tête (titre, description, points, synergie avec défi #20)
2. Objectifs (liste avec checkmarks)
3. Optimizers testés (8 au total, avec descriptions brèves)
4. Méthodologie (dataset, config, métriques)
5. Utilisation (installation, exécution, temps estimé)
6. Résultats générés (liste des fichiers produits)
7. Visualisations (description des 3 PNG)
8. Rapport de recherche (structure du MD)
9. Résultats attendus (classements typiques)
10. Analyse des optimizers (avantages/inconvénients de chacun)
11. Interprétation (quand utiliser quel optimizer)
12. Personnalisation (comment ajouter un optimizer)
13. Structure du projet (arborescence)
14. Troubleshooting (dataset non trouvé, OOM, benchmark long)
15. Validation du défi (checklist)
16. Références (papers)
17. Améliorations possibles
18. Commandes rapides

Style :
- Émojis pour les sections
- Tables pour données structurées
- Code blocks pour exemples
- Listes pour énumérations
- Badges si applicable

Ton professionnel, adapté workshop étudiant.
Minimum 300 lignes.
```

**Résultat :** README.md (350+ lignes)

---

### Prompt 5 : Requirements.txt

```
Crée requirements.txt avec les dépendances nécessaires pour le benchmark.

Packages requis :
- tensorflow (>=2.13.0) - pour les optimizers et le CNN
- numpy (>=1.24.0) - calculs
- pandas (>=2.0.0) - DataFrames pour résultats
- matplotlib (>=3.7.0) - visualisations
- seaborn (>=0.12.0) - heatmap et styles
- tqdm (>=4.65.0) - barres de progression
- tabulate (>=0.9.0) - pour to_markdown() de pandas

Format : package>=version
Une dépendance par ligne
```

**Résultat :** requirements.txt avec 7 dépendances

---

## 📊 Résultats Obtenus

### ✅ Livrables Créés

1. **Script de Benchmark** (`optimizer_benchmark.py`)
   - 400+ lignes
   - Classe BenchmarkResults
   - 8 optimizers testés
   - Sauvegarde JSON/CSV
   - Génération automatique de visualisations et rapport

2. **Visualisations** (3 PNG)
   - `optimizer_comparison.png` - 4 subplots comparatifs
   - `optimizer_heatmap.png` - Heatmap performance
   - `optimizer_radar.png` - Radar chart multi-critères

3. **Rapport de Recherche** (`research_paper.md`)
   - Format académique
   - 7 sections principales
   - Auto-généré avec vraies données
   - Citations et références

4. **Documentation** (`README.md`)
   - 350+ lignes
   - Guide complet d'utilisation
   - Analyse des optimizers
   - Troubleshooting

5. **Dependencies** (`requirements.txt`)
   - 7 packages
   - Versions spécifiées

6. **Ce feuillet de prompts** (`prompts.md`)
   - 5 prompts détaillés
   - Résultats et apprentissages

### 📈 Caractéristiques Techniques

**Benchmark :**
- **8 optimizers** testés (Adam, SGD, RMSprop, Adadelta, Adagrad, Adamax, Nadam, Ftrl)
- **30 epochs max** par optimizer
- **Early Stopping** (patience=5)
- **Métriques** : Accuracy, Loss, Temps, Convergence, Stabilité

**Visualisations :**
- **4 graphiques** dans comparison (accuracy, loss, temps, best acc)
- **Heatmap** 3 critères normalisés
- **Radar** 4 axes (accuracy, convergence, vitesse, stabilité)

**Rapport :**
- **Format académique** avec 7 sections
- **Auto-généré** avec résultats dynamiques
- **Références** aux papers originaux

### 🎯 Validation

✅ **Défi #21 : Le Nimbus 3000 - 25 points**

**Critères validés :**
- [x] Benchmark sur réseau existant (CNN Défi #20)
- [x] Au moins 6 optimizers (8 testés)
- [x] Comparaison de performances (5 métriques)
- [x] Visualisations professionnelles (3 PNG)
- [x] Rapport format papier de recherche (MD)
- [x] Documentation complète (README)
- [x] Code testable localement
- [x] Reproductibilité garantie

---

## 🔄 Itérations

### Version 1.0 (Initiale)
- 6 optimizers de base
- 2 visualisations simples
- Rapport basique

### Version 2.0 (Actuelle)
- **8 optimizers** (ajout Ftrl, Adamax)
- **3 visualisations** professionnelles
- **Radar chart** multi-critères
- **Rapport académique** complet avec références
- **Auto-génération** du rapport avec vraies données
- **Classe BenchmarkResults** pour structure

### Version 3.0 (Future - optionnelle)
- Grid search learning rates
- Multiple seeds (moyenne)
- Tests sur autres architectures
- Visualisations interactives (Plotly)

---

## 📝 Notes Techniques

### Choix des Optimizers

**Pourquoi ces 8 ?**
1. **Adam** - Le plus populaire, baseline
2. **SGD** - Classique avec momentum
3. **RMSprop** - Référence pour RNN
4. **Adadelta** - Pas de LR à définir
5. **Adagrad** - Historique, base d'Adam
6. **Adamax** - Variante Adam avec ∞-norm
7. **Nadam** - Adam + Nesterov
8. **Ftrl** - Spécialisé sparse features

**Exclus :**
- SGD sans momentum (moins performant)
- Optimizers obsolètes
- Optimizers expérimentaux

### Métriques Choisies

1. **Accuracy** : Métrique principale
2. **Loss** : Qualité de l'optimisation
3. **Temps** : Coût computationnel
4. **Convergence** : Efficacité
5. **Stabilité** : Robustesse

### Visualisations

**Pourquoi 3 types ?**
- **Comparison** : Vue temporelle (epochs)
- **Heatmap** : Vue globale normalisée
- **Radar** : Vue multi-critères équilibrée

---

## 🎓 Apprentissages

### Prompt Engineering

- **Réutilisation de code** : Import depuis défi #20
- **Auto-génération** : Rapport avec f-strings dynamiques
- **Modularité** : Fonctions séparées et réutilisables
- **Visualisations variées** : Subplots, heatmap, radar

### Machine Learning

- **Optimizers** : Différences significatives de performance
- **Hyperparamètres** : LR critique (Adadelta = 1.0)
- **Early Stopping** : Essentiel pour comparaison équitable
- **Normalisation** : Nécessaire pour heatmap et radar

### Best Practices

- **Classe de résultats** : Structure pour données
- **Sauvegarde multiple** : JSON + CSV + MD
- **Format académique** : Rapport professionnel
- **Reproductibilité** : Config complète documentée

---

## 🚀 Utilisation Rapide

```bash
# Installation
cd defis/21_Nimbus_3000
pip install -r requirements.txt

# Vérifier dataset défi #20
ls ../20_CNN_Harry/dataset

# Benchmark complet (3-4h CPU, 40-60min GPU)
python optimizer_benchmark.py

# Résultats
cat summary.md
cat research_paper.md
open optimizer_comparison.png
```

---

**Créé le :** 13 octobre 2025  
**Équipe :** Géminiard 🦅  
**IA utilisée :** Gemini 2.5 Flash & Pro  
**Temps total :** ~1 heure

---

**Note :** Ce feuillet de prompts est une preuve de travail conforme aux exigences du Workshop Poudlard RP 2025. Tous les fichiers ont été générés par l'IA sans modification manuelle.

