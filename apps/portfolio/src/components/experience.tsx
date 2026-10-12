"use client";

import {
  forceCenter,
  forceCollide,
  forceLink,
  forceManyBody,
  forceSimulation,
  type SimulationLinkDatum,
  type SimulationNodeDatum,
} from "d3-force";
import { useEffect, useId, useRef, useState } from "react";

type GraphNode = SimulationNodeDatum & {
  id: string;
  label: string;
  radius: number;
  tone: "core" | "memory" | "work" | "proof";
};
type GraphLink = SimulationLinkDatum<GraphNode> & {
  source: string | GraphNode;
  target: string | GraphNode;
};

const graphNodes: GraphNode[] = [
  { id: "myriaz", label: "MYRIAZ", radius: 37, tone: "core", fx: 320, fy: 205 },
  { id: "knowledge", label: "CONNAISSANCE", radius: 20, tone: "memory" },
  { id: "projects", label: "PROJETS", radius: 17, tone: "work" },
  { id: "context", label: "CONTEXTE", radius: 16, tone: "memory" },
  { id: "artifacts", label: "ARTEFACTS", radius: 18, tone: "proof" },
  { id: "skills", label: "COMPÉTENCES", radius: 16, tone: "work" },
  { id: "relations", label: "RELATIONS", radius: 19, tone: "memory" },
  { id: "history", label: "TRACES", radius: 14, tone: "proof" },
].map((node, index) => ({
  ...node,
  x: 320 + Math.cos(index * 0.82) * (72 + index * 14),
  y: 205 + Math.sin(index * 0.82) * (62 + index * 10),
}));

const graphLinks: GraphLink[] = [
  { source: "myriaz", target: "knowledge" },
  { source: "myriaz", target: "projects" },
  { source: "myriaz", target: "context" },
  { source: "myriaz", target: "artifacts" },
  { source: "knowledge", target: "relations" },
  { source: "projects", target: "skills" },
  { source: "context", target: "history" },
  { source: "artifacts", target: "history" },
  { source: "relations", target: "projects" },
  { source: "skills", target: "artifacts" },
];

