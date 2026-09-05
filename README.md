# Naoufal Ou — Développeur IA & entrepreneur

Portfolio d’applications, d’agents IA et d’automatisations, avec un catalogue de 43 réalisations et expérimentations.

**[Découvrir le portfolio](https://naoufal-automation-portfolio.vercel.app)** · [Contact](mailto:naoufal.ou7@gmail.com) · [LinkedIn](https://www.linkedin.com/in/naoufal-ou-14a071150)

## Organisation

- `apps/portfolio` : site Next.js App Router, React, TypeScript et Tailwind CSS.
- `content/projects.json` : catalogue éditorial public, technologies, état et liens.
- `scripts` : validation du contenu, contrôle des liens et export de métadonnées publiques pour revue.
- `docs` : maintenance, publication et limites de vérification.
- Les dossiers de démonstration historiques ci-dessous conservent leur emplacement.

Les applications privées restent dans leurs dépôts respectifs. Ce dépôt centralise leurs fiches publiques et les démonstrateurs déjà publics, sans importer de mémoire personnelle, de données clients ou de configuration privée.

## Démonstrateurs publics

| Réalisation | Contenu |
|---|---|
| [Rappels de rendez-vous](n8n-dental-reminder/) | Workflow n8n de 10 nœuds, intégrations à configurer |
| [Relance Shopify](n8n-shopify-cart-recovery/) | Workflow n8n de 8 nœuds |
| [CRM freelance](notion-freelance-crm/) | Spécification Notion en Markdown |
| [Prompts recrutement](prompt-pack-recruiter/) | Pack éditorial de prompts |
| [Agent local](demo-agent-local/) | Démonstrateur Python et Ollama |
| [RappelAuto](demo-rappelauto/) | Génération de rappels depuis un agenda CSV |
| [Human Browser](human-browser/) | Scripts Python et Patchright |

## Développement

Node.js 22 et npm sont requis.

```sh
npm ci
npm run dev
npm run check:content
npm run build
npm run typecheck
```

Le site démarre sur http://127.0.0.1:3000. Les polices sont embarquées localement. Le formulaire de contact prépare un email dans la messagerie du visiteur ; aucun serveur de collecte n’est installé.

## Publication

Vercel : projet `naoufal-automation-portfolio`, racine `apps/portfolio`, framework Next.js, branche de production `master`. Voir [le guide](docs/maintenance.md).

Les visuels du site sont des compositions illustratives, pas des captures d’interfaces en fonctionnement. Les états des projets sont explicités sur chaque fiche. Aucun résultat commercial chiffré n’est revendiqué sans mesure.
