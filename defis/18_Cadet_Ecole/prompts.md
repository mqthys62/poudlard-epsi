# FEUILLET DE PROMPTS - Défi #18 : Le Cadet de Votre École

**Défi :** Déployer en local la plus petite version de LLM de Gemini  
**Points :** 25 pts  
**Objectif :** Installer et exécuter le modèle Gemini le plus léger localement  
**Temps estimé :** 1h30

---

## 🎯 PROMPT 1 : Recherche du modèle Gemini le plus léger

**Prompt utilisé :**
```
Je dois déployer localement la plus petite version du LLM Gemini (Google). 

Recherche et identifie :
1. Quelle est la plus petite version de Gemini disponible pour déploiement local ?
2. Quel est le nombre de paramètres de ce modèle ?
3. Quelles sont les alternatives open-source basées sur Gemini ou similaires ?
4. Quels sont les prérequis système (RAM, GPU, stockage) ?

Fournis une réponse technique détaillée avec les sources.
```

**Résultat obtenu :**

**Gemini Nano** est la plus petite version de Gemini, conçue pour fonctionner sur appareils mobiles et localement.

Caractéristiques :
- **Paramètres :** ~1.8B à 3.25B paramètres (selon la variante)
- **Versions :** Nano-1 et Nano-2
- **Prérequis minimaux :**
  - RAM : 4-8 GB
  - Stockage : ~2-4 GB
  - GPU : Optionnel (CPU suffit)
  - OS : Linux, Android, Chrome OS

**Alternatives pour déploiement local :**
1. **Gemma** (Google) - Open source, dérivé de Gemini
   - Gemma 2B (2 milliards de paramètres)
   - Gemma 7B (7 milliards de paramètres)
   
2. **Utilisation via Ollama** :
   - Permet de déployer Gemma localement facilement
   - Interface simple en ligne de commande

---

## 🎯 PROMPT 2 : Guide d'installation de Gemma 2B avec Ollama

**Prompt utilisé :**
```
Génère un guide complet d'installation étape par étape pour déployer Gemma 2B (la plus petite version liée à Gemini) en local sur Linux en utilisant Ollama.

Le guide doit inclure :
1. Installation d'Ollama
2. Téléchargement du modèle Gemma 2B
3. Commandes de test
4. Vérification que ça fonctionne
5. Exemples d'utilisation

Format : Tutoriel technique avec toutes les commandes Shell nécessaires.
```

**Résultat obtenu :**

```bash
# GUIDE D'INSTALLATION - GEMMA 2B LOCAL

## Étape 1 : Installation d'Ollama

# Télécharger et installer Ollama
curl -fsSL https://ollama.com/install.sh | sh

# Vérifier l'installation
ollama --version

## Étape 2 : Télécharger Gemma 2B

# Télécharger le modèle Gemma 2B (plus petit modèle)
ollama pull gemma:2b

# Alternative : Gemma 2B en mode instruction-tuned
ollama pull gemma:2b-instruct

## Étape 3 : Lancer le modèle

# Démarrer Gemma en mode interactif
ollama run gemma:2b

## Étape 4 : Test du modèle

# Dans le prompt Ollama, tester avec :
>>> Bonjour, qui es-tu ?
>>> Explique-moi ce qu'est un réseau de neurones en 3 phrases.
>>> /bye  # Pour quitter

## Étape 5 : Utilisation via API

# Lancer le serveur Ollama
ollama serve

# Tester via API (dans un autre terminal)
curl http://localhost:11434/api/generate -d '{
  "model": "gemma:2b",
  "prompt": "Pourquoi le ciel est-il bleu?",
  "stream": false
}'

## Étape 6 : Informations sur le modèle

# Voir les détails du modèle
ollama show gemma:2b

# Lister tous les modèles installés
ollama list

# Voir l'utilisation de la mémoire
ollama ps
```

---

## 🎯 PROMPT 3 : Script de déploiement automatisé

**Prompt utilisé :**
```
Crée un script Bash qui automatise l'installation complète de Gemma 2B avec Ollama, avec :
- Vérifications des prérequis système
- Installation d'Ollama
- Téléchargement de Gemma 2B
- Tests automatiques
- Génération d'un rapport de déploiement

Le script doit être robuste avec gestion d'erreurs.
```

**Résultat :** Script `deploy_gemma.sh`

---

## 🎯 PROMPT 4 : Documentation technique du déploiement

**Prompt utilisé :**
```
Rédige une documentation technique professionnelle (format Markdown) expliquant :

1. Introduction : Pourquoi Gemma 2B ?
2. Architecture du modèle
3. Processus de déploiement local
4. Spécifications techniques
5. Cas d'usage
6. Limites et considérations
7. Comparaison avec d'autres LLMs légers

Style : Documentation DevOps professionnelle, 800-1000 mots.
```

**Résultat :** Documentation complète dans `documentation/deploiement_gemma.md`

---

## 🎯 PROMPT 5 : Exemples d'utilisation et benchmarks

**Prompt utilisé :**
```
Crée un notebook ou script Python qui :
1. Se connecte au modèle Gemma 2B local via l'API Ollama
2. Teste différents types de prompts (questions, code, créativité)
3. Mesure le temps de réponse
4. Compare les réponses avec et sans streaming
5. Génère un rapport de performance

Code Python commenté et documenté.
```

**Résultat :** Script `test_gemma.py` avec benchmarks

---

## 📊 VALIDATION DU DÉFI

- ✅ Identification du plus petit modèle Gemini (Gemma 2B)
- ✅ Installation locale réussie
- ✅ Modèle déployé et fonctionnel
- ✅ Documentation technique complète
- ✅ Scripts d'automatisation
- ✅ Tests et benchmarks
- ✅ Tout le processus documenté

**Spécifications du modèle déployé :**
- Nom : Gemma 2B
- Paramètres : 2 milliards
- Taille : ~1.4 GB
- RAM utilisée : ~3-4 GB
- Technologie : Dérivé de Gemini (Google)

**Statut :** ✅ VALIDÉ  
**Points :** 25 pts  
**Temps réel :** 1h30

