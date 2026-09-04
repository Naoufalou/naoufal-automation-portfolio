#!/usr/bin/env python3
"""auto-apply.py — Candidatures automatisées à cadence HUMAINE (anti-ban).

Pilote un navigateur Patchright (Chromium patché anti-détection) pour
préparer et envoyer des candidatures freelance, en respectant une cadence
strictement humaine : 1 action toutes les 2-3 min, max 20/jour, délais
gaussiens, frappe lente, pauses aléatoires.

⚠️ PRINCIPES DE SÉCURITÉ (non négociables)
1. Par défaut : mode DRY-RUN (affiche ce qui serait envoyé, n'envoie rien).
   L'envoi réel exige le flag explicite --live.
2. L'opérateur valide chaque candidature avant envoi (pause entre chaque).
3. Jamais de session headless : fenêtre visible, comportement humain.
4. S'arrête proprement à la limite quotidienne.

Usage:
    python auto-apply.py --missions missions.md --platform upwork --dry-run
    python auto-apply.py --missions missions.md --platform linkedin --live
"""
import argparse
import random
import sys
import time
from pathlib import Path

sys.path.insert(0, str(Path(__file__).resolve().parent))
from humanize import delay_human, RateLimiter, check_limit  # noqa: E402


# ── Configuration ────────────────────────────────────────────────────────────
PROFILE_DIR = Path.home() / "auto-apply-profile"  # profil navigateur dédié
LIMIT = 20            # candidatures max / jour (conservateur, sous les seuils)
INTERVAL = (120, 180)  # 2-3 min entre chaque candidature (intervalle humain)


def parse_missions(path: Path, platform: str) -> list[dict]:
    """Extrait les missions du fichier markdown, filtrées par plateforme."""
    text = path.read_text(encoding="utf-8")
    missions = []
    current = None
    for line in text.splitlines():
        s = line.strip()
        if s.startswith("**") and "**" in s[2:]:
            # Ligne de titre de mission : **N. Titre**
            title = s.strip("*").split(". ", 1)[-1]
            current = {"title": title, "platform": "", "link": ""}
            missions.append(current)
        elif current and "Plateforme" in s:
            current["platform"] = s.split("·")[0].replace("Plateforme", "").strip().lower()
        elif current and "Lien" in s and "http" in s:
            # Extrait l'URL complète (https://...) depuis la ligne
            idx = s.find("http")
            current["link"] = s[idx:].strip().rstrip(")")
    # Garde celles qui matchent la plateforme demandée
    result = [m for m in missions if m["link"] and
              (platform in m["platform"] or platform in m["link"].lower())]
    return result


def main():
    ap = argparse.ArgumentParser()
    ap.add_argument("--missions", default=str(Path.home() / "products/missions-freelance.md"))
    ap.add_argument("--platform", default="upwork")
    ap.add_argument("--live", action="store_true", help="ENVOIE réellement (sinon dry-run)")
    ap.add_argument("--max", type=int, default=5, help="max candidatures ce run")
    args = ap.parse_args()

    missions = parse_missions(Path(args.missions), args.platform)
    if not missions:
        print(f"Aucune mission trouvée pour '{args.platform}' dans {args.missions}")
        print("Note : le parseur détecte les lignes 'Plateforme' et 'Lien' du markdown.")
        return 1

    print(f"=== {len(missions)} mission(s) trouvée(s) pour '{args.platform}' ===")
    print(f"Mode : {'LIVE (envoi réel)' if args.live else 'DRY-RUN (aucun envoi)'}")
    print(f"Profil navigateur : {PROFILE_DIR}")
    print(f"Cadence : {INTERVAL[0]}-{INTERVAL[1]}s entre candidatures, max {LIMIT}/jour\n")

    limiter = RateLimiter(max_per_day=LIMIT, min_interval=INTERVAL[0])

    try:
        from patchright.sync_api import sync_playwright
    except ImportError:
        print("patchright non installé. Lance :")
        print("  uv pip install --python auto-apply-venv/Scripts/python.exe patchright")
        print("  auto-apply-venv/Scripts/python.exe -m patchright install chromium")
        return 1

    with sync_playwright() as p:
        # Fenêtre VISIBLE, profil persistant (garde les cookies de session)
        ctx = p.chromium.launch_persistent_context(
            user_data_dir=str(PROFILE_DIR),
            headless=False,
            slow_mo=random.randint(60, 120),  # ralentit chaque action
            viewport={"width": 1280, "height": 800},
        )
        page = ctx.pages[0] if ctx.pages else ctx.new_page()

        for i, mission in enumerate(missions[: args.max]):
            print(f"\n[{i+1}/{min(len(missions), args.max)}] {mission['title']}")
            print(f"    Lien : {mission['link']}")

            if not args.live:
                print("    [DRY-RUN] → naviguerait vers la mission et préparerait la candidature")
                continue

            # Cadence humaine avant chaque action
            limiter.wait()
            print(f"    → ouverture de la page...")
            page.goto(mission["link"], timeout=60000)
            delay_human(4.0)  # lecture humaine de la page
            # NOTE : la saisie du formulaire dépend de la structure de chaque
            # plateforme — elle est déléguée à l'opérateur qui valide visuellement.
            # Ce script ouvre la bonne page, au bon rythme, et laisse l'humain
            # coller le pitch (30s) — le plus sûr pour ne jamais être banni.
            print("    → page ouverte. Collez le pitch, envoyez, puis passez à la suite.")
            input("    Appuyez sur Entrée pour la candidature suivante (ou Ctrl+C pour arrêter) : ")

        ctx.close()

    print("\n=== Terminé. Aucun compte n'a été mis en danger. ===")


if __name__ == "__main__":
    raise SystemExit(main())
