"use client";

import OrbitalCore from "./orbital-core";
import { StoryVisual } from "./story-visual";
import { stories } from "../lib/stories";

function ChapterDestination({ slug }: { slug: string }) {
  const story = stories.find((item) => item.id === slug);
  if (!story) return null;
  return (
    <div className="story-destination">
      {story.destination ? (
        <a
          className="button primary"
          href={story.destination.url}
          target="_blank"
          rel="noreferrer"
        >
          {story.destination.label} <span>↗</span>
        </a>
      ) : (
        <p className="destination-pending">
          <b>Destination en attente de validation.</b>{" "}
          {story.destinationNote ?? "Aucune destination publique confirmée."}
        </p>
      )}
      {story.source && (
        <a
          className="text-link"
          href={story.source.url}
          target="_blank"
          rel="noreferrer"
        >
          {story.source.label} <span>↗</span>
        </a>
      )}
      {story.openQuestion && (
        <p className="story-open-question">
          <b>À valider.</b> {story.openQuestion}
        </p>
      )}
    </div>
  );
}

export default function Experience() {
  return (
    <>
      <section className="story-hero" id="top">
        <div className="story-hero-copy">
          <p className="eyebrow">
            <span className="live-dot" /> INGÉNIEUR IA · RECHERCHE APPLIQUÉE ·
            DÉVELOPPEMENT PRODUIT
          </p>
          <h1>
            Les idées
            <br />
            <span>prennent</span>
            <br />
            <em>forme.</em>
          </h1>
          <p className="story-hero-lead">
            Cinq projets, un seul fil : le problème, le choix, la construction,
            puis ce qui est réellement vérifié.
          </p>
          <a className="button primary" href="#story-qwerty-myriaz">
            Entrer dans le récit <span>↓</span>
          </a>
          <div className="hero-signal">
            <span>01—05</span>
            <i />
            <span>CINQ RÉCITS DOCUMENTÉS</span>
          </div>
        </div>
        <div className="story-hero-map">
          <div className="map-float map-float-left">
            <span>LA CONSTELLATION</span>
            <b>
              Un cœur,
              <br />
              des anneaux de temps.
            </b>
          </div>
          <OrbitalCore />
          <div className="map-float map-float-right">
            <span>LA RÈGLE</span>
            <b>
              Ce qui est prouvé
              <br />
              est affiché.
            </b>
          </div>
        </div>
        <div className="story-scroll-cue">
          <span>FAITES DÉFILER POUR SUIVRE LE FIL</span>
          <i />
        </div>
      </section>

      <nav className="story-rail" aria-label="Parcours des projets">
        <span className="rail-title">PARCOURS /</span>
        {stories.map((story) => (
          <a key={story.id} href={`#story-${story.id}`}>
            <i>{story.number}</i>
            {story.title}
            <span>↘</span>
          </a>
        ))}
        <a href="/realisations">
          Autres projets <span>↗</span>
        </a>
      </nav>

      <div className="story-chapters">
        {stories.map((story) => (
          <section
            className={`story-chapter theme-${story.theme}`}
            id={`story-${story.id}`}
            key={story.id}
          >
            <div className="story-index">
              <span>{story.number}</span>
              <i />
            </div>
            <div className="story-copy">
              <p className="eyebrow">{story.tag}</p>
              <h2>{story.title}</h2>
              <p className="story-subtitle">{story.subtitle}</p>
              <div className="story-question">
                <span>LE PROBLÈME</span>
                <p>{story.problem}</p>
              </div>
              <div className="story-decision">
                <span>LA RECHERCHE</span>
                <p>{story.research}</p>
              </div>
              <div className="story-decision">
                <span>LE CHOIX DE CONCEPTION</span>
                <p>{story.decision}</p>
              </div>
              <div className="story-build">
                <span>LES ÉTAPES DE RÉALISATION</span>
                <ol>
                  {story.build.map((step, index) => (
                    <li key={step.title}>
                      <b>
                        {String(index + 1).padStart(2, "0")} · {step.title}
                      </b>
                      <p>{step.detail}</p>
                      <i>{step.state}</i>
                    </li>
                  ))}
                </ol>
              </div>
              <p className="story-proof">
                <b>PREUVES</b>
                {story.proof}
              </p>
              <p className="story-limits">
                <b>RÉSULTAT & LIMITES</b>
                {story.limits}
              </p>
              <div className="story-tags">
                {story.stack.map((tool) => (
                  <span key={tool}>{tool}</span>
                ))}
              </div>
              <ChapterDestination slug={story.id} />
              <a
                className="story-detail-link"
                href={`/projets/${story.id}`}
                aria-label={`Ouvrir la page détaillée du projet ${story.title}`}
              >
                Lire le chapitre complet <span>↗</span>
              </a>
            </div>
            <div className="story-art-column">
              <div className="story-art-frame">
                <StoryVisual story={story} />
              </div>
              <p className="story-art-caption">
                <span>{story.number} / FIG.</span>
                {story.visualLabel}
              </p>
            </div>
          </section>
        ))}
      </div>

      <section className="horizon-passage" aria-label="Séquence panoramique">
        <div className="horizon-track">
          {stories.map((story) => (
            <a
              className="horizon-panel"
              href={`#story-${story.id}`}
              key={`horizon-${story.id}`}
            >
              <span>{story.number}</span>
              <b>{story.title}</b>
              <small>{story.subtitle}</small>
              <i>Voir le chapitre ↘</i>
            </a>
          ))}
        </div>
        <p className="horizon-note">
          Séquence panoramique · chaque panneau mène au chapitre correspondant
        </p>
      </section>

      <section className="other-projects" id="autres-projets">
        <div>
          <p className="eyebrow">LE RESTE DE L’ATELIER</p>
          <h2>
            Chaque piste
            <br />
            <em>laisse une trace.</em>
          </h2>
        </div>
        <p>
          Applications, agents locaux, outils de données et prototypes : le
          catalogue rassemble les autres réalisations et précise, pour chacune,
          ce qui a été construit et ce qui reste à vérifier.
        </p>
        <a className="button primary" href="/realisations">
          Autres projets <span>↗</span>
        </a>
      </section>
    </>
  );
}
