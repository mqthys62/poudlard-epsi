#!/usr/bin/env python3
import argparse
from pathlib import Path
from gtts import gTTS
import subprocess

SPELLS = [
    "Lumos", "Nox", "Alohomora", "Expelliarmus", "Protego",
    "Accio", "Wingardium Leviosa", "Stupefy"
]


def tts_to_mp3(text: str, out_mp3: Path, lang: str = "en"):
    tts = gTTS(text=text, lang=lang)
    tts.save(str(out_mp3))


def mp3_to_wav(mp3_path: Path, wav_path: Path):
    cmd = ["ffmpeg", "-y", "-i", str(mp3_path), str(wav_path)]
    subprocess.run(cmd, check=True, stdout=subprocess.DEVNULL, stderr=subprocess.DEVNULL)


def main():
    ap = argparse.ArgumentParser()
    ap.add_argument("--out", type=str, default="data/samples")
    ap.add_argument("--lang", type=str, default="en")
    ap.add_argument("--variants", type=int, default=2, help="nb d'exemplaires par sort")
    args = ap.parse_args()

    out_dir = Path(args.out)
    out_dir.mkdir(parents=True, exist_ok=True)

    for spell in SPELLS:
        for i in range(1, args.variants + 1):
            base = f"{spell.lower().replace(' ', '_')}_{i}"
            mp3 = out_dir / f"{base}.mp3"
            wav = out_dir / f"{base}.wav"
            tts_to_mp3(spell, mp3, lang=args.lang)
            mp3_to_wav(mp3, wav)
            print(f"Generated {wav}")

    print("✅ TTS dataset generated in", out_dir)


if __name__ == "__main__":
    main()
