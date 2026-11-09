// Récits des projets principaux : accueil et pages /projets/[slug].
// Chaque fait provient du dépôt ou du site du projet. Une capture sans `src`
// est un emplacement en attente d'une vraie capture d'application, jamais une maquette.

export type Formation = "core" | "constellation" | "city" | "car" | "bubbles" | "funnel" | "scatter";

export type StoryMedia = {
  label: string;
  /** Écran attendu, affiché tant que la capture n'a pas été fournie. */
  expected: string;
  src?: string;
  /** Vidéo de présentation (MP4 dans /public/project-videos), jouée en boucle avec `src` comme affiche. */
  video?: string;
  /** Origine de la capture, affichée en légende. */
  origin?: string;
  orientation: "portrait" | "landscape";
};

export type StoryLink = { label: string; url: string; note: string };

export type Story = {
  slug: string;
  number: string;
  name: string;
  kicker: string;
  tagline: string;
  accent: string;
  formation: Formation;
  role: string;
  destination: StoryLink | null;
  secondary: StoryLink | null;
  problem: { title: string; body: string };
  research: { title: string; body: string; points: string[] };
  decisions: { title: string; detail: string }[];
  steps: { title: string; detail: string }[];
  proofs: string[];
  limits: string[];
  result: string;
  skills: SkillId[];
  stack: string[];
  media: StoryMedia[];
};

export const skills = [
  { id: "systems", label: "Architecture de systèmes IA" },
  { id: "agents", label: "Agents & orchestration" },
  { id: "llm", label: "LLM appliqués" },
  { id: "graph", label: "Graphes & visualisation" },
  { id: "realtime3d", label: "3D temps réel" },
  { id: "typescript", label: "Full-stack TypeScript" },
  { id: "python", label: "Python · FastAPI" },
  { id: "mobile", label: "Mobile React Native" },
  { id: "desktop", label: "Desktop Electron" },
  { id: "automation", label: "Automatisation navigateur & messagerie" },
  { id: "reliability", label: "Fiabilité, tests & preuves" },
  { id: "product", label: "Produit & UX" },
] as const;

export type SkillId = (typeof skills)[number]["id"];

