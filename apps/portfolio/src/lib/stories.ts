// Récits éditoriaux du parcours d'accueil. Faits étayés par les sources
// vérifiées (landing IAPAS, démo Bouchon, fiche Gumroad, dépôts publics).
// Aucun chiffre commercial ni état de production n'est avancé ici.

export type StoryVisualKind =
  | "constellation"
  | "starmap-captures"
  | "iapas-captures"
  | "bouchon-captures"
  | "gumroad-mockup"
  | "oneshot-schema";

export type StoryGalleryItem = {
  src: string;
  alt: string;
  caption: string;
  nature: "capture" | "mockup" | "schema" | "illustration";
  source: string;
};

export type Story = {
  id: string;
  number: string;
  theme: "memory" | "worlds" | "mobility" | "business" | "delivery";
  tag: string;
  title: string;
  subtitle: string;
  problem: string;
  research: string;
  decision: string;
  build: { title: string; detail: string; state: string }[];
  proof: string;
  limits: string;
  stack: string[];
  visual: StoryVisualKind;
  visualLabel: string;
  gallery: StoryGalleryItem[];
  /** Destination publique vérifiée (HTTP 200), sinon null. */
  destination: { label: string; url: string } | null;
  /** Précision exigée quand la destination n'est pas prouvée liée au projet. */
  destinationNote?: string;
  source: { label: string; url: string } | null;
  /** Validation restante, affichée telle quelle. */
  openQuestion?: string;
};

