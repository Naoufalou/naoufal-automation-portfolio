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
        expected: "Vidéo de présentation",
        src: "/project-visuals/qwerty-starmap-hero.png",
        video: "/project-videos/qwerty-myriaz.mp4",
        origin: "Vidéo de présentation · Hyperframes",
        orientation: "landscape",
      },
      {
        label: "Focus projet",
        expected: "Focus projet",
        src: "/project-visuals/qwerty-starmap-graph.png",
        origin: "Capture du site QWERTY · orbe projet et facettes",
        orientation: "landscape",
      },
      { label: "Graphe vivant", expected: "Vue globale du graphe Myriaz avec ses amas", orientation: "landscape" },
      { label: "Provenance", expected: "Détail d’un nœud ou chat de rappel avec ses sources", orientation: "landscape" },
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
      label: "Découvrir IAPAS",
      url: "https://iapas-landing.vercel.app/",
      note: "Site du produit",
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
    ],
    limits: [
      "Le flux complet avec génération réelle et progression des bâtiments reste à qualifier.",
      "Transcription vocale non opérationnelle tant qu’aucun moteur local n’a été audité.",
    ],
    result: "Un poste de pilotage où l’on voit d’un coup d’œil où les agents avancent, où ça bloque et où l’on attend un feu vert.",
    skills: ["agents", "systems", "llm", "realtime3d", "typescript", "reliability", "product"],
    stack: ["TypeScript", "Node.js", "LangGraph", "SQLite WAL", "Hermes Agent", "Ollama", "React Three Fiber", "SSE"],
    media: [
      {
        label: "Présentation",
        expected: "Vidéo de présentation",
        src: "/project-visuals/iapas-monde-village.png",
        video: "/project-videos/iapas-game.mp4",
        origin: "Vidéo de présentation · Hyperframes",
        orientation: "landscape",
      },
      { label: "Cockpit 3D", expected: "Vue d’ensemble de la scène 3D avec les agents", orientation: "landscape" },
      { label: "Mission en cours", expected: "Tiroir opérationnel ouvert sur une mission", orientation: "landscape" },
      { label: "Validation humaine", expected: "Popup Accepter / Modifier / Refuser", orientation: "landscape" },
      { label: "Mobile", expected: "Cockpit en cadrage mobile", orientation: "portrait" },
    ],
  },
  {
    slug: "bouchon",
    number: "03",
    name: "Bouchon",
    kicker: "Mobilité partagée · application mobile",
    tagline: "Une voiture partagée, simplement.",
    accent: "#ffb86b",
    formation: "car",
    role: "Conception produit, règles métier, application Expo",
    destination: {
      label: "Ouvrir la démo web",
      url: "https://bouchon-demo.vercel.app/",
      note: "Export web de l’application · données simulées",
    },
    secondary: null,
    problem: {
      title: "Partager une voiture à plusieurs, c’est surtout partager des règles.",
      body: "Plusieurs membres se partagent une même voiture sur un mois. Qui l’a, quand, où est-elle, qui peut rejoindre le groupe ? Sans outil, tout passe par des messages.",
    },
    research: {
      title: "Deux rôles, deux parcours complets.",
      body: "J’ai modélisé les deux personas du service, le propriétaire et le membre, puis audité une base open source avant d’en réutiliser des éléments.",
      points: [
        "Propriétaire : demandes d’adhésion, membres, disponibilités, véhicule.",
        "Membre : position, réservation de créneaux, historique, groupe.",
        "Vérification de la licence de la base réutilisée avant intégration.",
      ],
    },
    decisions: [
      {
        title: "Les règles dans le domaine",
        detail: "Réservation, disponibilité et adhésion vivent dans des modules testés, séparés des écrans.",
      },
      {
        title: "Une carte honnête",
        detail: "La position est dessinée et étiquetée « carte simulée » : aucun GPS ni fond de carte présenté comme réel.",
      },
      {
        title: "Changer de rôle sans compte",
        detail: "Un sélecteur de persona permet de parcourir les deux expériences en démonstration locale.",
      },
    ],
    steps: [
      { title: "Domaine", detail: "Règles de réservation, demandes d’adhésion et affichage des dates." },
      { title: "Écrans", detail: "Expo Router : accueil, groupe, calendrier, réservations, profil, espace propriétaire." },
      { title: "État", detail: "Store Zustand persistant avec AsyncStorage." },
      { title: "Web", detail: "Export web de production publié sur Vercel." },
      { title: "Appareils", detail: "Validation iOS/Android sur simulateur ou appareil : prochaine étape." },
    ],
    proofs: [
      "84 tests de logique métier et de store (Jest).",
      "Typecheck, export web et expo-doctor (21/21) exécutés avec succès.",
      "Démo web en ligne.",
    ],
    limits: [
      "Véhicule, loyer et position sont des exemples simulés ; aucun paiement réel.",
      "L’exécution native iOS/Android n’est pas encore confirmée.",
    ],
    result: "Un parcours d’autopartage complet et démontrable, dont chaque règle est testée avant d’être affichée.",
    skills: ["mobile", "typescript", "product", "reliability"],
    stack: ["React Native", "Expo SDK 57", "TypeScript", "expo-router", "Zustand", "AsyncStorage", "Jest"],
    media: [
      {
        label: "Présentation",
        expected: "Vidéo de présentation",
        src: "/project-visuals/bouchon-home.webp",
        video: "/project-videos/bouchon.mp4",
        origin: "Vidéo de présentation · Hyperframes",
        orientation: "landscape",
      },
      {
        label: "Accueil",
        expected: "Accueil",
        src: "/project-visuals/bouchon-home.webp",
        origin: "Capture de l’application · simulateur iOS · carte simulée",
        orientation: "portrait",
      },
      {
        label: "Calendrier",
        expected: "Calendrier",
        src: "/project-visuals/bouchon-calendar.webp",
        origin: "Capture de l’application · réservations de démonstration",
        orientation: "portrait",
      },
      {
        label: "Espace propriétaire",
        expected: "Espace propriétaire",
        src: "/project-visuals/bouchon-owner.webp",
        origin: "Capture de l’application · données fictives",
        orientation: "portrait",
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
      "Première version WhatsApp livrée en installateurs macOS (.dmg) et Windows (.exe).",
    ],
    limits: [
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
        src: "/project-visuals/pixelcreate-product-mockup.png",
        video: "/project-videos/pixelcreate.mp4",
        origin: "Vidéo de présentation · Hyperframes",
        orientation: "landscape",
      },
      {
        label: "Page produit",
        expected: "Page produit pixelcreate.io",
        src: "/project-visuals/pixelcreate-product-mockup.png",
        origin: "Visuel produit · pixelcreate.io",
        orientation: "landscape",
      },
      { label: "Campagne", expected: "Séquence e-mail + LinkedIn avec ses étapes", orientation: "landscape" },
      { label: "Tableau de bord", expected: "Taux de réponse par canal et coût IA par rendez-vous", orientation: "landscape" },
    ],
  },
  {
    slug: "oneshot",
    number: "05",
    name: "OneShot",
    kicker: "Agent de candidature · veille d’emploi",
    tagline: "La recherche d’emploi, pilotée comme un système.",
    accent: "#b49bff",
    formation: "funnel",
    role: "Conception, backend Python, automatisation navigateur, cockpit",
    destination: {
      label: "Voir le code source",
      url: "https://github.com/Naoufalou/Oneshot",
      note: "Dépôt public · application locale",
    },
    secondary: null,
    problem: {
      title: "Des dizaines d’offres, un CV à adapter à chacune.",
      body: "La recherche d’emploi est répétitive. Les candidatures génériques passent mal les filtres, et l’automatisation naïve se fait bloquer par les plateformes.",
    },
    research: {
      title: "Séparer voir, juger et agir.",
      body: "J’ai étudié France Travail, LinkedIn, Indeed et la diversité des formulaires ATS pour séparer clairement la veille, l’évaluation et l’action.",
      points: [
        "Un catalogue de plateformes extensible, une stratégie par type de formulaire.",
        "Un score d’adéquation sur 100, accompagné de son raisonnement.",
        "Sessions de navigateur et cookies conservés uniquement sur la machine.",
      ],
    },
    decisions: [
      {
        title: "Un pipeline en trois temps",
        detail: "Veille temps réel, puis scoring par LLM (Gemini, OpenAI ou Ollama), puis action navigateur.",
      },
      {
        title: "Un comportement humain",
        detail: "Moteur HumanActions : trajectoires de souris en courbes de Bézier, frappe et pauses naturelles, défilement progressif.",
      },
      {
        title: "Des documents par offre",
        detail: "CV et lettre adaptés, générés en PDF puis téléversés au bon endroit du formulaire.",
      },
    ],
    steps: [
      { title: "Veille", detail: "Scanner temps réel des offres et notifications Telegram, Discord ou dans l’application." },
      { title: "Analyse", detail: "Extraction des compétences du profil et Match Score expliqué." },
      { title: "Documents", detail: "Génération de CV et de lettres avec pypdf et reportlab." },
      { title: "Candidature", detail: "Playwright en un clic ou en lot par plateforme, avec détection des ATS." },
      { title: "Cockpit", detail: "Tableau de bord FastAPI « Mode Zen » et suivi des candidatures envoyées." },
    ],
    proofs: [
      "Code source public et architecture documentée dans un guide développeur.",
      "Stockage local SQLite (WAL) des offres et des candidatures.",
    ],
    limits: [
      "Application locale : aucune démo publique.",
      "Aucune candidature envoyée ni résultat de recrutement n’est revendiqué ici.",
    ],
    result: "Un agent qui rapproche offres, profil et candidatures, en laissant l’utilisateur aux commandes.",
    skills: ["python", "automation", "llm", "agents"],
    stack: ["Python", "FastAPI", "Pydantic", "SQLite", "Playwright", "Gemini · OpenAI · Ollama", "reportlab"],
    media: [
      { label: "Cockpit", expected: "Tableau de bord « Mode Zen » avec les onglets de plateformes", orientation: "landscape" },
      { label: "Match Score", expected: "Une offre avec son score et son explication", orientation: "landscape" },
      { label: "Postulées", expected: "Onglet de suivi des candidatures", orientation: "landscape" },
    ],
  },
];

export const getStory = (slug: string) => stories.find((s) => s.slug === slug);
