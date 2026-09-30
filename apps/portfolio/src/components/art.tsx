import { projects } from "../lib/projects";

export default function Art({
  id,
  large = false,
}: {
  id: string;
  large?: boolean;
}) {
  const project = projects.find((item) => item.id === id);
  const kind =
    id === "A01"
      ? "agent"
      : id === "A03"
        ? "hazi"
        : id === "A05"
          ? "chaka"
          : id === "A10"
            ? "vision"
            : id === "A26"
              ? "sales"
              : id === "A27"
                ? "mobility"
                : id === "A28"
                  ? "boutique"
                  : id === "A29"
                    ? "voice"
                    : id === "A30"
                      ? "tower"
                      : id === "A31"
                        ? "pixel"
                        : id.startsWith("L")
                          ? "web"
                          : id.startsWith("P")
                            ? "workflow"
                            : "system";
  return (
    <div
      role="img"
      aria-label={`Visuel illustratif du projet ${project?.name ?? id}`}
      className={`art art-${kind} ${large ? "art-large" : ""}`}
    >
      <div className="art-grid" />
      {kind === "agent" ? (
        <div className="orbital">
          <div className="orbit o1" />
          <div className="orbit o2" />
          <div className="orbit o3" />
          <div className="core">
            N<span>agent os</span>
          </div>
          <b className="sat s1">Mémoire</b>
          <b className="sat s2">Voix</b>
          <b className="sat s3">Outils</b>
        </div>
      ) : kind === "hazi" ? (
        <div className="mock-window">
          <div className="window-top">
            ● ● ● <span>HAZI / WORKSPACE</span>
          </div>
          <div className="mock-sidebar">
            H.
            <br />
            <i />
            <i />
            <i />
          </div>
          <div className="mock-content">
            <small>CAMPAGNES</small>
            <h3>
              Le bon message.
              <br />
              Au bon contact.
            </h3>
            <div className="bubble">Bonjour {"{{prénom}}"} 👋</div>
            <div className="mock-line" />
            <div className="mock-line short" />
          </div>
        </div>
      ) : kind === "chaka" ? (
        <div className="chaka">
          <small>CHAKA / LIVE OS</small>
          <h3>
            Le live,
            <br />
            <em>en perspective.</em>
          </h3>
          <div className="bars">
            {[25, 45, 36, 60, 50, 80, 65, 92, 76, 100].map((h, i) => (
              <i key={i} style={{ height: h + "%" }} />
            ))}
          </div>
        </div>
      ) : kind === "vision" ? (
        <div className="vision">
          <span className="zone z1">ZONE A</span>
          <span className="zone z2">ZONE B</span>
          <div className="person p1" />
          <div className="person p2" />
          <small>SHOPTRACKER / VISION</small>
        </div>
      ) : kind === "sales" ? (
        <div className="product-screen sales-screen">
          <div className="screen-top">
            <span>PIXELCREATE / SALES OS</span>
            <b>01 — 03</b>
          </div>
          <h3>
            Les demandes avancent.
            <br />
            <em>Les opportunités aussi.</em>
          </h3>
          <div className="sales-lanes">
            <div>
              <small>LEAD RESPONDER</small>
              <strong>Répondre</strong>
              <i>Demande entrante</i>
            </div>
            <div>
              <small>AI INBOX</small>
              <strong>Qualifier</strong>
              <i>Priorité équipe</i>
            </div>
            <div>
              <small>FOLLOW-UP</small>
              <strong>Relancer</strong>
              <i>Prochaine action</i>
            </div>
          </div>
          <span className="mock-button">
            Parcours illustratif · prototype local
          </span>
        </div>
      ) : kind === "pixel" ? (
        <div className="product-screen pixel-screen">
          <div className="screen-top">
            <span>PIXEL / OPERATIONS</span>
            <b>CONCEPT DE TABLEAU</b>
          </div>
          <h3>
            Les agents avancent.
            <br />
            <em>Les décisions restent lisibles.</em>
          </h3>
          <div className="pixel-flow">
            <div>
              <small>RECHERCHE</small>
              <strong>Agent spécialisé</strong>
              <i>Travail borné</i>
            </div>
            <b>→</b>
            <div>
              <small>REGISTRE</small>
              <strong>État traçable</strong>
              <i>Source SQLite</i>
            </div>
            <b>→</b>
            <div>
              <small>VALIDATION</small>
              <strong>Décision humaine</strong>
              <i>Étape autorisée</i>
            </div>
          </div>
          <span className="mock-button">
            Illustration du modèle · pas une capture du produit
          </span>
        </div>
      ) : kind === "mobility" ? (
        <div className="product-screen mobility-screen">
          <div className="screen-top">
            <span>BOUCHON / MOBILITÉ PARTAGÉE</span>
            <b>EXEMPLE WEB</b>
          </div>
          <div className="mobility-layout">
            <div className="map-drawing">
              <i />
              <i />
              <i />
              <b>VÉHICULE</b>
            </div>
            <div className="vehicle-card">
              <small>VOTRE TRAJET</small>
              <h3>
                Partager.
                <br />
                <em>Réserver.</em>
              </h3>
              <span>Dates · disponibilité · demande</span>
            </div>
          </div>
          <p>Visuel de synthèse · validation native en attente</p>
        </div>
      ) : kind === "boutique" ? (
        <div className="product-screen boutique-screen">
          <div className="screen-top">
            <span>LAMAJ / SÉLECTION</span>
            <b>03 PIÈCES</b>
          </div>
          <h3>
            La mode,
            <br />
            <em>en mouvement.</em>
          </h3>
          <div className="product-tiles">
            <div>
              <i />
              Veste Ligne
            </div>
            <div>
              <i />
              Maille Sienne
            </div>
            <div>
              <i />
              Sac Éclipse
            </div>
          </div>
          <span className="mock-button">Boutique et réservation</span>
        </div>
      ) : kind === "voice" ? (
        <div className="product-screen voice-screen">
          <div className="screen-top">
            <span>ASTRALIVE / NAVIR</span>
            <b>LOCAL VOICE</b>
          </div>
          <div className="voice-orb">
            <i />
            <i />
            <i />
          </div>
          <h3>Écouter · comprendre · répondre</h3>
          <div className="voice-wave">
            {[
              18, 35, 62, 43, 88, 54, 28, 73, 48, 95, 38, 66, 26, 57, 79, 34,
              61,
            ].map((height, index) => (
              <i key={index} style={{ height: `${height}%` }} />
            ))}
          </div>
          <p>Prototype vocal local · latence en cours d’optimisation</p>
        </div>
      ) : kind === "tower" ? (
        <div className="product-screen tower-screen">
          <div className="screen-top">
            <span>N.A.VIRE / CONTROL TOWER</span>
            <b>CONCEPT UX</b>
          </div>
          <div className="tower-layout">
            <div className="tower-nav">
              WORLD
              <br />
              PROJECTS
              <br />
              AGENTS
              <br />
              ACTIVITY
            </div>
            <div className="tower-map">
              <i />
              <i />
              <i />
              <b>HUB</b>
              <span>RUN</span>
            </div>
            <div className="tower-events">
              <small>ÉVÉNEMENTS</small>
              <p>Task · status · approval</p>
              <p>État fourni par le backend</p>
              <p>Concept, pas une app live</p>
            </div>
          </div>
        </div>
      ) : kind === "web" ? (
        <div className="web-mock">
          <div>
            STUDIO / DIGITAL EXPERIENCE <span>↗</span>
          </div>
          <h3>{project?.name ?? "Une présence qui compte."}</h3>
          <span className="mock-button">Découvrir →</span>
          <p>{project?.description}</p>
          <div className="web-circle" />
        </div>
      ) : (
        <div className={`system-board board-${id.toLowerCase()}`}>
          <div className="screen-top">
            <span>
              {project?.category?.toUpperCase()} / {id}
            </span>
            <b>{id.startsWith("P") ? "WORKFLOW" : "SYSTÈME"}</b>
          </div>
          <h3>{project?.name ?? id}</h3>
          <p>{project?.description}</p>
          <div className="system-nodes">
            {(project?.features?.length
              ? project.features.slice(0, 3)
              : [
                  project?.stack ?? "Source identifiée",
                  "Périmètre à qualifier",
                  "Validation à prévoir",
                ]
            ).map((feature, index) => (
              <div key={index}>
                <span>0{index + 1}</span>
                <i />
                {feature}
              </div>
            ))}
          </div>
        </div>
      )}
      <span className="art-caption">
        Visuel de synthèse · illustration, pas une capture · {id}
      </span>
    </div>
  );
}
