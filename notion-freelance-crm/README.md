# Notion CRM Client Freelance — Guide de recréation & de vente

Template Notion complet pour freelances et indépendants : clients, projets, factures et relances au même endroit.

---

## 1. Recréer le template dans Notion

### Option A — Duplication (recommandée)
1. Ouvrez la page Notion partagée (lien de votre store).
2. Bouton **Duplicate** en haut à droite → le template entier (bases + vues) est copié dans votre espace.
3. Renommez le workspace : `Mon CRM Freelance`.
4. C'est prêt — commencez par la vue `Dashboard`.

### Option B — Reconstruction manuelle
1. Créez 4 pages filles sous une page racine « CRM » : `Clients`, `Projets`, `Factures`, `Relances`.
2. Sur chaque page, tapez `/database` → **Table** → **New database**.
3. Reproduisez les propriétés, colonne par colonne, en suivant `template.md` :
   - Type de propriété (Select, Relation, Formula, Rollup…)
   - Options des Select (valeurs exactes, sinon les formules cassent)
   - Formules copiées-collées telles quelles.
4. Créez les relations entre bases dans l'ordre : Clients ↔ Projets, Clients ↔ Factures, Projets ↔ Factures, Factures ↔ Relances, Clients ↔ Relances.
5. Ajoutez les vues listées (filtres, tris, groupements).

### Option C — Import CSV (base Clients)
1. Dans Notion, page racine → `Import` → **CSV** → choisissez `clients-database.csv`.
2. Notion crée une base avec les 5 clients d'exemple. Les colonnes `Statut` et `Secteur` seront de type texte : convertissez-les en **Select** (clic sur l'en-tête → *Edit property type*).
3. Ajoutez ensuite les propriétés Relation/Rollup/Formula non présentes dans le CSV (voir `template.md`).

---

## 2. Comment le vendre

### Packaging
- Plateformes : **Gumroad**, **Lemon Squeezy**, **Payhip**, **Etsy** (section numérique).
- Format : lien vers une **page Notion publique** à dupliquer (jamais un .zip de captures).
- Livrez aussi le CSV + ce guide en bonus (dossier .zip « Ressources »).

### Prix & lancement
- Prix de lancement conseillé : **$19** (voir `sales-description.md`).
- Offre de lancement : −30 % la première semaine (≈ $13).
- Upsell naturel : pack « CRM + Modèle de Devis + Factures automatisées » à $29.

### Promotion
- Extrait gratuit : la **base Clients** en accès libre (lead magnet), le template complet en payant.
- Contenus : thread X/LinkedIn « 5 erreurs de facturation qui te coûtent de l'argent », carrousel Instagram montrant les 4 bases.
- SEO : utilisez les 3 tags de `sales-description.md` dans le titre et la description du produit.

### Mentions obligatoires
- Précisez : « Fichier digital — livraison instantanée, pas de remboursement après téléchargement ».
- Licence : usage personnel + un seul freelance (pas de revente ni de partage).

---

## 3. Fichiers du pack

| Fichier | Rôle |
|---|---|
| `template.md` | Spécification complète de la structure Notion |
| `clients-database.csv` | Données d'exemple importables |
| `sales-description.md` | Page de vente prête à copier |
| `README.md` | Ce guide |
