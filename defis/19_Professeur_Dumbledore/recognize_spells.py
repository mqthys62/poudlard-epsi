#!/usr/bin/env python3
import argparse
import os
from pathlib import Path
import csv
import re
from difflib import SequenceMatcher

import numpy as np
import whisper

SPELLS = [
    "lumos", "nox", "alohomora", "expelliarmus", "protego",
    "accio", "wingardium leviosa", "stupefy"
]

CANONICAL = {
    "wingardium leviosa": ["wingardium leviosa", "wingardium levio sa", "wingardium"],
    "expelliarmus": ["expelliarmus", "expeliarmus", "expeliarmous", "ex peliarmus", "expelli armus"],
    "alohomora": ["alohomora", "alohomorra", "allo homora"],
    "lumos": ["lumos", "lumo", "lummos"],
    "nox": ["nox", "knox", "no x"],
    "protego": ["protego", "prote go", "pro tego"],
    "accio": ["accio", "akio", "accioo"],
    "stupefy": ["stupefy", "stupefai", "stupef y"],
}


def load_model(name: str):
    print(f"Loading Whisper model: {name}")
    return whisper.load_model(name)


def norm_text(t: str) -> str:
    t = t.lower().strip()
    t = re.sub(r"[^a-z\s]", " ", t)
    t = re.sub(r"\s+", " ", t)
    return t


def fuzzy_best_match(t: str) -> str:
    # Compare la transcription normalisée avec toutes les variantes connues
    best_spell = "unknown"
    best_score = 0.0
    for spell, variants in CANONICAL.items():
        for v in variants + [spell]:
            score = SequenceMatcher(None, t, v).ratio()
            if score > best_score:
                best_score = score
                best_spell = spell
    # seuil tolérant pour micro-audios/accents
    return best_spell if best_score >= 0.6 else "unknown"


def predict_spell(transcript: str) -> str:
    t = norm_text(transcript)
    # Contient directement un mot clé exact
    for s in SPELLS:
        if s in t:
            return s
    # Variantes canoniques
    for canon, variants in CANONICAL.items():
        for v in variants:
            if v in t:
                return canon
    # Fallback flou
    return fuzzy_best_match(t)


def iter_audio_files(input_dir: Path):
    exts = ["*.wav", "*.mp3", "*.m4a", "*.ogg"]
    files = []
    for ext in exts:
        files.extend(input_dir.glob(ext))
    return sorted(files)


def transcribe_folder(model, input_dir: Path, out_csv: Path):
    out_csv.parent.mkdir(parents=True, exist_ok=True)
    with out_csv.open("w", newline="", encoding="utf-8") as f:
        writer = csv.writer(f)
        writer.writerow(["file", "transcript", "pred_spell", "confidence"])
        for audio in iter_audio_files(input_dir):
            try:
                # Forcer langue anglaise, désactiver fp16 sur CPU
                result = model.transcribe(str(audio), fp16=False, language='en', task='transcribe')
                text = result.get("text", "").strip()
                conf = float(result.get("segments", [{}])[0].get("avg_logprob", -1.0)) if result.get("segments") else -1.0
                pred = predict_spell(text)
                writer.writerow([audio.name, text, pred, conf])
                print(f"{audio.name}: {pred} | {text}")
            except Exception as e:
                print(f"Error on {audio.name}: {e}")


def main():
    ap = argparse.ArgumentParser()
    ap.add_argument("--input", type=str, default="data/samples")
    ap.add_argument("--out", type=str, default="outputs")
    ap.add_argument("--model", type=str, default="tiny")
    args = ap.parse_args()

    input_dir = Path(args.input)
    out_dir = Path(args.out)
    out_dir.mkdir(parents=True, exist_ok=True)

    model = load_model(args.model)
    transcribe_folder(model, input_dir, out_dir / "predictions.csv")
    print("✅ Done. Predictions ->", out_dir / "predictions.csv")


if __name__ == "__main__":
    main()
