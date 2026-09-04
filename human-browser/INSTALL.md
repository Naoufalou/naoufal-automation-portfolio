# Auto-apply — Candidatures automatisées à cadence humaine (anti-ban)

Pilote un navigateur **Patchright** (Chromium patché anti-détection) pour
préparer des candidatures freelance, avec cadence strictement humaine.

## Installation (une fois)

```bash
# 1. Créer l'environnement + installer patchright
cd ~
uv venv auto-apply-venv
uv pip install --python auto-apply-venv/Scripts/python.exe patchright

# 2. Télécharger le Chromium patché (~150 Mo)
auto-apply-venv/Scripts/python.exe -m patchright install chromium

# 3. Tester que ça marche (navigateur visible + non détecté)
auto-apply-venv/Scripts/python.exe test-patchright.py
```

## Utilisation

```bash
# Dry-run (affiche ce qui serait fait, n'envoie RIEN) — par défaut
auto-apply-venv/Scripts/python.exe auto-apply.py \
  --missions ~/products/missions-freelance.md --platform upwork

# Mode réel (ouvre chaque page au bon rythme, TU colles le pitch)
auto-apply-venv/Scripts/python.exe auto-apply.py \
  --missions ~/products/missions-freelance.md --platform linkedin --live
```

## Pourquoi "TU colles le pitch" et pas une saisie 100% auto ?

- **Anti-ban** : les formulaires de candidature ont des structures qui changent.
  Saisir automatisé = pattern détectable. L'humain qui colle son pitch en 30s
  est indétectable.
- **Sécurité** : tu valides chaque envoi. Zéro candidature non relue.
- **Efficacité** : le script ouvre la bonne page, au bon rythme (2-3 min),
  avec le bon profil (cookies conservés). Tu fais juste la touche finale.

## Les garde-fous (non négociables)

1. **DRY-RUN par défaut** — l'envoi exige `--live` explicite.
2. **Fenêtre visible** (jamais headless), `slow_mo` 60-120ms sur chaque action.
3. **Cadence** : 2-3 min entre actions, max 20/jour (module `RateLimiter`).
4. **Profil persistant** : les cookies de session sont conservés entre runs.
5. S'arrête proprement à la limite quotidienne.

## Limites honnêtes

- Le navigateur Patchright est **Chromium patché** (son propre profil), pas ton
  Chrome quotidien. Il faut **te connecter une fois** (LinkedIn/Upwork) dans la
  fenêtre qu'il ouvre — ensuite les cookies restent.
- Aucun outil ne contourne la **réputation d'IP** ni les **CAPTCHA**. Si un
  CAPTCHA apparaît : arrête, c'est le signal de ralentir.