function ForceConstellation() {
  const instance = useId().replace(/:/g, "");
  const svgRef = useRef<SVGSVGElement>(null);
  const nodeRefs = useRef<Array<SVGGElement | null>>([]);
  const linkRefs = useRef<Array<SVGLineElement | null>>([]);
  const [active, setActive] = useState("MÉMOIRE DE PROJET");

  useEffect(() => {
    const svg = svgRef.current;
    if (!svg) return;

    const nodes = graphNodes.map((node) => ({ ...node }));
    const links = graphLinks.map((link) => ({ ...link }));
    const simulation = forceSimulation<GraphNode>(nodes)
      .force(
        "link",
        forceLink<GraphNode, GraphLink>(links)
          .id((node) => node.id)
          .distance((link) => (link.source === "myriaz" ? 104 : 75))
          .strength(0.52),
      )
      .force("charge", forceManyBody<GraphNode>().strength(-138))
      .force("center", forceCenter(320, 205).strength(0.08))
      .force("collide", forceCollide<GraphNode>((node) => node.radius + 17))
      .alphaDecay(0.035)
      .stop();

    const point = (value: string | GraphNode) =>
      typeof value === "string"
        ? nodes.find((node) => node.id === value)
        : value;

    const render = () => {
      links.forEach((link, index) => {
        const line = linkRefs.current[index];
        const source = point(link.source);
        const target = point(link.target);
        if (!line || !source || !target) return;
        line.setAttribute("x1", String(source.x ?? 0));
        line.setAttribute("y1", String(source.y ?? 0));
        line.setAttribute("x2", String(target.x ?? 0));
        line.setAttribute("y2", String(target.y ?? 0));
      });
      nodes.forEach((node, index) => {
        const group = nodeRefs.current[index];
        if (group) {
          group.setAttribute(
            "transform",
            `translate(${node.x ?? 0} ${node.y ?? 0})`,
          );
        }
      });
    };

    const reducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;
    if (reducedMotion) {
      simulation.tick(120);
      render();
      return () => simulation.stop();
    }

    simulation.on("tick", render);
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) simulation.alpha(0.9).restart();
        else simulation.stop();
      },
      { threshold: 0.14 },
    );
    observer.observe(svg);
    render();
    return () => {
      observer.disconnect();
      simulation.stop();
    };
  }, []);

  return (
    <div className="constellation-wrap">
      <div className="constellation-topline">
        <span>MYRIAZ / CARTE DE CONNAISSANCE</span>
        <span className="constellation-live"><i /> GRAPHE EXPLORABLE</span>
      </div>
      <svg
        aria-label="Schéma animé des relations entre Myriaz, les projets, la connaissance et les artefacts"
        className="constellation"
        ref={svgRef}
        role="img"
        viewBox="0 0 640 410"
      >
        <defs>
          <radialGradient id={`star-core-${instance}`}>
            <stop stopColor="#d4ff95" stopOpacity=".25" />
            <stop offset="1" stopColor="#d4ff95" stopOpacity="0" />
          </radialGradient>
          <filter id={`soft-glow-${instance}`} x="-100%" y="-100%" width="300%" height="300%">
            <feGaussianBlur stdDeviation="9" result="blur" />
            <feMerge><feMergeNode in="blur" /><feMergeNode in="SourceGraphic" /></feMerge>
          </filter>
        </defs>
        <circle className="star-halo" cx="320" cy="205" r="155" fill={`url(#star-core-${instance})`} />
        <ellipse className="star-ring ring-one" cx="320" cy="205" rx="238" ry="114" />
        <ellipse className="star-ring ring-two" cx="320" cy="205" rx="182" ry="154" />
        <ellipse className="star-ring ring-three" cx="320" cy="205" rx="274" ry="173" />
        <g className="star-links">
          {graphLinks.map((link, index) => (
            <line
              key={`${link.source}-${link.target}`}
              ref={(element) => { linkRefs.current[index] = element; }}
              className="star-link"
            />
          ))}
        </g>
        <g>
          {graphNodes.map((node, index) => (
            <g
              key={node.id}
              ref={(element) => { nodeRefs.current[index] = element; }}
              className={`star-node node-${node.tone}`}
              role="button"
              tabIndex={0}
              aria-label={`Nœud ${node.label}`}
              onFocus={() => setActive(node.label)}
              onBlur={() => setActive("MÉMOIRE DE PROJET")}
              onMouseEnter={() => setActive(node.label)}
              onMouseLeave={() => setActive("MÉMOIRE DE PROJET")}
            >
              <circle className="node-orbit" r={node.radius + 8} />
              <circle
                className="node-dot"
                r={node.radius}
                filter={node.tone === "core" ? `url(#soft-glow-${instance})` : undefined}
              />
              <text y={node.radius + 19}>{node.label}</text>
            </g>
          ))}
        </g>
        <text className="map-coordinate" x="22" y="32">48°51′ N / CONTEXTE PERSISTANT</text>
        <text className="map-coordinate" x="480" y="390">NŒUDS ÉDITORIAUX · NON CONNECTÉ</text>
      </svg>
      <div className="constellation-footer">
        <span>Survolez ou parcourez les nœuds</span>
        <span className="constellation-active">{active}</span>
      </div>
    </div>
  );
}

