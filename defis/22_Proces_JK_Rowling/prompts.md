# Feuillet de Prompts – Défi #22 : Le procès de J.K. Rowling

## Prompt 1 – Initialisation (14/10/2025)
> Créer l’ossature du projet d’analyse (requirements, README, prompts), un corpus minimal reproductible, et un script analyze_hp.py qui calcule les métriques demandées et génère des visualisations + un rapport.

## Décisions
- Corpus minimal (extraits résumés/synopsis) pour reproductibilité locale
- Méthode mixte regex + fenêtres de contexte (NLP light)
- Normalisation par 100 pages
- Visualisations seaborn/matplotlib (statique, prêt à déposer)

## À faire
- [ ] Remplir data/ (extraits par livre)
- [ ] Implémenter analyze_hp.py (ETL → métriques → charts → rapport)
- [ ] Générer outputs/ et vérifier critères
- [ ] Documenter limites et biais
