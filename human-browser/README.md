# Contrôler un navigateur comme un humain (sans se faire bannir)

> Le **vrai** anti-ban n'est pas un outil magique : c'est la combinaison
> **vraie session + cadence humaine + volume faible**. Voici les outils 2026
> pour la partie "stealth", et les règles de cadence qui protègent tes comptes.

---

## 1. Les outils stealth (benchmark 2026)

| Outil | Approche | Force | Install |
|-------|----------|-------|---------|
| **Patchright** | Fork Playwright patché (CDP leaks + TLS) | Le "drop-in" Playwright, passe Cloudflare/DataDome | `pip install patchright` |
| **nodriver** | Pilote Chrome en direct via CDP, **sans Playwright** (supprime les flags automation) | Gagne sur cibles live Cloudflare | `pip install nodriver` |
| **Camoufox** | Firefox patché (fingerprint complet, pas de `webdriver`) | Meilleur camouflage de fingerprint | `pip install camoufox` |
| **SeleniumBase UC** | Mode UC (undetected-chromedriver) | Meilleur sur CAPTCHA/Cloudflare en Python | `pip install seleniumbase` |
| **rebrowser-playwright** | Fork Playwright patché | Alternative Patchright | `pip install rebrowser-playwright` |

**Verdict 2026** (sources : benchmarks 651 verdicts, DataDome/Cloudflare) :
- **nodriver** gagne sur les cibles live Cloudflare (supprime les flags plutôt qu'ajouter des patches).
- **Patchright** est le meilleur compromis si tu veux rester sur l'API Playwright.
- **Camoufox** est le roi du fingerprint (Firefox, pas de drapeau webdriver).

> ⚠️ Aucun ne contourne **la réputation d'IP**. Si ton IP est marquée
> "datacenter" ou partagée, tu seras bloqué quel que soit l'outil. En local
> (ton IP résidentielle), tu es déjà en position de force.

---

## 2. Le module `humanize.py` (fourni ici)

Bibliothèque stdlib pure qui ajoute le comportement humain à toute
automatisation :

```python
from humanize import delay_human, type_human, bezier_mouse, RateLimiter

# Délai gaussien (±30% auto) au lieu de sleep fixe
delay_human(3.0)

# Frappe clavier avec hésitations (45 mots/min)
delays = type_human("Bonjour Dr Dupont")

# Souris en courbe de Bézier (pas en ligne droite)
points = bezier_mouse((100, 100), (500, 300))

# Cadence : max 20 messages/jour, 90s mini entre chaque
lim = RateLimiter(max_per_day=20, min_interval=90)
lim.wait()
```

**Testé :** `python humanize.py --demo` génère délais, frappe, souris, limites.

---

## 3. Les limites anti-ban par plateforme (à ne JAMAIS dépasser)

| Plateforme | Actions max / jour | Intervalle mini | Risque si dépassé |
|-----------|-------------------:|:---------------:|-------------------|
| **LinkedIn** | 10 invites, 20 messages, 80 vues | 90s | Ban définitif (compte = canal entier) |
| **Upwork** | 5 proposals | 2-3 min | Suspension proposals |
| **Malt** | 5 propositions, 10 messages | 2-3 min | Shadow-ban |
| **Reddit** | 2 posts, 10 commentaires | 2h entre posts | Ban de sub |
| **Fiverr** | 3 gigs, 10 réponses | 2-3 min | Suppression gigs |

**Règle d'or :** un compte banni vaut 10× plus cher que n'importe quelle vente.
Rester **sous** le seuil, jamais "à la limite".

---

## 4. La méthode anti-ban complète (ordre d'importance)

1. **Vraie session** → utilise le profil Chrome de l'opérateur (cookies, historique),
   PAS une session fraîche headless. C'est le signal #1.
2. **Cadence humaine** → 1 action toutes les 90s-3min, max 20/jour. Le module
   `RateLimiter` l'automatise.
3. **Volume faible** → 5 candidatures/jour, pas 50. Mieux vaut 5 bien
   personnalisées que 50 génériques (et ça convertit plus).
4. **Comportement** → délais gaussiens, frappe avec hésitation, souris Bézier,
   scroll aléatoire. `humanize.py` fournit tout ça.
5. **Stealth en dernier** → Patchright/nodriver/Camoufox seulement si le
   comportement ne suffit pas (et jamais headless pour les comptes réels).

---

## 5. Ce que ce repo ne fait PAS (et pourquoi)

- **Ne contourne pas les CAPTCHA** : c'est le signal qu'il faut s'arrêter.
- **Ne crée pas de faux comptes** : bannissable, et inutile pour de la vraie
  prospection B2B.
- **Ne postule pas en masse** : c'est exactement ce qui fait bannir. Les
  candidatures restent manuelles (30s chacune), l'outil prépare tout.

---

## Source

Benchmarks 2026 : `bytetunnels.com`, `scrapewise.ai`, `dataresearchtools.com`,
`ianlpaterson.com` (651 verdicts, 31 cibles anti-bot).