const stories = [
  {
    id: "myriaz",
    number: "01",
    theme: "memory",
    tag: "SYSTÈMES DE CONNAISSANCE · IA AGENTIQUE",
    title: "QWERTY × Myriaz",
    subtitle: "Donner une forme navigable à la mémoire d’un système.",
    question: "Comment garder le fil quand projets, outils et connaissances se multiplient ?",
    narrative:
      "Myriaz explore un graphe de travail vivant : retrouver le contexte, relier des projets et parcourir les connaissances au lieu de les laisser dormir dans des notes isolées.",
    decision:
      "Organiser le récit autour d’une carte stellaire : les relations deviennent visibles, les regroupements restent navigables et chaque élément garde sa provenance.",
    proof:
      "Le dernier état documenté du graphe web (3 octobre 2026) décrit environ 1 700 nœuds et des amas calculés par similarité, type, secteur et technologie. Le graphe est un schéma éditorial inspiré de ces principes, pas une connexion aux données privées.",
    stack: ["Python", "React", "WebSocket", "SQLite", "Graphify"],
    visual: "constellation",
    visualLabel: "Schéma animé · relations de connaissance",
    repo: null,
  },
  {
    id: "iapas-game",
    number: "02",
    theme: "execution",
    tag: "ORCHESTRATION · RECHERCHE APPLIQUÉE",
    title: "IAPAS-Game / Hermes Agent OS",
    subtitle: "Une intention devient une mission vérifiable.",
    question: "Comment faire travailler des agents sans perdre l’état, les limites ni la preuve du résultat ?",
    narrative:
      "Un vertical slice transforme une commande en micro-tâches, relie leurs dépendances et persiste les états dans SQLite. Un graphe LangGraph pilote statut, mode et mission ; l’interface React Three Fiber expose l’activité via SSE.",
    decision:
      "Figer provider et modèle au niveau du run, rendre les effets idempotents et garder les étapes sensibles dans un flux de validation explicite.",
    proof:
      "Le rapport de validation décrit des tests backend, un build de production et un smoke test du parcours web/3D. Le flux complet avec un fournisseur réel reste explicitement à qualifier.",
    stack: ["TypeScript", "LangGraph", "SQLite", "Hermes", "React Three Fiber"],
    visual: "execution",
    visualLabel: "Schéma d’architecture · intention vers artefact",
    repo: null,
  },
  {
    id: "bouchon",
    number: "03",
    theme: "bouchon",
    tag: "MOBILITÉ PARTAGÉE · APPLICATION WEB & MOBILE",
    title: "Bouchon — la voiture en commun",
    subtitle: "Faire du partage d’un véhicule une expérience coordonnée.",
    question: "Comment rendre lisibles les réservations, les trajets et la vie d’un groupe autour d’une voiture ?",
    narrative:
      "Bouchon explore un parcours d’autopartage : découvrir le véhicule du groupe, réserver un créneau, consulter le planning et organiser les trajets. La démo web publiée présente aujourd’hui l’expérience For4 avec un véhicule et un quartier de démonstration.",
    decision:
      "Séparer les règles de réservation et de disponibilité des écrans, puis structurer l’expérience autour des tâches concrètes du groupe plutôt que d’un simple catalogue de véhicules.",
    proof:
      "La démo web est consultable en ligne et les captures montrent les parcours d’application. Les données de véhicule, loyer et position affichées sont des exemples simulés ; l’exécution native iOS/Android n’est pas confirmée.",
    stack: ["React Native", "Expo", "TypeScript", "Zustand", "AsyncStorage"],
    visual: "bouchon",
    visualLabel: "Captures d’écrans · application et démo web",
    demo: "https://bouchon-demo.vercel.app/",
    repo: null,
  },
  {
    id: "pixelcreate",
    number: "04",
    theme: "business",
    tag: "OUTILS B2B · AUTOMATISATION",
    title: "PixelCreate",
    subtitle: "Structurer un travail commercial en outils utilisables.",
    question: "Comment passer d’outils dispersés à un espace de travail où données, tâches et suivi se tiennent ?",
    narrative:
      "La famille PixelCreate rassemble des prototypes d’outillage commercial : interfaces de traitement des demandes, gestion de contacts, automatisations et tableaux de suivi.",
    decision:
      "Construire des modules orientés tâches et rendre le parcours plus lisible. Cette présentation reste centrée sur la conception logicielle ; elle ne prétend pas qu’une campagne ou un envoi a eu lieu.",
    proof:
      "Plusieurs générations et prototypes locaux sont documentés. Les preuves publiques sont limitées ; les chiffres de performance, intégrations actives et résultats commerciaux ne sont donc pas affichés.",
    stack: ["Electron", "TypeScript", "React", "SQLite", "IA"],
    visual: "business",
    visualLabel: "Schéma de parcours · prototypes d’outillage",
    repo: null,
  },
  {
    id: "oneshot",
    number: "05",
    theme: "oneshot",
    tag: "AGENTS IA · AUTOMATISATION WEB",
    title: "OneShot",
    subtitle: "Faire de la recherche d’emploi un parcours pilotable.",
    question: "Comment rapprocher les offres, un profil et les étapes de candidature sans perdre la main ?",
    narrative:
      "OneShot réunit une veille d’offres, une analyse de correspondance assistée par IA et un suivi local des candidatures dans un cockpit web orienté contrôle.",
    decision:
      "Séparer la collecte, l’évaluation et les actions navigateur afin que le parcours puisse évoluer plateforme par plateforme.",
    proof:
      "Le dépôt décrit une application locale et son architecture Python/FastAPI, SQLite, Playwright et interface web. Cette fiche ne revendique aucune candidature envoyée ni résultat de recrutement.",
    stack: ["Python", "FastAPI", "SQLite", "Playwright", "LLM"],
    visual: "oneshot",
    visualLabel: "Schéma d’interface · veille et suivi local",
    repo: "https://github.com/Naoufalou/Oneshot",
  },
];

