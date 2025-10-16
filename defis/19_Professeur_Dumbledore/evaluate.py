#!/usr/bin/env python3
import argparse
import csv
from pathlib import Path
from typing import List

import numpy as np
import pandas as pd
import seaborn as sns
import matplotlib.pyplot as plt

SPELLS = [
    "lumos", "nox", "alohomora", "expelliarmus", "protego",
    "accio", "wingardium leviosa", "stupefy", "unknown"
]


def infer_label_from_name(filename: str) -> str:
    name = filename.lower()
    for s in SPELLS:
        token = s.replace(" ", "_")
        if token in name:
            return s
    return "unknown"


def load_predictions(csv_path: Path) -> pd.DataFrame:
    rows = []
    with csv_path.open() as f:
        reader = csv.DictReader(f)
        for r in reader:
            r["true_spell"] = infer_label_from_name(r["file"])
            rows.append(r)
    df = pd.DataFrame(rows)
    return df


def plot_confusion(df: pd.DataFrame, out: Path):
    y_true = df["true_spell"].values
    y_pred = df["pred_spell"].values
    labels = SPELLS
    cm = pd.crosstab(pd.Categorical(y_true, categories=labels), pd.Categorical(y_pred, categories=labels), dropna=False)
    plt.figure(figsize=(10, 8))
    sns.heatmap(cm, annot=True, fmt="d", cmap="Blues")
    plt.xlabel("Prédit")
    plt.ylabel("Réel")
    plt.title("Matrice de confusion")
    plt.tight_layout()
    out.mkdir(parents=True, exist_ok=True)
    plt.savefig(out / "confusion_matrix.png")
    plt.close()


def write_report(df: pd.DataFrame, out: Path):
    total = len(df)
    acc = float((df["true_spell"] == df["pred_spell"]).mean()) if total else 0.0
    lines = ["# Rapport d'évaluation\n",
             f"Total fichiers: {total}\n",
             f"Accuracy: {acc:.3f}\n",
             "\n## Détails\n",
             df[["file", "true_spell", "pred_spell", "confidence"]].to_markdown(index=False)]
    (out / "report.md").write_text("\n".join(lines), encoding="utf-8")


def main():
    ap = argparse.ArgumentParser()
    ap.add_argument("--pred", type=str, default="outputs/predictions.csv")
    ap.add_argument("--out", type=str, default="outputs")
    args = ap.parse_args()

    df = load_predictions(Path(args.pred))
    out = Path(args.out)
    plot_confusion(df, out)
    write_report(df, out)
    print("✅ Evaluation terminée ->", out)


if __name__ == "__main__":
    main()
