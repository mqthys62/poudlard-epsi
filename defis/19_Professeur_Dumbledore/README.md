# Défi #19 : Professeur Dumbledore – Reconnaissance vocale de sorts (ASR)

## Objectif
Reconnaître au moins 8 formules magiques à partir d’audio, en local.

## Critères de validation
- [ ] 8+ sorts reconnus
- [ ] Script CLI de test local (enregistrement ou fichiers)
- [ ] Évaluation (matrice de confusion + rapport)
- [ ] Documentation d’installation et d’utilisation

## Stack
- Whisper (openai-whisper) en local (CPU ok, GPU accélère)
- Python + librosa/soundfile pour I/O audio

## Installation
```bash
cd defis/19_Professeur_Dumbledore
python3 -m venv .venv && source .venv/bin/activate
pip install -r requirements.txt
```

## Jeu de données
- Dossier `data/samples/` avec fichiers `.wav` par sort (syntétiques ou enregistrés)
- Liste de sorts cibles (ex.):
  - "Lumos", "Nox", "Alohomora", "Expelliarmus", "Protego",
  - "Accio", "Wingardium Leviosa", "Stupefy"

## Utilisation
Transcription d’un dossier d’audios et classification des sorts:
```bash
python recognize_spells.py --input data/samples --out outputs --model tiny
```

Évaluation (si des labels sont fournis dans le nom du fichier):
```bash
python evaluate.py --pred outputs/predictions.csv --out outputs
```

## Sorties
- `outputs/predictions.csv` – Fichier CSV (fichier, transcription, sort_prédit, score)
- `outputs/confusion_matrix.png` – Matrice de confusion
- `outputs/report.md` – Rapport d’évaluation

## Limites
- Bruit/accents peuvent réduire l’accuracy; prévoir normalisation/lexique.

## Améliorations
- Fine-tuning léger (lexique de contraintes), VAD, augmentation de données.