function StoryVisual({ kind }: { kind: string }) {
  if (kind === "constellation") return <ForceConstellation />;

  if (kind === "execution") {
    return (
      <div className="story-visual-diagram execution-diagram">
        <div className="diagram-label">HERMES AGENT OS <span>MISSION / 001</span></div>
        <div className="execution-core"><i>⌘</i><b>INTENTION</b><small>objectif · limites</small></div>
        <div className="execution-flow" aria-label="Étapes de traitement">
          {[
            ["01", "CADRER", "commande"],
            ["02", "DÉCOUPER", "micro-tâches"],
            ["03", "EXÉCUTER", "worker contrôlé"],
            ["04", "VÉRIFIER", "preuves"],
          ].map(([n, title, detail]) => (
            <div className="execution-step" key={n}>
              <span>{n}</span><b>{title}</b><small>{detail}</small>
            </div>
          ))}
        </div>
        <div className="execution-result"><span>ARTEFACT</span><b>Résultat persistant</b><i>SQLite / événements / SSE</i></div>
        <p className="visual-disclaimer">Schéma d’architecture · pas une capture d’interface</p>
      </div>
    );
  }

  if (kind === "business") {
    return (
      <div className="story-visual-diagram business-diagram">
        <div className="diagram-label">PIXELCREATE <span>WORKFLOW / ÉDITORIAL</span></div>
        <div className="business-orbit"><span>OUTILS<br />B2B</span></div>
        <div className="business-thread thread-one"><i /> Signal <b>→</b> Contexte <b>→</b> Action</div>
        <div className="business-thread thread-two"><i /> Demande <b>→</b> Suivi <b>→</b> Résultat</div>
        <div className="business-modules">
          <span>INBOX</span><span>CONTACTS</span><span>AUTOMATIONS</span><span>ANALYSE</span>
        </div>
        <p className="visual-disclaimer">Schéma de processus · aucune donnée de campagne</p>
      </div>
    );
  }

  if (kind === "bouchon") {
    return (
      <div className="bouchon-gallery">
        <a className="bouchon-demo-preview" href="https://bouchon-demo.vercel.app/" target="_blank" rel="noreferrer">
          <span className="bouchon-demo-label">DÉMO VERCEL · FOR4</span>
          <img src="/project-visuals/bouchon-home.webp" alt="Capture de l’application Bouchon : carte simulée, Peugeot 208 de démonstration et actions de réservation" />
          <span className="bouchon-demo-link">Explorer la démo ↗</span>
        </a>
        <div className="bouchon-gallery-pair">
          <figure><img src="/project-visuals/bouchon-calendar.webp" alt="Capture du calendrier de démonstration Bouchon" /><figcaption>PLANNING · EXEMPLE</figcaption></figure>
          <figure><img src="/project-visuals/bouchon-owner.webp" alt="Capture de l’espace propriétaire de démonstration Bouchon" /><figcaption>ESPACE PROPRIÉTAIRE · EXEMPLE</figcaption></figure>
        </div>
        <p className="visual-disclaimer">Captures de l’application · données de démonstration simulées</p>
      </div>
    );
  }

  return (
    <div className="story-visual-diagram oneshot-diagram">
      <div className="diagram-label">ONESHOT / LOCAL COCKPIT <span>PROFIL · OFFRES · SUIVI</span></div>
      <div className="oneshot-board">
        <div className="oneshot-sidebar"><b>01</b><i /><i /><i /><i /></div>
        <div className="oneshot-content">
          <span className="oneshot-kicker">VEILLE DE POSTES</span>
          <b>Le bon contexte,<br />au bon moment.</b>
          <div className="match-row"><i /><span>Correspondance du profil</span><strong>À examiner</strong></div>
          <div className="match-row"><i /><span>Compatibilité des critères</span><strong>À vérifier</strong></div>
          <div className="oneshot-local">DONNÉES LOCALES · EXEMPLE VISUEL</div>
        </div>
      </div>
      <p className="visual-disclaimer">Illustration éditoriale · aucune candidature ni donnée personnelle</p>
    </div>
  );
}

