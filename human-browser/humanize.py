#!/usr/bin/env python3
"""humanize.py — Humanisation des interactions navigateur (anti-ban).

Bibliothèque stdlib pure qui ajoute un comportement "humain" à toute
automatisation navigateur : délais à distribution gaussienne, frappe
clavier avec hésitations, mouvement de souris courbe de Bézier, et
planificateur de cadence avec gigue (jitter).

> Objectif : ne PAS ressembler à un bot. Aucun outil ne garantit zéro ban —
> c'est la combinaison "vraie session + cadence humaine + volume faible"
> qui protège les comptes. Ce module automatise la partie cadence.

Usage (test sans navigateur) :
    python humanize.py --demo
"""
import math
import random
import time
from dataclasses import dataclass


# ── 1. Délais humains (gaussien, pas uniforme) ──────────────────────────────
def delay_human(mean: float, stddev: float = 0.0):
    """Dort `mean` secondes ± bruit gaussien. stddev=0 → ±30% auto."""
    std = stddev if stddev else mean * 0.3
    d = max(0.05, random.gauss(mean, std))
    time.sleep(d)
    return d


# ── 2. Frappe clavier humaine ────────────────────────────────────────────────
def type_human(text: str, wpm: int = 45):
    """Génère les délais de frappe d'un humain (sans émettre de touches).
    Retourne la liste des durées — à appliquer entre chaque keypress."""
    cps = wpm / 60 * 5  # caractères par seconde (5 car/mot)
    delays = []
    for ch in text:
        base = 1.0 / cps
        # + pause avant espace/punct, + hésitation aléatoire
        pause = random.gauss(base, base * 0.4)
        if ch in " .!?,":
            pause += random.uniform(0.05, 0.25)
        delays.append(max(0.02, pause))
    return delays


# ── 3. Mouvement de souris courbe de Bézier ─────────────────────────────────
def bezier_mouse(start, end, steps=40):
    """Points intermédiaires d'une courbe de Bézier avec un point de contrôle
    aléatoire (imite la main humaine qui ne va jamais en ligne droite)."""
    cx = (start[0] + end[0]) / 2 + random.uniform(-80, 80)
    cy = (start[1] + end[1]) / 2 + random.uniform(-80, 80)
    points = []
    for i in range(steps + 1):
        t = i / steps
        x = (1 - t) ** 2 * start[0] + 2 * (1 - t) * t * cx + t ** 2 * end[0]
        y = (1 - t) ** 2 * start[1] + 2 * (1 - t) * t * cy + t ** 2 * end[1]
        points.append((round(x), round(y)))
    return points


# ── 4. Planificateur de cadence (anti-ban par volume) ────────────────────────
@dataclass
class RateLimiter:
    """Impose une cadence humaine stricte : N actions max par fenêtre."""
    max_per_day: int = 20        # ex. LinkedIn : ~20 actions/jour
    min_interval: float = 90.0   # min 90s entre 2 actions
    _last_ts: float = 0.0
    _count: int = 0

    def wait(self) -> float:
        """Bloque jusqu'au prochain créneau autorisé. Retourne le délai."""
        elapsed = time.time() - self._last_ts
        wait = self.min_interval - elapsed
        if wait > 0:
            time.sleep(wait + random.uniform(0, 30))  # jitter humain
        if self._count >= self.max_per_day:
            raise RuntimeError(f"Limite quotidienne atteinte ({self.max_per_day})")
        self._last_ts = time.time()
        self._count += 1
        return wait


# ── 5. Détection d'usage (le vrai anti-ban = rester en dessous des seuils) ──
LIMITS = {
    "linkedin":  {"invites": 10,  "messages": 20,  "views": 80},
    "upwork":    {"proposals": 5,  "messages": 15},
    "malt":      {"proposals": 5,  "messages": 10},
    "reddit":    {"posts": 2,     "comments": 10},
    "fiverr":    {"gigs": 3,      "responses": 10},
}


def check_limit(platform: str, action: str, count: int) -> bool:
    """True si on reste sous le seuil anti-ban de la plateforme."""
    return count <= LIMITS.get(platform, {}).get(action, 5)


def demo():
    print("=== Démo humanisation (sans navigateur) ===")
    print("1. Délai gaussien (moyenne 3s, 5 échantillons) :")
    for _ in range(5):
        print(f"   {delay_human(3):.2f}s")
    print("\n2. Frappe humaine ('Bonjour Dr Dupont' à 45 wpm) :")
    d = type_human("Bonjour Dr Dupont")
    print(f"   {len(d)} frappes, total {sum(d):.1f}s, moy {sum(d)/len(d)*1000:.0f}ms/touche")
    print("\n3. Mouvement souris Bézier (0,0 → 500,300) :")
    pts = bezier_mouse((0, 0), (500, 300), steps=5)
    print(f"   {len(pts)} points : {pts[:3]} ... {pts[-1]}")
    print("\n4. Limites anti-ban par plateforme :")
    for p, acts in LIMITS.items():
        print(f"   {p:10s} → {acts}")


if __name__ == "__main__":
    demo()
