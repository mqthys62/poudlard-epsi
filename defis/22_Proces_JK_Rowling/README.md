# Défi #22 : Le procès de J.K. Rowling (Data Viz Harry Potter)

## Objectif
Analyser les livres Harry Potter et produire des visualisations répondant aux métriques demandées:
- Nombre de fois où Harry touche sa cicatrice
- Nombre de « Mais… » d'Hermione
- Interventions décisives de Dumbledore
- Comparaison des prises de parole Harry/Hermione/Ron
- Moments « Rogue being Rogue » (mystérieux/dark)
- Actes moralement/réglementairement répréhensibles
- Dérivés par livre + tendances
- Bonus: normaliser par nombre de pages (stats/100 pages)

## Critères de validation (checklist)
- [ ] Corpus exploitable (échantillon reproductible)
- [ ] Parser + pipeline d'extraction (regex + règles)
- [ ] Calcul des métriques et normalisation par livre/pages
- [ ] Visualisations professionnelles (Matplotlib/Seaborn)
- [ ] Rapport récapitulatif (Markdown)
- [ ] Script unique exécutable (end-to-end)
- [ ] Documentation d’installation et d’exécution

## Structure
```
22_Proces_JK_Rowling/
├─ data/                # Corpus minimal reproductible
├─ outputs/             # Graphiques et rapports générés
├─ requirements.txt
├─ analyze_hp.py        # Script principal (ETL + charts)
├─ README.md            # Ce fichier
└─ prompts.md           # Historique des prompts
```

## Installation
```bash
cd defis/22_Proces_JK_Rowling
python3 -m venv .venv && source .venv/bin/activate
pip install -r requirements.txt
python -m textblob.download_corpora
python -m spacy download en_core_web_sm
```

## Exécution
```bash
python analyze_hp.py --input data --out outputs
```

Sorties attendues dans `outputs/`:
- `counts_table.csv`
- `trend_lines.png`
- `mentions_comparison.png`
- `speech_share.png`
- `rogue_moments.png`
- `moral_acts.png`
- `report.md`

## Notes méthodologiques
- Corpus: extraits publics de résumé/synopsis (usage pédagogique) pour reproductibilité.
- NLP: règles (regex + fenêtres de contexte) + comptages case-insensitive; limites explicitement documentées.
- Normalisation: par livre et par 100 pages; pages approximatives (valeurs publiques estimées).

## Améliorations possibles
- Passage sur corpus complet (non fourni)
- Modèles NER personnalisés par personnage
- Désambiguïsation co-références
- Tableaux interactifs (Plotly)
