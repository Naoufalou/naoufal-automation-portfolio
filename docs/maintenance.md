# Maintenance et publication

## Ajouter ou actualiser une réalisation

Modifier `content/projects.json` : identifiant stable, slug unique, nom, description factuelle, catégorie, technologies, état, démo publique et source publique facultatives. Ne jamais ajouter de chemin local, de lien d’administration, de clé ou de code privé.

`npm run sync:catalog` utilise la session GitHub CLI pour exporter uniquement les métadonnées des dépôts publics dans `.catalog-review/`, ignoré par Git. Cette étape est une aide à la revue et ne modifie pas le catalogue publié. La synchronisation du site est assurée par Git et Vercel, sans copie automatique des applications privées.

Exécuter `npm run check:content`, `npm run build`, `npm run typecheck`. Le contrôle réseau optionnel `npm run check:links` teste les liens externes, susceptibles de changer indépendamment du site.

## Vercel

Projet dédié : `naoufal-automation-portfolio`. Root Directory : `apps/portfolio`. Node.js : 22. Le monorepo npm inclut `content/projects.json` hors de la racine de l’application : conserver l’inclusion des fichiers extérieurs à cette racine. Aucune variable secrète n’est nécessaire.

Les pull requests peuvent recevoir une prévisualisation ; `master` est la branche de production. Pour une publication CLI depuis la racine du dépôt : `vercel` puis `vercel --prod`. Vérifier le domaine réellement attribué avant de modifier une URL canonique.

## Périmètre

L’inventaire privé initial couvre davantage de fichiers et de variantes que le catalogue éditorial de 43 entrées. Il ne doit pas être publié. Les groupes regroupent les variantes connues pour éviter de les présenter comme autant de produits indépendants.

Les sites externes accessibles ne sont pas des parcours métier intégralement testés. Les démonstrateurs n8n exigent des identifiants et paramètres propres à leur environnement. Les illustrations ne représentent ni métriques en temps réel ni résultats mesurés. Le formulaire ouvre un client email et n’envoie rien automatiquement.