export const stories: Story[] = [
  {
    slug: "qwerty-myriaz",
    number: "01",
    name: "QWERTY × Myriaz",
    kicker: "Système de connaissance · graphe navigable",
    tagline: "Un système qui se souvient, agit et apprend.",
    accent: "#c6f58a",
    formation: "constellation",
    role: "Conception, architecture, gateway, interface du graphe",
    destination: {
      label: "Voir QWERTY en ligne",
      url: "https://qwerty-starmap-motion-ultra.vercel.app/",
      note: "Site de présentation · carte stellaire interactive",
    },
    secondary: null,
    problem: {
      title: "La mémoire se disperse plus vite que le travail n’avance.",
      body: "Projets, notes, code et sessions d’agents s’accumulent dans des outils séparés. Chaque nouvel agent repart de zéro, et personne ne voit les relations entre ce qui a été fait, appris et livré.",
    },
    research: {
      title: "Lire la mémoire comme une carte.",
      body: "Avant d’écrire une ligne, j’ai étudié le langage visuel du Star Map de Hermes et les briques existantes : mémoire sémantique, graphe de code, traces d’exécution.",
      points: [
        "Hindsight pour la mémoire, Graphify pour le graphe de code, OpenTelemetry pour les traces.",
        "Un cœur, des anneaux temporels, des orbes projet : le temps et les relations deviennent lisibles.",
        "Un protocole commun REST, WebSocket et MCP pour que Claude Code, Codex et Hermes partagent le même contexte.",
      ],
    },
    decisions: [
      {
        title: "Un control plane local",
        detail: "Myriaz est une gateway FastAPI locale au-dessus de services indépendants, avec un registre SQLite et sans Docker.",
      },
      {
        title: "Aucune donnée inventée",
        detail: "Chaque source répond avec un statut explicite : ok, vide, indisponible ou désactivée. Une valeur absente n’est pas émise.",
      },
      {
        title: "Le mouvement raconte un fait",
        detail: "Une impulsion du graphe correspond à une trace réelle. Un événement qui n’a pas eu lieu n’anime rien.",
      },
      {
        title: "Divulgation progressive",
        detail: "QWERTY ouvre un projet comme une orbe : missions, artefacts et apprentissages n’apparaissent que s’ils existent.",
      },
    ],
    steps: [
      { title: "Cadrage & protocole", detail: "Contrats REST, WebSocket et MCP ; budgets de requête plafonnés côté serveur." },
      { title: "Gateway & télémétrie", detail: "FastAPI, registre SQLite, spans OpenTelemetry convertis en événements temps réel." },
      { title: "Serveur MCP", detail: "Outils context, code_query, health et projects exposés aux agents de code." },
      { title: "Graphe vivant", detail: "Star Map sur données réelles : environ 1 700 nœuds, amas calculés par similarité, type, secteur et technologie." },
      { title: "Récit QWERTY", detail: "Site produit publié : carte stellaire, focus projet, timeline d’événements." },
    ],
    proofs: [
      "Interface : 745 tests Vitest verts et build vert (état documenté du 3 octobre 2026).",
      "Gateway couverte par une suite pytest dédiée.",
      "Site QWERTY en ligne.",
    ],
    limits: [
      "Dépôt privé : le graphe tourne sur des données locales et n’est pas exposé publiquement.",
      "Le site QWERTY présente le concept ; il n’est pas branché aux données personnelles.",
    ],
    result: "Une mémoire de travail partagée entre agents, interrogeable et visible, où chaque élément garde sa provenance.",
    skills: ["systems", "agents", "graph", "python", "typescript", "reliability", "product"],
    stack: ["Python 3.12", "FastAPI", "SQLite", "OpenTelemetry", "MCP", "React", "TypeScript", "WebSocket", "Vitest"],
    media: [
      {
        label: "Présentation",
        expected: "Présentation",
        src: "/project-visuals/qwerty-starmap-hero.png",
        video: "/project-videos/qwerty-myriaz.mp4",
        origin: "Vidéo de présentation · Hyperframes · captures de QWERTY et de Myriaz",
        orientation: "landscape",
      },
      {
        label: "Cockpit : la constellation des projets",
        expected: "Cockpit : la constellation des projets",
        src: "/project-visuals/myriaz-cockpit-projets.webp",
        origin: "Capture de Myriaz · passerelle simulée, données de démonstration",
        orientation: "landscape",
      },
      {
        label: "Un projet ouvert dans le graphe",
        expected: "Un projet ouvert dans le graphe",
        src: "/project-visuals/myriaz-graphe-detail.webp",
        origin: "Capture de Myriaz · 64 éléments d’un projet de démonstration",
        orientation: "landscape",
      },
      {
        label: "Vue classique et provenance",
        expected: "Vue classique et provenance",
        src: "/project-visuals/myriaz-graphe-classique.webp",
        origin: "Capture de Myriaz · vue graphe classique, détail d’un nœud avec sa provenance",
        orientation: "landscape",
      },
      {
        label: "Mémoire : recherche avec sources",
        expected: "Mémoire : recherche avec sources",
        src: "/project-visuals/myriaz-memoire.webp",
        origin: "Capture de Myriaz · résultats de mémoire avec score et source",
        orientation: "landscape",
      },
      {
        label: "Chat de rappel sourcé",
        expected: "Chat de rappel sourcé",
        src: "/project-visuals/myriaz-mission.webp",
        origin: "Capture de Myriaz · souvenir rappelé avec sa provenance, modes FREE / HYBRID / TURBO",
        orientation: "landscape",
      },
      {
        label: "Site QWERTY",
        expected: "Site QWERTY",
        src: "/project-visuals/qwerty-starmap-graph.png",
        origin: "Capture du site QWERTY · orbe projet et facettes",
        orientation: "landscape",
      },
    ],
  },
  {
    slug: "iapas-game",
    number: "02",
    name: "IAPAS-Game",
    kicker: "Agents IA · monde 3D · orchestration",
    tagline: "Vos projets deviennent un monde. Vos agents IA y travaillent.",
    accent: "#7de8ff",
    formation: "city",
    role: "Produit, backend d’orchestration, scène 3D",
    destination: {
      label: "Voir la landing IAPAS",
      url: "https://iapas-portfolio.vercel.app/",
      note: "Étude de cas · captures du client 3D, démo vidéo",
    },
    secondary: null,
    problem: {
      title: "Les agents IA travaillent dans une conversation qu’on perd de vue.",
      body: "On ne sait pas ce qui est fini, bloqué ou en attente. Faute de garde-fous clairs, on hésite à leur donner de l’autonomie, et les livrables finissent éparpillés.",
    },
    research: {
      title: "Rendre l’état d’un orchestrateur lisible d’un regard.",
      body: "Plutôt qu’une fenêtre de chat, une métaphore spatiale : chaque projet devient un lieu, chaque agent un personnage, chaque blocage une bulle visible.",
      points: [
        "Un bâtiment par projet réellement reçu : sans données, la carte reste vide.",
        "Contrainte matérielle : un GPU local et une VRAM limitée, donc un seul modèle chargé à la fois.",
        "L’humain garde la main : toute action hors du dossier du projet demande une validation.",
      ],
    },
    decisions: [
      {
        title: "Micro-tâches atomiques",
        detail: "Chaque mission devient une chaîne de tâches SQLite (WAL) avec lease, idempotence, dépendances et retry plafonné.",
      },
      {
        title: "Modèle figé par tâche",
        detail: "Provider, modèle et digest sont verrouillés avant l’appel à Hermes. Un changement global n’altère pas un run en cours.",
      },
      {
        title: "VRAM maîtrisée",
        detail: "Un seul modèle Ollama chargé, déchargé après chaque tâche, sous un lease global d’inférence.",
      },
      {
        title: "Une scène branchée sur l’état réel",
        detail: "React Three Fiber reçoit les événements par SSE : statuts, agents actifs, validations et livrables.",
      },
    ],
    steps: [
      { title: "Vertical slice", detail: "Hermes Commander, graphe LangGraph (statut, mode, mission) et registre SQLite." },
      { title: "Inference gateway", detail: "Routage par rôle, inventaire Ollama sans téléchargement, budget cloud plafonné." },
      { title: "Cockpit 3D", detail: "Caméra orbitale, agents cliquables, HUD alimenté par SQLite et SSE." },
      { title: "Ville & personnages", detail: "Quartier nocturne, un bâtiment par projet, import de personnages GLB stockés localement." },
      { title: "Produit IAPAS", detail: "Village et planètes-projets, validations Approuver/Refuser, clé API de l’utilisateur." },
    ],
    proofs: [
      "26 tests automatisés sur 26 réussis, ESLint propre, build de production réussi.",
      "Playtest Chromium : WebGL actif, zéro erreur console, cadrages 1440×900 et 390×844.",
      "Benchmark réel du codeur local : 2 060 MiB de VRAM avec un contexte de 4 096 tokens.",
      "Chiffres relevés dans l’application réelle (édition personnelle) : 19 projets, 20 agents, 490 sessions Hermes indexées, 64 tâches suivies, 43 fournisseurs LLM, zéro donnée fictive.",
      "Build de distribution qui refuse les fuites : Windows x64 et macOS arm64, échec si une base, un .env, une clé ou une donnée personnelle est détecté.",
    ],
    limits: [
      "Le flux complet avec génération réelle et progression des bâtiments reste à qualifier.",
      "Transcription vocale non opérationnelle tant qu’aucun moteur local n’a été audité.",
    ],
    result: "Un poste de pilotage où l’on voit d’un coup d’œil où les agents avancent, où ça bloque et où l’on attend un feu vert.",
    skills: ["agents", "systems", "llm", "realtime3d", "typescript", "reliability", "product"],
    stack: ["Godot 4.7", "GDScript", "Node 24", "LangGraph", "SQLite WAL", "Hermes Agent (ACP)", "Ollama", "React Three Fiber", "SSE"],
    media: [
      {
        label: "Démo vidéo",
        expected: "Démo vidéo",
        src: "/project-visuals/iapas-univers-planetes.webp",
        video: "/project-videos/iapas-game.mp4",
        origin: "Enregistrement réel de l’application · univers, planètes, village (landing IAPAS)",
        orientation: "landscape",
      },
      {
        label: "Vue planètes",
        expected: "Vue planètes",
        src: "/project-visuals/iapas-univers-planetes.webp",
        origin: "Capture du client IAPAS · l’univers : quatre planètes-projets, 19 projets, 20 agents",
        orientation: "landscape",
      },
      {
        label: "Planète Outbound Sales",
        expected: "Planète Outbound Sales",
        src: "/project-visuals/iapas-planete-outbound.webp",
        origin: "Capture du client IAPAS · vue planète, pistes à confirmer ou à écarter par l’humain",
        orientation: "landscape",
      },
      {
        label: "Planète Build / Dev",
        expected: "Planète Build / Dev",
        src: "/project-visuals/iapas-planete-build.webp",
        origin: "Capture du client IAPAS · vue planète, un bâtiment par projet confirmé",
        orientation: "landscape",
      },
      {
        label: "Village nocturne",
        expected: "Village nocturne",
        src: "/project-visuals/iapas-village-nuit.webp",
        origin: "Capture du client IAPAS · une borne d’arcade par projet",
        orientation: "landscape",
      },
      {
        label: "Missions",
        expected: "Missions",
        src: "/project-visuals/iapas-missions.webp",
        origin: "Capture du client IAPAS · statuts réels des missions, validations Approuver / Refuser",
        orientation: "landscape",
      },
    ],
  },
  {
    slug: "bouchon",
    number: "03",
    name: "Bouchon · For4",
    kicker: "Autopartage mensuel · application mobile",
    tagline: "Une voiture. À plusieurs. Pour de vrai.",
    accent: "#ffb86b",
    formation: "car",
    role: "Conception produit, règles métier, application Expo, landing",
    destination: {
      label: "Voir la landing For4",
      url: "https://bouchon-steel.vercel.app/",
      note: "Présentation du produit · captures du simulateur iOS",
    },
    secondary: {
      label: "Ouvrir la démo web",
      url: "https://bouchon-demo.vercel.app/",
      note: "Export web de l’application · données simulées",
    },
    problem: {
      title: "Partager une voiture à plusieurs, c’est surtout partager des règles.",
      body: "Un groupe loue ensemble une même voiture au mois : qui l’utilise, quand, à quel loyer, avec quelles règles et quels trajets en commun ? Sans outil, tout passe par des messages, et le propriétaire du véhicule n’a aucune vue d’ensemble.",
    },
    research: {
      title: "Deux rôles, un même planning.",
      body: "J’ai modélisé les deux personas du service, le locataire et le propriétaire, autour d’un planning commun, puis audité une base open source avant d’en réutiliser des éléments.",
      points: [
        "Locataires : rejoindre un groupe, choisir l’accord (loyer, durée, répartition, règles d’usage), coordonner les créneaux.",
        "Usages partagés : proposer un trajet du quotidien ou regrouper des courses en un seul déplacement.",
        "Propriétaire : publier le véhicule et le loyer demandé, étudier les demandes, suivre le calendrier commun.",
      ],
    },
    decisions: [
      {
        title: "Les règles dans le domaine",
        detail: "Réservation, disponibilité et adhésion vivent dans des modules testés, séparés des écrans.",
      },
      {
        title: "Aucune promesse non vérifiée",
        detail: "Pas de tarif universel : les conditions sont précisées par offre, et le loyer affiché est un revenu brut convenu, avant frais, assurance et fiscalité.",
      },
      {
        title: "Une carte honnête",
        detail: "La position est dessinée et étiquetée « carte simulée » : aucun GPS ni fond de carte présenté comme réel.",
      },
      {
        title: "Une landing qui montre le vrai produit",
        detail: "Les captures de la landing viennent du simulateur iOS, pas de maquettes retouchées.",
      },
    ],
    steps: [
      { title: "Domaine", detail: "Règles de réservation, demandes d’adhésion et affichage des dates." },
      { title: "Écrans", detail: "Expo Router : accueil, groupe, planning, trajets et tâches, espace propriétaire." },
      { title: "État", detail: "Store Zustand persistant avec AsyncStorage." },
      { title: "Web et landing", detail: "Export web de production et landing publiés sur Vercel." },
      { title: "Appareils", detail: "Validation iOS/Android sur simulateur ou appareil : prochaine étape." },
    ],
    proofs: [
      "84 tests de logique métier et de store (Jest).",
      "Typecheck, export web et expo-doctor (21/21) exécutés avec succès.",
      "Démo web et landing For4 en ligne.",
    ],
    limits: [
      "Véhicule, loyer et position sont des exemples simulés ; aucun paiement réel.",
      "L’exécution native iOS/Android n’est pas encore confirmée ; les captures viennent du simulateur iOS.",
      "For4 facilite l’organisation : le groupe doit convenir lui-même des conditions réelles de location et d’usage.",
    ],
    result: "Un parcours d’autopartage complet et démontrable, du locataire au propriétaire, dont chaque règle est testée avant d’être affichée.",
    skills: ["mobile", "typescript", "product", "reliability"],
    stack: ["React Native", "Expo SDK 57", "TypeScript", "expo-router", "Zustand", "AsyncStorage", "Jest"],
    media: [
      {
        label: "Présentation",
        expected: "Présentation",
        src: "/project-visuals/for4-accueil.webp",
        video: "/project-videos/bouchon.mp4",
        origin: "Vidéo de présentation · Hyperframes · captures de la landing For4",
        orientation: "landscape",
      },
      {
        label: "La landing For4",
        expected: "La landing For4",
        src: "/project-visuals/for4-accueil.webp",
        origin: "Capture de la landing For4 · autopartage mensuel en Île-de-France",
        orientation: "landscape",
      },
      {
        label: "Un véhicule pour votre groupe",
        expected: "Un véhicule pour votre groupe",
        src: "/project-visuals/for4-principe.webp",
        origin: "Capture de la landing · rejoindre un groupe, choisir l’accord, coordonner les créneaux",
        orientation: "landscape",
      },
      {
        label: "Trajets et courses mutualisés",
        expected: "Trajets et courses mutualisés",
        src: "/project-visuals/for4-usages.webp",
        origin: "Capture de la landing · trajets du quotidien et courses regroupées",
        orientation: "landscape",
      },
      {
        label: "L’application, à l’écran",
        expected: "L’application, à l’écran",
        src: "/project-visuals/for4-apercu.webp",
        origin: "Captures du simulateur iOS · espace propriétaire, planning, trajets et tâches",
        orientation: "landscape",
      },
      {
        label: "Le parcours propriétaire",
        expected: "Le parcours propriétaire",
        src: "/project-visuals/for4-proprietaire.webp",
        origin: "Capture de la landing · un même planning pour propriétaire et locataires",
        orientation: "landscape",
      },
    ],
  },
  {
    slug: "pixelcreate",
    number: "04",
    name: "PixelCreate · MYRIAZ GROWTH",
    kicker: "Application macOS · prospection sortante e-mail + LinkedIn pilotée par IA",
    tagline: "Votre prospection sortante, pilotée depuis votre Mac.",
    accent: "#ff8ad8",
    formation: "bubbles",
    role: "Produit, application desktop, moteur de séquences, distribution",
    destination: {
      label: "Voir pixelcreate.io",
      url: "https://pixelcreate.io",
      note: "Page produit · accès sur demande, installation guidée",
    },
    secondary: {
      label: "Première version WhatsApp",
      url: "https://github.com/Naoufalou/Pixelcreate-AutoWhatsapp",
      note: "Dépôt public · moteur Baileys",
    },
    problem: {
      title: "La personnalisation fait répondre, mais elle ne passe pas à l’échelle à la main.",
      body: "Prospecter soi-même, c’est écrire des dizaines de messages sur deux canaux, ne pas relancer quelqu’un qui a déjà répondu et risquer de perdre l’historique. Les outils d’équipes SDR sont surdimensionnés pour une personne seule.",
    },
    research: {
      title: "Un outil pour une personne, pas pour une équipe de SDR.",
      body: "PixelCreate est né d’une première application WhatsApp dont le moteur a dû être réécrit sur le protocole multi-appareils. MYRIAZ GROWTH en reprend les leçons : garde-fous par défaut, humain dans la boucle, données chez l’utilisateur.",
      points: [
        "Les fichiers de prospects restent sur l’ordinateur de l’utilisateur ; rien n’est hébergé côté éditeur.",
        "Chaque message s’écrit d’après l’historique de contact, tous canaux confondus.",
        "Deux niveaux d’autonomie par campagne : « validation d’abord » (par défaut) ou « autonome » dans des limites fixées.",
      ],
    },
    decisions: [
      {
        title: "Contrôles avant envoi",
        detail: "Import CSV puis vérification des doublons, désinscriptions et exclusions avant tout message.",
      },
      {
        title: "Séquences multicanales qui s’arrêtent à la réponse",
        detail: "E-mail seul, LinkedIn seul ou mixte, avec étapes, délais et conditions ; la séquence s’arrête dès la première réponse.",
      },
      {
        title: "Des garde-fous visibles",
        detail: "Plafond d’envois quotidien, jours et horaires ouvrés, listes d’exclusion, mots-clés qui passent la main à l’humain, bouton de pause global et journal complet des actions.",
      },
      {
        title: "Modèles et clés au choix",
        detail: "Anthropic, OpenAI, Gemini ou OpenRouter avec la clé de l’utilisateur, stockée dans le Trousseau macOS ; envoi via Smartlead, LinkedIn via Phantombuster, CRM HubSpot ou Pipedrive.",
      },
    ],
    steps: [
      { title: "Version WhatsApp", detail: "Client Electron puis moteur Baileys : sessions isolées, cadence humaine, quotas par numéro." },
      { title: "Moteur de séquences", detail: "Étapes, délais, conditions, arrêt à la première réponse, deux modes d’autonomie." },
      { title: "Tableau de bord", detail: "Taux de réponse par poste, secteur, taille d’entreprise, canal et étape ; coût IA par rendez-vous. Aucun chiffre affiché sans données." },
      { title: "Distribution", detail: "Application macOS (v0.1) livrée avec une installation guidée en visio sur de vrais prospects." },
    ],
    proofs: [
      "Application macOS packagée et page produit publique : pixelcreate.io.",
      "Parcours de bout en bout vérifié en simulation : import CSV, séquence LinkedIn, acceptation, réponse qui arrête la séquence (39 tests e2e sur 39, backend 424 tests pytest).",
      "Première version WhatsApp livrée en installateurs macOS (.dmg) et Windows (.exe).",
    ],
    limits: [
      "Les captures montrent des données de démonstration et un fournisseur LinkedIn simulé : aucun message réel n’a été envoyé pour les produire.",
      "Aucun taux de réponse, rendez-vous ni retour sur investissement n’est garanti ni revendiqué.",
      "L’automatisation LinkedIn peut enfreindre ses conditions d’utilisation et exposer le compte à des restrictions ; l’utilisateur reste responsable de la conformité de sa prospection.",
      "macOS uniquement ; Windows en préparation.",
    ],
    result: "Un produit desktop de prospection où l’IA rédige, mais où l’utilisateur garde le contrôle des limites et peut tout arrêter d’un bouton.",
    skills: ["desktop", "automation", "llm", "product", "reliability"],
    stack: ["Electron", "TypeScript", "Baileys", "SQLite", "Anthropic · OpenAI · Gemini", "Smartlead", "Phantombuster", "Trousseau macOS"],
    media: [
      {
        label: "Présentation",
        expected: "Vidéo de présentation",
        src: "/project-visuals/myriaz-dashboard.webp",
        video: "/project-videos/pixelcreate.mp4",
        origin: "Vidéo de présentation · Hyperframes · captures de l’application",
        orientation: "landscape",
      },
      {
        label: "Tableau de bord",
        expected: "Tableau de bord",
        src: "/project-visuals/myriaz-dashboard.webp",
        origin: "Capture de l’application MYRIAZ GROWTH · données de démonstration, fournisseur LinkedIn simulé",
        orientation: "landscape",
      },
      {
        label: "Composeur de séquence",
        expected: "Composeur de séquence",
        src: "/project-visuals/myriaz-sequence.webp",
        origin: "Capture de l’application · étapes, conditions, mode « validation » ou « autonome » et limites",
        orientation: "landscape",
      },
      {
        label: "Chronologie de campagne",
        expected: "Chronologie de campagne",
        src: "/project-visuals/myriaz-chronologie.webp",
        origin: "Capture de l’application · la réponse du prospect arrête la séquence · données de démonstration",
        orientation: "landscape",
      },
      {
        label: "Boîte de réponses",
        expected: "Boîte de réponses",
        src: "/project-visuals/myriaz-boite.webp",
        origin: "Capture de l’application · qualification IA proposée, jamais imposée · données de démonstration",
        orientation: "landscape",
      },
      {
        label: "Performance",
        expected: "Performance",
        src: "/project-visuals/myriaz-performance.webp",
        origin: "Capture de l’application · « Pas de données » plutôt qu’un zéro inventé",
        orientation: "landscape",
      },
      {
        label: "Thème clair",
        expected: "Thème clair",
        src: "/project-visuals/myriaz-sequence-clair.webp",
        origin: "Capture de l’application · thème clair",
        orientation: "landscape",
      },
    ],
  },
  {
    slug: "oneshot",
    number: "05",
    name: "OneShot",
    kicker: "Cockpit local · missions freelance & prospection téléphonique",
    tagline: "La recherche de missions, pilotée comme un système.",
    accent: "#b49bff",
    formation: "funnel",
    role: "Conception, backend Python, interface locale, automatisation navigateur",
    destination: {
      label: "Voir le code source",
      url: "https://github.com/Naoufalou/Oneshot",
      note: "Dépôt public · application macOS locale",
    },
    secondary: null,
    problem: {
      title: "Des offres éparpillées, des appels oubliés, aucun chiffre fiable.",
      body: "Trouver des missions freelance IT et du support N1 en Île-de-France, c’est suivre des dizaines de sources, relancer au bon moment et savoir ce qui a réellement donné un résultat. Sans outil, rien n’est mesuré.",
    },
    research: {
      title: "Séparer voir, juger et agir.",
      body: "J’ai étudié France Travail, LinkedIn, Indeed et la diversité des formulaires ATS, puis recentré l’application sur ce qui est vérifiable : des offres avec leur source, des appels suivis et un entonnoir de conversion sans chiffre inventé.",
      points: [
        "Chaque offre garde l’URL de sa source ; le signal salarié est distingué du besoin freelance explicite.",
        "La base SQLite démarre vide : aucun compteur n’est affiché sans événement réel derrière.",
        "Clé de recherche payante (Treg) dans le Trousseau macOS, plafond estimé et confirmation avant chaque recherche.",
      ],
    },
    decisions: [
      {
        title: "Un cockpit en six vues",
        detail: "Accueil, Freelance, À appeler, Base de données, Réglages, Profil & connexions : les priorités du jour et l’entonnoir de conversion à portée d’un clic.",
      },
      {
        title: "Aucune promesse non vérifiée",
        detail: "L’envoi d’e-mails reste désactivé tant que Gmail OAuth, le suivi de livraison et les contrôles de suppression ne sont pas opérationnels.",
      },
      {
        title: "Le comportement humain pour l’historique candidature",
        detail: "Les fonctions historiques de candidature (scoring LLM Gemini, OpenAI ou Ollama, navigateur à trajectoires de souris naturelles, CV et lettres PDF) restent accessibles depuis le menu.",
      },
      {
        title: "Un mode simulation",
        detail: "Une base isolée et jetable bloque toute action externe : idéal pour démontrer l’application sans rien envoyer.",
      },
    ],
    steps: [
      { title: "Veille et import", detail: "Offres sourcées avec leur historique de runs, exports CSV." },
      { title: "Priorités du jour", detail: "Appels à passer, réponses positives, brouillons à valider, quota d’envoi." },
      { title: "Entonnoir", detail: "Trouvés, qualifiés, contactés, réponses, rendez-vous, propositions, missions : uniquement des événements réels." },
      { title: "Application macOS", detail: "Packagée en application locale ; données et clés sur la machine." },
    ],
    proofs: [
      "Code source public et architecture documentée (guide développeur, audit de fiabilité des intégrations).",
      "Stockage local SQLite ; clé de recherche dans le Trousseau macOS.",
      "Mode simulation vérifié : base isolée, aucune action externe.",
    ],
    limits: [
      "Les captures montrent une base de démonstration en mode simulation : offres fictives, aucune donnée personnelle.",
      "Connexions et envois réels non validés dans cette version ; l’envoi d’e-mails est désactivé.",
      "Aucune candidature envoyée ni résultat de recrutement n’est revendiqué ici.",
    ],
    result: "Un cockpit qui rapproche offres, appels et résultats mesurés, en laissant l’utilisateur aux commandes.",
    skills: ["python", "automation", "llm", "agents", "product", "reliability"],
    stack: ["Python", "FastAPI", "SQLite", "Playwright", "Gemini · OpenAI · Ollama", "Trousseau macOS", "pywebview"],
    media: [
      {
        label: "Présentation",
        expected: "Présentation",
        src: "/project-visuals/oneshot-accueil.webp",
        video: "/project-videos/oneshot.mp4",
        origin: "Vidéo de présentation · Hyperframes · captures de l’application",
        orientation: "landscape",
      },
      {
        label: "Accueil : priorités du jour",
        expected: "Accueil : priorités du jour",
        src: "/project-visuals/oneshot-accueil.webp",
        origin: "Capture de l’application · base de démonstration, mode simulation",
        orientation: "landscape",
      },
      {
        label: "Entonnoir de conversion",
        expected: "Entonnoir de conversion",
        src: "/project-visuals/oneshot-entonnoir.webp",
        origin: "Capture de l’application · événements réels uniquement, aucun taux artificiel",
        orientation: "landscape",
      },
      {
        label: "Missions freelance",
        expected: "Missions freelance",
        src: "/project-visuals/oneshot-freelance.webp",
        origin: "Capture de l’application · offres fictives de démonstration, chacune avec sa source",
        orientation: "landscape",
      },
      {
        label: "À appeler",
        expected: "À appeler",
        src: "/project-visuals/oneshot-appels.webp",
        origin: "Capture de l’application · suivi des appels",
        orientation: "landscape",
      },
      {
        label: "Réglages",
        expected: "Réglages",
        src: "/project-visuals/oneshot-reglages.webp",
        origin: "Capture de l’application · offres de service, recherche Treg à coût plafonné",
        orientation: "landscape",
      },
    ],
  },
];

export const getStory = (slug: string) => stories.find((s) => s.slug === slug);
