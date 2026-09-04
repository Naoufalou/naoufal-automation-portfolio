# Template Notion — CRM Client Freelance

Structure complète du template. Recréez chaque élément dans Notion dans l'ordre ci-dessous, ou dupliquez la version partagée (voir `README.md`).

---

## 1. Architecture générale

```
🏠 DASHBOARD (page racine)
│
├── 📋 Base « Clients »      → qui me paie
├── 🗂️ Base « Projets »      → sur quoi je travaille
├── 🧾 Base « Factures »     → ce que je dois encaisser
└── 🔔 Base « Relances »     → ce que je dois relancer
```

Chaque base est une page fille de la racine. Le Dashboard embarque des **vues liées** des 4 bases pour un pilotage en un seul écran.

---

## 2. Page : 🏠 Dashboard

- **Icône** : 🏠 · **Couverture** : dégradé de couleur libre.
- Contenu :
  1. Titre `# Dashboard` + paragraphe d'intro (1 phrase : « Votre activité freelance en un coup d'œil »).
  2. **4 vues liées** côte à côte (2 colonnes) :
     - *Clients — Actifs* (table, filtre Statut = Actif)
     - *Projets — En cours* (table, filtre Statut = En cours)
     - *Factures — À encaisser* (table, filtre Payée = non cochée)
     - *Relances — À envoyer* (table, filtre Statut = À envoyer)
  3. Bloc **Callout** en bas : rappel du process de relance (J+0, J+7, J+14).

---

## 3. Base de données : 📋 Clients

| Propriété | Type | Options / Règle |
|---|---|---|
| Nom | Title | — |
| Statut | Select | Prospect · Actif · Pause · Clos |
| Email | Email | — |
| Téléphone | Phone | — |
| Site web | URL | — |
| Secteur | Select | Tech · Design · Marketing · Conseil · E-commerce · Autre |
| Source | Select | Bouche-à-oreille · LinkedIn · Réseau · Site web · Autre |
| Taux horaire | Number | format € |
| Date d'entrée | Date | — |
| Projets liés | Relation | → base **Projets** (two-way) |
| Factures liées | Relation | → base **Factures** (two-way) |
| CA encaissé | Rollup | relation `Factures liées` → `Montant TTC` → **Sum** |
| Notes | Text | — |

**Vues :**
- `Tous les clients` — Table · tri Nom A→Z
- `Actifs` — Table · filtre Statut = Actif
- `Prospects` — Table · filtre Statut = Prospect
- `Par secteur` — Board · groupé par Secteur

---

## 4. Base de données : 🗂️ Projets

| Propriété | Type | Options / Règle |
|---|---|---|
| Nom | Title | — |
| Client | Relation | → base **Clients** |
| Statut | Select | En attente · En cours · En pause · Terminé · Livré |
| Type de mission | Select | Site web · Identité visuelle · Conseil · Dev · Rédaction · Autre |
| Date de début | Date | — |
| Deadline | Date | — |
| Budget | Number | format € (montant convenu) |
| Avancement | Number | 0–100, affiché en barre de progression |
| Factures liées | Relation | → base **Factures** |
| Facturé total | Rollup | relation `Factures liées` → `Montant TTC` → **Sum** |
| Notes | Text | — |

**Vues :**
- `Tous les projets` — Table
- `En cours` — Table · filtre Statut = En cours
- `Par statut` — Board · groupé par Statut
- `Timeline deadlines` — Timeline · période = Deadline

---

## 5. Base de données : 🧾 Factures

| Propriété | Type | Options / Règle |
|---|---|---|
| Numéro | Title | format `FAC-2024-001` |
| Client | Relation | → base **Clients** |
| Projet | Relation | → base **Projets** |
| Montant HT | Number | format € |
| TVA | Select | 0% · 5.5% · 10% · 20% |
| Montant TTC | Formula | voir formule ci-dessous |
| Émise le | Date | — |
| Échéance | Date | — |
| Payée | Checkbox | — |
| Payée le | Date | — |
| Mode de paiement | Select | Virement · Carte · PayPal · Espèces · Autre |
| Statut | Formula | voir formule ci-dessous |
| Relance due | Formula | voir formule ci-dessous |
| Relances liées | Relation | → base **Relances** |

**Formules (coller telles quelles dans Notion) :**

`Montant TTC` :
```
lets(
  rate, ifs(prop("TVA") == "0%", 0, prop("TVA") == "5.5%", 0.055, prop("TVA") == "10%", 0.1, prop("TVA") == "20%", 0.2, 0),
  round(prop("Montant HT") * (1 + rate) * 100) / 100
)
```

`Statut` :
```
if(prop("Payée"), "✅ Payée",
  if(and(prop("Échéance") < today(), prop("Émise le") != empty), "🔴 En retard",
    if(prop("Émise le") != empty, "📤 Envoyée", "📝 À émettre")))
```

`Relance due` :
```
and(not prop("Payée"), prop("Échéance") < today())
```

**Vues :**
- `Toutes` — Table
- `À encaisser` — Table · filtre Payée = non cochée
- `En retard` — Table · filtre Statut = 🔴 En retard
- `Payées` — Table · filtre Payée = cochée
- `Par client` — Board · groupé par Client
- `Calendrier échéances` — Calendar · date = Échéance

---

## 6. Base de données : 🔔 Relances

| Propriété | Type | Options / Règle |
|---|---|---|
| Titre | Title | ex. `Relance FAC-2024-003` |
| Facture | Relation | → base **Factures** |
| Client | Relation | → base **Clients** |
| Date d'envoi | Date | — |
| Canal | Select | Email · Message · Appel |
| Réponse reçue | Checkbox | — |
| Statut | Select | À envoyer · Envoyée · Répondue · Clôturée |
| Prochaine relance | Date | — |
| Notes | Text | — |

**Vues :**
- `Toutes` — Table
- `À envoyer` — Table · filtre Statut = À envoyer
- `Sans réponse` — Table · filtre Réponse reçue = non cochée
- `Par canal` — Board · groupé par Canal

---

## 7. Conseil d'usage (méthode de travail)

1. **Nouveau lead** → créer une ligne dans *Clients* (Statut = Prospect).
2. **Mission signée** → Statut = Actif, créer le *Projet* relié.
3. **Livraison** → créer la *Facture* reliée au Client et au Projet, fixer l'Échéance.
4. **J+7 sans paiement** → créer une *Relance* reliée à la facture.
5. **Payée** → cocher `Payée` + `Payée le` : le Statut et le CA se mettent à jour tout seuls.