export const stories: Story[] = [
  {
    id: "qwerty-myriaz",
    number: "01",
    theme: "memory",
    tag: "MÉMOIRE & ORCHESTRATION · IA AGENTIQUE",
    title: "QWERTY × Myriaz",
    subtitle: "Donner une forme navigable à la mémoire d’un système.",
    problem:
      "Quand les projets, les outils et les connaissances se multiplient, le fil se perd : le contexte dort dans des notes isolées et chaque reprise repart de zéro.",
    research:
      "Le parti pris de QWERTY est un système qui se souvient, agit et apprend. Sa carte stellaire rend visible ce qui, dans une liste de tâches, reste invisible : ce qui est relié à quoi, ce qui est ancien, ce qui est neuf.",
    decision:
      "Organiser le récit autour d’une constellation : un cœur, des anneaux temporels et des nœuds reliés. Les relations deviennent lisibles, les regroupements restent navigables et chaque élément garde sa provenance.",
    build: [
      {
        title: "Cœur de glyphes",
        detail:
          "Un point d’entrée unique depuis lequel les nœuds s’ordonnent par ancienneté : plus on s’éloigne du centre, plus la trace est récente.",
        state: "Conçu",
      },
      {
        title: "Mémoire en losanges",
        detail:
          "Les connaissances sont des objets persistants que l’on peut relier à un projet, pas des fichiers éparpillés.",
        state: "Conçu",
      },
      {
        title: "Nœuds vivants",
        detail:
          "Les connexions s’éclairent au focus : le graphe explique les relations sans obliger à tout lire.",
        state: "Conçu",
      },
      {
        title: "Schéma éditorial",
        detail:
          "La constellation publiée ici est un schéma inspiré de ces principes, pas une connexion aux données privées du graphe.",
        state: "Affiché comme schéma",
      },
    ],
    proof:
      "Le site de démonstration de QWERTY est en ligne et consultable. La constellation présentée ci-contre est un schéma éditorial : elle illustre les relations de connaissance, elle n’affiche aucune donnée privée.",
    limits:
      "Le dépôt Myriaz est privé. Aucune métrique de graphe, aucun volume de nœuds et aucun résultat d’usage ne sont avancés sur cette page.",
    stack: ["Python", "React", "WebSocket", "SQLite", "Graphify"],
    visual: "starmap-captures",
    visualLabel: "Captures du site de démonstration QWERTY",
    gallery: [
      {
        src: "/project-visuals/qwerty-starmap-hero.png",
        alt: "Ouverture du site de démonstration QWERTY : titre, chronologie radiale et carte stellaire en arrière-plan",
        caption: "Ouverture · « Un système qui se souvient, agit et apprend »",
        nature: "capture",
        source: "qwerty-starmap-motion-ultra.vercel.app",
      },
      {
        src: "/project-visuals/qwerty-starmap-graph.png",
        alt: "Carte stellaire du site QWERTY : nœuds, anneaux temporels et légende d’interaction",
        caption: "Carte stellaire · nœuds reliés et anneaux temporels",
        nature: "capture",
        source: "qwerty-starmap-motion-ultra.vercel.app",
      },
      {
        src: "/project-visuals/qwerty-starmap-deep.png",
        alt: "Vue intermédiaire du parcours QWERTY après défilement",
        caption: "Parcours · enchaînement des panneaux au défilement",
        nature: "capture",
        source: "qwerty-starmap-motion-ultra.vercel.app",
      },
    ],
    destination: {
      label: "Voir la démo QWERTY",
      url: "https://qwerty-starmap-motion-ultra.vercel.app/",
    },
    source: null,
  },
  {
    id: "iapas-game",
    number: "02",
    theme: "worlds",
    tag: "PRODUIT & INTERACTION · MONDE 3D",
    title: "IAPAS",
    subtitle: "Un poste de pilotage pour vos projets, pas une fenêtre de chat.",
    problem:
      "Les agents IA vivent dans des conversations qu’on perd de vue. On ne sait plus ce qui est fini, ce qui est bloqué et ce qui attend une décision.",
    research:
      "L’idée retenue : donner à chaque projet une présence visuelle et un état lisible d’un coup d’œil. Le projet devient un lieu — un village, une planète — et la mission se lit sur la carte.",
    decision:
      "Rendre l’état réel plutôt que décoratif : statuts, agents et livrables proviennent des événements du moteur. Et garder l’humain dans la boucle — toute action hors du dossier du projet demande une validation explicite.",
    build: [
      {
        title: "Le projet est un monde",
        detail:
          "Chaque projet occupe un lieu dans un monde 3D partagé : on voit d’un regard où ça avance et où ça attend.",
        state: "Conçu",
      },
      {
        title: "L’humain garde la main",
        detail:
          "Demande visible, décision explicite : Approuver ou Refuser. Aucune action sensible n’est automatique.",
        state: "Conçu",
      },
      {
        title: "La clé reste chez vous",
        detail:
          "Clé API apportée par l’utilisateur, stockée dans le gestionnaire d’identification du système, jamais dans un fichier. Application locale d’abord.",
        state: "Conçu",
      },
      {
        title: "Application Godot 4.7",
        detail:
          "L’application actuelle est construite avec Godot 4.7 pour Windows x64 et macOS Apple Silicon. Les captures publiées sont des prototypes du monde et de ses planètes.",
        state: "Prototypes publiés",
      },
    ],
    proof:
      "Une page publique présente le projet, ses choix de conception et ses prototypes. Le moteur embarqué est Hermes Agent de Nous Research, installé au premier lancement dans un dossier isolé.",
    limits:
      "Les captures publiées sont des prototypes du monde, pas des données de démonstration. La version macOS n’est pas annoncée comme testée ni signée. Le lien entre la page publique et le dépôt de développement n’est pas encore confirmé : à valider avant de la présenter comme la destination officielle du projet.",
    stack: ["Godot 4.7", "Hermes Agent", "Clé API locale", "Windows", "macOS"],
    visual: "iapas-captures",
    visualLabel: "Captures publiées · prototypes du monde IAPAS",
    gallery: [
      {
        src: "/project-visuals/iapas-monde-village.png",
        alt: "Prototype web du monde IAPAS : un village avec des bâtiments-projets et des agents",
        caption: "Monde-village · bâtiments-projets et agents",
        nature: "capture",
        source: "iapas-landing.vercel.app",
      },
      {
        src: "/project-visuals/iapas-monde-planete.png",
        alt: "Vue d’une planète-projet du monde IAPAS sur grand écran",
        caption: "Planète-projet · vue bureau",
        nature: "capture",
        source: "iapas-landing.vercel.app",
      },
      {
        src: "/project-visuals/iapas-monde-mobile.png",
        alt: "Prototype d’une planète-projet IAPAS affiché sur mobile",
        caption: "Planète-projet · affichage mobile",
        nature: "capture",
        source: "iapas-landing.vercel.app",
      },
    ],
    destination: null,
    destinationNote:
      "Page publique IAPAS à valider comme destination du projet avant publication du lien.",
    source: null,
    openQuestion:
      "Confirmer que iapas-landing.vercel.app est bien la destination publique du dépôt de développement avant d’afficher un lien « site du projet ».",
  },
  {
    id: "bouchon",
    number: "03",
    theme: "mobility",
    tag: "MOBILITÉ PARTAGÉE · APPLICATION",
    title: "Bouchon",
    subtitle: "Faire du partage d’un véhicule une expérience coordonnée.",
    problem:
      "Une voiture de groupe se gère dans cinq endroits différents : qui l’a réservée, quand elle est libre, qui fait les courses, comment le loyer se répartit.",
    research:
      "Le besoin n’est pas un catalogue de véhicules mais une coordination : découvrir le véhicule du groupe, réserver un créneau, voir le planning commun et organiser les trajets au même endroit.",
    decision:
      "Séparer les règles de réservation et de disponibilité des écrans, puis structurer l’expérience autour des tâches concrètes du groupe. Le planning devient la pièce centrale : jour, semaine, mois.",
    build: [
      {
        title: "Le véhicule du groupe",
        detail:
          "Une fiche qui présente le véhicule, son quartier et le loyer total à partager entre locataires.",
        state: "Déployé en démo",
      },
      {
        title: "Le planning commun",
        detail:
          "Disponibilités, réservations et trajets réunis dans une seule vue, avec bascule jour / semaine / mois.",
        state: "Déployé en démo",
      },
      {
        title: "Les trajets à faire ensemble",
        detail:
          "Un espace pour les déplacements et les courses partagés, distinct de la réservation du véhicule.",
        state: "Déployé en démo",
      },
      {
        title: "Le groupe et son loyer",
        detail:
          "Accès au groupe, statut de membre et explication de la répartition du loyer.",
        state: "Déployé en démo",
      },
    ],
    proof:
      "La démo web est publiée et consultable. Les captures ci-contre proviennent de cette démo en fonctionnement : l’écran d’accueil du véhicule de groupe et le planning du mois.",
    limits:
      "Les données affichées — véhicule, quartier, position, loyer, disponibilités — sont des exemples simulés. L’exécution native iOS et Android n’est pas validée.",
    stack: ["React Native", "Expo", "TypeScript", "Zustand", "AsyncStorage"],
    visual: "bouchon-captures",
    visualLabel: "Captures de la démo web publiée",
    gallery: [
      {
        src: "/project-visuals/bouchon-home.webp",
        alt: "Écran d’accueil de la démo Bouchon : véhicule du groupe, loyer et carte du quartier",
        caption: "Accueil · le véhicule du groupe et son loyer",
        nature: "capture",
        source: "bouchon-demo.vercel.app",
      },
      {
        src: "/project-visuals/bouchon-live-calendar.png",
        alt: "Écran planning de la démo Bouchon : calendrier du mois, jour sélectionné et bouton de réservation",
        caption: "Planning · vue mensuelle et réservation",
        nature: "capture",
        source: "bouchon-demo.vercel.app/calendrier",
      },
      {
        src: "/project-visuals/bouchon-calendar.webp",
        alt: "Capture du calendrier de réservation Bouchon",
        caption: "Planning · disponibilités du groupe",
        nature: "capture",
        source: "démo locale Bouchon",
      },
      {
        src: "/project-visuals/bouchon-owner.webp",
        alt: "Capture de l’espace propriétaire de la démo Bouchon",
        caption: "Espace propriétaire · vue groupe",
        nature: "capture",
        source: "démo locale Bouchon",
      },
    ],
    destination: {
      label: "Voir la démo Bouchon",
      url: "https://bouchon-demo.vercel.app/",
    },
    source: null,
  },
  {
    id: "pixelcreate",
    number: "04",
    theme: "business",
    tag: "OUTILLAGE B2B · AUTOMATISATION LOCALE",
    title: "PixelCreate",
    subtitle: "Structurer un travail commercial en outils utilisables.",
    problem:
      "La prospection sortante se fait à la main, compte par compte, message par message. Les outils en ligne mutualisés exposent les numéros à une détection groupée.",
    research:
      "L’approche retenue : garder le traitement sur la machine de l’utilisateur, distribuer la charge entre plusieurs comptes et faire varier chaque message pour qu’aucun envoi ne ressemble au précédent.",
    decision:
      "Une application de bureau locale plutôt qu’un service distant : l’utilisateur apporte ses propres comptes, la charge est répartie en alternance entre eux et les envois sont espacés pour rester dans un rythme humain.",
    build: [
      {
        title: "Comptes isolés en local",
        detail:
          "Plusieurs comptes connectés par scan de QR code, sessions isolées et conservées sur la machine.",
        state: "Décrit dans la fiche produit",
      },
      {
        title: "Réécriture par message",
        detail:
          "Chaque destinataire reçoit une formulation distincte d’un même contenu, pour éviter les envois identiques.",
        state: "Décrit dans la fiche produit",
      },
      {
        title: "Répartition en alternance",
        detail:
          "Les comptes expéditeurs se relaient au sein d’une même campagne pour diviser la charge, avec une limite quotidienne par numéro.",
        state: "Décrit dans la fiche produit",
      },
      {
        title: "Installateurs macOS et Windows",
        detail:
          "La fiche produit annonce un installateur pour chaque système et un guide de prise en main.",
        state: "Annoncé sur la fiche produit",
      },
    ],
    proof:
      "La seule destination publique vérifiée est la fiche produit publiée en ligne. Elle décrit l’application, ses modules et son installation. Le visuel de cette fiche est une maquette d’illustration, pas une capture de l’application.",
    limits:
      "Aucune démo web n’est déployée pour ce produit : le prototype fonctionne en local. Aucune campagne, aucun envoi et aucun résultat commercial ne sont présentés ici. De vraies captures de l’application nécessitent de la lancer en local.",
    stack: ["Application locale", "macOS", "Windows x64", "Multi-comptes"],
    visual: "gumroad-mockup",
    visualLabel: "Maquette de la fiche produit publiée · pas une capture",
    gallery: [
      {
        src: "/project-visuals/pixelcreate-product-mockup.png",
        alt: "Maquette d’illustration de la fiche produit PixelCreate publiée en ligne",
        caption: "Fiche produit · visuel d’illustration",
        nature: "mockup",
        source: "naoufal30.gumroad.com",
      },
    ],
    destination: {
      label: "Voir la fiche produit",
      url: "https://naoufal30.gumroad.com/l/gjugsq",
    },
    source: {
      label: "Dépôt public associé",
      url: "https://github.com/Naoufalou/Pixelcreate-AutoWhatsapp",
    },
    openQuestion:
      "Captures réelles à produire en lançant l’application Electron en local — la maquette de la fiche produit ne peut pas servir de preuve d’interface.",
  },
  {
    id: "oneshot",
    number: "05",
    theme: "delivery",
    tag: "AGENTS IA · AUTOMATISATION WEB LOCALE",
    title: "OneShot",
    subtitle: "Faire de la recherche d’emploi un parcours pilotable.",
    problem:
      "La recherche d’emploi se disperse entre des onglets d’offres, des notes de suivi et des relances oubliées. On perd la vue d’ensemble de ce qui a été fait et de ce qui reste à faire.",
    research:
      "Le besoin est un poste de pilotage local : réunir la veille d’offres, l’analyse de correspondance avec un profil et le suivi des candidatures dans un seul endroit, sans perdre la main sur les décisions.",
    decision:
      "Séparer la collecte, l’évaluation et les actions navigateur. Chaque couche peut évoluer indépendamment, plateforme par plateforme, et aucune action n’est envoyée automatiquement sur une plateforme d’emploi.",
    build: [
      {
        title: "Collecte des offres",
        detail:
          "Une veille d’offres alimente une base locale, relue avant toute action.",
        state: "Architecture publiée",
      },
      {
        title: "Analyse de correspondance",
        detail:
          "Le profil est confronté aux critères de l’offre pour produire une lecture, pas un score automatique.",
        state: "Architecture publiée",
      },
      {
        title: "Suivi des candidatures",
        detail:
          "Un état par candidature, conservé localement, avec les étapes déjà engagées.",
        state: "Architecture publiée",
      },
      {
        title: "Actions navigateur assistées",
        detail:
          "La couche navigateur pilote un parcours déjà validé ; l’envoi sur les plateformes d’emploi reste une action explicite.",
        state: "Règle de conception",
      },
    ],
    proof:
      "Le dépôt est public et décrit une application locale : architecture Python/FastAPI, SQLite, Playwright et interface web. Le code est consultable en ligne.",
    limits:
      "L’application fonctionne en local et aucune capture d’interface n’est publiée. Aucune candidature envoyée ni aucun résultat de recrutement n’est revendiqué. Le schéma ci-contre est une illustration éditoriale, pas une capture.",
    stack: ["Python", "FastAPI", "SQLite", "Playwright", "LLM"],
    visual: "oneshot-schema",
    visualLabel: "Schéma d’interface · illustration, pas une capture",
    gallery: [],
    destination: null,
    destinationNote:
      "Aucune destination publique confirmée. Un déploiement répond à l’adresse oneshot.vercel.app sans preuve d’appartenance : le lien n’est pas affiché.",
    source: {
      label: "Code source public",
      url: "https://github.com/Naoufalou/Oneshot",
    },
    openQuestion:
      "Lancer l’application en local et capturer l’interface, ou conserver ce schéma légendé. La vidéo de ce chapitre reste à créer.",
  },
];

export const natureLabel: Record<StoryGalleryItem["nature"], string> = {
  capture: "Capture réelle",
  mockup: "Maquette d’illustration",
  schema: "Schéma explicatif",
  illustration: "Illustration éditoriale",
};
