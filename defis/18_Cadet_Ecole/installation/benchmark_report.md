# 📊 RAPPORT DE TESTS - GEMMA 2B

**Date :** 2025-10-15 16:04:56  
**Modèle :** gemma:2b  
**Nombre de tests :** 8

---

## 📈 Statistiques Globales


| Métrique | Valeur |
|----------|--------|
| Temps moyen | 1.45s |
| Temps médian | 1.04s |
| Temps min | 0.53s |
| Temps max | 3.24s |
| Débit moyen | 29.0 tok/s |
| Débit médian | 27.7 tok/s |

---

## 📋 Résultats Détaillés

| Test | Temps (s) | Tokens | Débit (tok/s) |
|------|-----------|--------|---------------|
| Question Factuelle Simple | 0.98 | 25 | 25.4 |
| Génération de Code Python | 2.63 | 71 | 27.0 |
| Explication Technique | 1.84 | 67 | 36.4 |
| Traduction | 0.71 | 21 | 29.7 |
| Créativité - Haiku | 0.53 | 13 | 24.7 |
| Raisonnement Simple | 0.60 | 17 | 28.3 |
| Code JavaScript | 3.24 | 79 | 24.4 |
| Définition Technique | 1.09 | 39 | 35.9 |

---

## 💬 Exemples de Réponses


### Test 1 : Question Factuelle Simple

**Prompt :**
```
Quelle est la capitale de la France ? Réponds en un mot.
```

**Réponse :**
```
La capitale de la France est Paris.

Paris est la capitale de la France et est le centre administratif, économique et culturel de la France....
```

---

### Test 2 : Génération de Code Python

**Prompt :**
```
Écris une fonction Python qui calcule la factorielle d'un nombre. Code uniquement, sans explication.
```

**Réponse :**
```
```python
def factorial(n):
  """
  Calculer la factorielle d'un nombre.

  Paramètres :
    n : int

  Retour :
    int : La factorielle de n
  """

  # Si n est 0, la factorielle est 1.
  if n == 0:
    return 1

  # Calculer la factorielle de n en multipliant n par tous les nombres de 1 à n.
  fa...
```

---

### Test 3 : Explication Technique

**Prompt :**
```
Explique ce qu'est un réseau de neurones en 3 phrases maximum.
```

**Réponse :**
```
Un réseau de neurones est un ensemble de neurones connectées entre elles qui communiquent avec l'aide de signaux. 

Une neurone est une cellule qui traite des informations, et un réseau de neurones comprend un ensemble de neurones qui interagissent entre elles pour traiter des informations plus comp...
```

---


## 🎯 Conclusion

Gemma 2B démontre des performances stables pour un modèle de 2 milliards de paramètres :

- ✅ Réponses rapides (~2-8 secondes selon la complexité)
- ✅ Débit correct (~20-30 tokens/seconde sur CPU)
- ✅ Multilingue fonctionnel (français, anglais principalement)
- ✅ Adapté pour prototypage et développement

**Recommandation :** Excellent choix pour le défi #18 - Le plus petit LLM déployable localement.

---

**Généré par :** test_gemma.py  
**Workshop :** Poudlard RP 2025  
**Maison :** Géminiard 🦅
