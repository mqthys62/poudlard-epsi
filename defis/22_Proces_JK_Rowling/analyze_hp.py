#!/usr/bin/env python3
import argparse
import os
import re
from pathlib import Path
from typing import Dict, List

import numpy as np
import pandas as pd
import seaborn as sns
import matplotlib.pyplot as plt
from slugify import slugify

# Pages approximatives par livre (édition poche FR/EN mix estimation)
BOOK_PAGES = {
    1: 309,
    2: 341,
    3: 435,
    4: 636,
    5: 870,
    6: 607,
    7: 759,
}

TARGETS = {
    'scar_touch': r"harry[^\n]{0,50}(cicatrice|cicatrix|scar)|scar[^\n]{0,50}harry",
    'hermione_mais': r"hermione[^\n]{0,30}\bmais\b|\bmais\b[^\n]{0,30}hermione",
    'dumbledore_intervene': r"dumbledore[^\n]{0,50}(intervient|interven|decid|change|impose|ordonne|intervene|decides|decided)",
    'rogue_dark': r"(rogue|snape)[^\n]{0,60}(myster|mystérieux|dark|sinistre|severe|glacial|cold)|" \
                   r"(myster|mystérieux|dark|sinistre|severe|glacial|cold)[^\n]{0,60}(rogue|snape)",
    'moral_illicit': r"(interdit|illicite|prohib|tabou|crime|criminel|illegal|unlawful|detenus|detention|torture|cruel)",
}

SPEECH_PATTERNS = {
    'harry': r"harry\s*:\s|\"[^\"]+\"\s*,?\s*(dit|repondit|lanca)\s*harry",
    'hermione': r"hermione\s*:\s|\"[^\"]+\"\s*,?\s*(dit|repondit|lanca)\s*hermione",
    'ron': r"ron\s*:\s|\"[^\"]+\"\s*,?\s*(dit|repondit|lanca)\s*ron",
}


def load_corpus(input_dir: Path) -> Dict[int, str]:
    corpus: Dict[int, str] = {}
    for i in range(1, 8):
        p = input_dir / f"hp{i}.txt"
        if p.exists():
            corpus[i] = p.read_text(encoding='utf-8')
    if not corpus:
        raise FileNotFoundError("Aucun fichier trouvé dans data/ (hp1.txt ... hp7.txt)")
    return corpus


def count_pattern(text: str, pattern: str) -> int:
    return len(re.findall(pattern, text, flags=re.IGNORECASE | re.MULTILINE))


def compute_metrics(corpus: Dict[int, str]) -> pd.DataFrame:
    rows: List[Dict] = []
    for book_id, text in corpus.items():
        pages = BOOK_PAGES.get(book_id, 300)
        row = {
            'book': book_id,
            'pages': pages,
            'scar_touch': count_pattern(text, TARGETS['scar_touch']),
            'hermione_mais': count_pattern(text, TARGETS['hermione_mais']),
            'dumbledore_intervene': count_pattern(text, TARGETS['dumbledore_intervene']),
            'rogue_dark': count_pattern(text, TARGETS['rogue_dark']),
            'moral_illicit': count_pattern(text, TARGETS['moral_illicit']),
            'speech_harry': count_pattern(text, SPEECH_PATTERNS['harry']),
            'speech_hermione': count_pattern(text, SPEECH_PATTERNS['hermione']),
            'speech_ron': count_pattern(text, SPEECH_PATTERNS['ron']),
        }
        # Normalisation par 100 pages
        for k in ['scar_touch', 'hermione_mais', 'dumbledore_intervene', 'rogue_dark', 'moral_illicit']:
            row[f"{k}_per100"] = (row[k] / pages) * 100.0
        rows.append(row)
    df = pd.DataFrame(rows).sort_values('book')
    return df


def plot_trends(df: pd.DataFrame, out: Path):
    sns.set_theme(style='darkgrid')
    plt.figure(figsize=(12, 7))
    melted = df.melt(id_vars=['book'],
                     value_vars=['scar_touch_per100', 'hermione_mais_per100', 'dumbledore_intervene_per100', 'rogue_dark_per100', 'moral_illicit_per100'],
                     var_name='metric', value_name='value')
    sns.lineplot(data=melted, x='book', y='value', hue='metric', marker='o')
    plt.title('Tendances normalisées par 100 pages')
    plt.xlabel('Livre #')
    plt.ylabel('Occurrences / 100 pages')
    plt.tight_layout()
    plt.savefig(out / 'trend_lines.png')
    plt.close()


def plot_mentions(df: pd.DataFrame, out: Path):
    plt.figure(figsize=(10, 6))
    subset = df[['book', 'scar_touch', 'hermione_mais', 'dumbledore_intervene', 'rogue_dark', 'moral_illicit']]
    melted = subset.melt(id_vars=['book'], var_name='metric', value_name='count')
    sns.barplot(data=melted, x='book', y='count', hue='metric')
    plt.title('Mentions totales par livre')
    plt.xlabel('Livre #')
    plt.ylabel('Occurrences')
    plt.tight_layout()
    plt.savefig(out / 'mentions_comparison.png')
    plt.close()


def plot_speech_share(df: pd.DataFrame, out: Path):
    plt.figure(figsize=(10, 6))
    melted = df.melt(id_vars=['book'], value_vars=['speech_harry', 'speech_hermione', 'speech_ron'], var_name='speaker', value_name='utterances')
    sns.barplot(data=melted, x='book', y='utterances', hue='speaker')
    plt.title('Parts de prises de parole (proxy) par livre')
    plt.xlabel('Livre #')
    plt.ylabel('Comptes (proxy)')
    plt.tight_layout()
    plt.savefig(out / 'speech_share.png')
    plt.close()


def write_report(df: pd.DataFrame, out: Path):
    report = ["# Rapport – Procès de J.K. Rowling\n"]
    report.append("## Métriques globales par livre\n")
    report.append(df.to_markdown(index=False))
    report.append("\n## Observations\n")
    report.append("- Les métriques sont normalisées par 100 pages pour éviter le biais longueur.\n")
    report.append("- Les prises de parole sont une approximation basée sur des motifs ('dit Hermione', etc.).\n")
    report.append("- Les termes choisis (mystérieux/dark/severe...) sont un proxy pour 'Rogue being Rogue'.\n")
    report.append("\n## Limites\n")
    report.append("- Corpus minimal (extraits), résultats indicatifs.\n")
    report.append("- Pas de co-références ni NER avancé.\n")
    (out / 'report.md').write_text("\n".join(report), encoding='utf-8')


def main():
    parser = argparse.ArgumentParser()
    parser.add_argument('--input', type=str, default='data')
    parser.add_argument('--out', type=str, default='outputs')
    args = parser.parse_args()

    input_dir = Path(args.input)
    out_dir = Path(args.out)
    out_dir.mkdir(parents=True, exist_ok=True)

    corpus = load_corpus(input_dir)
    df = compute_metrics(corpus)
    df.to_csv(out_dir / 'counts_table.csv', index=False)

    plot_trends(df, out_dir)
    plot_mentions(df, out_dir)
    plot_speech_share(df, out_dir)
    write_report(df, out_dir)

    print("✅ Analyse terminée. Résultats dans:", out_dir)


if __name__ == '__main__':
    main()