export default function Experience() {
  return (
    <>
      <section className="story-hero" id="top">
        <div className="story-hero-copy">
          <p className="eyebrow"><span className="live-dot" /> INGÉNIEUR IA · RECHERCHE · DÉVELOPPEMENT PRODUIT</p>
          <h1>
            Les idées<br />
            <span>prennent</span><br />
            <em>forme.</em>
          </h1>
          <p className="story-hero-lead">
            J’explore comment relier mémoire, intelligence et outils — puis je
            construis des systèmes qu’on peut parcourir, comprendre et éprouver.
          </p>
            <a className="button primary" href="#story-myriaz">
            Entrer dans le système <span>↓</span>
          </a>
          <div className="hero-signal"><span>01—05</span><i /><span>UNE RECHERCHE, CINQ RÉCITS</span></div>
        </div>
        <div className="story-hero-map">
          <div className="map-float map-float-left"><span>QUESTION</span><b>Comment relier<br />ce qui compte ?</b></div>
          <ForceConstellation />
          <div className="map-float map-float-right"><span>APPROCHE</span><b>Observer →<br />modéliser → tester</b></div>
        </div>
        <div className="story-scroll-cue"><span>FAITES DÉFILER POUR SUIVRE LE FIL</span><i /></div>
      </section>

      <nav className="story-rail" aria-label="Parcours des projets">
        <span className="rail-title">PARCOURS /</span>
        {stories.map((story) => (
          <a key={story.id} href={`#story-${story.id}`}>
            <i>{story.number}</i>{story.title}<span>↘</span>
          </a>
        ))}
      </nav>

      <div className="story-chapters">
        {stories.map((story) => (
          <section
            className={`story-chapter theme-${story.theme}`}
            id={`story-${story.id}`}
            key={story.id}
          >
            <div className="story-index"><span>{story.number}</span><i /></div>
            <div className="story-copy">
              <p className="eyebrow">{story.tag}</p>
              <h2>{story.title}</h2>
              <p className="story-subtitle">{story.subtitle}</p>
              <div className="story-question"><span>LA QUESTION</span><p>{story.question}</p></div>
              <p className="story-narrative">{story.narrative}</p>
              <div className="story-decision"><span>LE CHOIX DE CONCEPTION</span><p>{story.decision}</p></div>
              <div className="story-tags">
                {story.stack.map((tool) => <span key={tool}>{tool}</span>)}
              </div>
              <p className="story-proof"><b>ÉTAT & PREUVES</b>{story.proof}</p>
              <div className="story-actions">
                <a className="text-link" href={`/contact?projet=${encodeURIComponent(story.title)}`}>
                  Demander le détail du projet <span>↗</span>
                </a>
        {"demo" in story && story.demo && <a className="story-repo" href={story.demo} target="_blank" rel="noreferrer">Voir la démo ↗</a>}
                {story.repo && <a className="story-repo" href={story.repo} target="_blank" rel="noreferrer">Code source public ↗</a>}
              </div>
            </div>
            <div className="story-art-column">
              <div className="story-art-frame">
                <StoryVisual kind={story.visual} />
              </div>
              <p className="story-art-caption"><span>{story.number} / FIG.</span>{story.visualLabel}</p>
            </div>
          </section>
        ))}
      </div>

      <section className="other-projects" id="autres-projets">
        <div>
          <p className="eyebrow">LE RESTE DE L’ATELIER</p>
          <h2>Chaque piste<br /><em>laisse une trace.</em></h2>
        </div>
        <p>Applications, agents locaux, outils de données et prototypes : le catalogue rassemble les autres expériences et précise, pour chacune, ce qui a été construit et vérifié.</p>
        <a className="button primary" href="/realisations">Autres projets <span>↗</span></a>
      </section>
    </>
  );
}
