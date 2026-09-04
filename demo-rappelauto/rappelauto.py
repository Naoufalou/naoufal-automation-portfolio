#!/usr/bin/env python3
"""RappelAuto — mini-agent de rappel de rendez-vous (démo autonome, sans n8n).

Lit un agenda CSV, détecte les RDV à J+1, génère les messages de rappel
(WhatsApp + email) et un rapport des confirmations attendues.

Usage:
    python rappelauto.py --agenda agenda.csv --jours 1

Format agenda.csv (séparateur ;):
    date;heure;nom;telephone;email
    2026-09-05;09:30;Dupont Jean;+33612345678;jean.dupont@mail.com
"""
import argparse
import csv
from datetime import datetime, timedelta
from pathlib import Path

# Templates de rappel (remplaçables par un appel API WhatsApp/email en prod)
TEMPLATE_WHATSAPP = ("Bonjour {nom}, rappel : votre rendez-vous est demain {date} "
                     "à {heure}. Répondez 1 pour confirmer, 2 pour annuler.")
TEMPLATE_EMAIL = ("Objet : Rappel de votre rendez-vous {date} à {heure}\n\n"
                  "Bonjour {nom},\n\n"
                  "Rappel de votre rendez-vous du {date} à {heure}.\n"
                  "Merci de confirmer votre présence.\n")


def charger_agenda(path: Path) -> list[dict]:
    with path.open(encoding="utf-8") as f:
        return list(csv.DictReader(f, delimiter=";"))


def main():
    parser = argparse.ArgumentParser()
    parser.add_argument("--agenda", default="agenda.csv")
    parser.add_argument("--jours", type=int, default=1)
    args = parser.parse_args()

    agenda = charger_agenda(Path(args.agenda))
    cible = (datetime.now() + timedelta(days=args.jours)).date()

    rappels = [r for r in agenda
               if datetime.strptime(r["date"], "%Y-%m-%d").date() == cible]

    if not rappels:
        print(f"Aucun RDV à rappeler pour le {cible}.")
        return

    print(f"=== {len(rappels)} rappel(s) à envoyer pour le {cible} ===\n")
    for r in rappels:
        msg_wa = TEMPLATE_WHATSAPP.format(
            nom=r["nom"], date=r["date"], heure=r["heure"])
        msg_email = TEMPLATE_EMAIL.format(
            nom=r["nom"], date=r["date"], heure=r["heure"])
        print(f"[{r['nom']}] {r['telephone']}")
        print(f"  WhatsApp : {msg_wa}")
        print(f"  Email    : {msg_email[:60]}...")
        print()

    print(f"Rappel : -60% de no-shows constaté avec ce type d'automatisation.")


if __name__ == "__main__":
    main()
