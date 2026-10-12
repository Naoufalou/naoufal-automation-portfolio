import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { GalleryFigure } from "../../../components/story-visual";
import { stories } from "../../../lib/stories";

export function generateStaticParams() {
  return stories.map((story) => ({ slug: story.id }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const story = stories.find((item) => item.id === slug);
  return {
    title: story ? `${story.title} · Récit de projet` : "Projet introuvable",
    description: story?.problem,
  };
}

export default async function Page({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const story = stories.find((item) => item.id === slug);
  if (!story) notFound();

  const index = stories.indexOf(story);
  const next = stories[(index + 1) % stories.length];

  return (
    <main className="section story-detail">
      <nav className="detail-breadcrumb" aria-label="Fil du parcours">
        <a href="/">Accueil</a>
        <span>/</span>
        <a href="/realisations">Réalisations</a>
        <span>/</span>
        <b>{story.title}</b>
      </nav>

      <p className="eyebrow detail-eyebrow">
        CHAPITRE {story.number} · {story.tag}
      </p>
      <h1>{story.title}</h1>
      <p className="story-subtitle">{story.subtitle}</p>

      <div className="detail-actions">
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
          <span className="status">
            Destination publique en attente de validation
          </span>
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
      </div>

      {story.destinationNote && !story.destination && (
        <p className="story-open-question">
          <b>Lien non vérifié — non affiché.</b> {story.destinationNote}
        </p>
      )}

      <div className="story-detail-body">
        <section>
          <p className="eyebrow">LE PROBLÈME</p>
          <p className="story-narrative">{story.problem}</p>
          <p className="eyebrow">LA RECHERCHE</p>
          <p className="story-narrative">{story.research}</p>
          <p className="eyebrow">LE CHOIX DE CONCEPTION</p>
          <p className="story-narrative">{story.decision}</p>
        </section>
        <section>
          <p className="eyebrow">RÉSULTAT & LIMITES</p>
          <p className="story-narrative">{story.proof}</p>
          <p className="story-narrative">{story.limits}</p>
          <div className="tags">
            {story.stack.map((tool) => (
              <span key={tool}>{tool}</span>
            ))}
          </div>
        </section>
      </div>

      <section className="process-section">
        <div className="section-heading">
          <div>
            <p className="eyebrow">ÉTAPES / {story.build.length}</p>
            <h2>
              La réalisation,
              <br />
              <em>étape par étape.</em>
            </h2>
          </div>
        </div>
        <ol className="process-steps">
          {story.build.map((step, stepIndex) => (
            <li key={step.title}>
              <span className="process-index">
                {String(stepIndex + 1).padStart(2, "0")}
              </span>
              <div>
                <h3>{step.title}</h3>
                <p>{step.detail}</p>
              </div>
              <span className="process-state">{step.state}</span>
            </li>
          ))}
        </ol>
      </section>

      {story.gallery.length > 0 && (
        <section className="process-section">
          <div className="section-heading">
            <div>
              <p className="eyebrow">PREUVES VISUELLES</p>
              <h2>
                Ce que l’on voit
                <br />
                <em>et d’où ça vient.</em>
              </h2>
            </div>
            <p className="process-note">
              Chaque visuel est légendé selon sa nature : capture réelle,
              maquette, schéma ou illustration.
            </p>
          </div>
          <div className="proof-grid proof-grid-detail">
            {story.gallery.map((item, galleryIndex) => (
              <GalleryFigure
                key={item.src}
                item={item}
                priority={galleryIndex === 0}
              />
            ))}
          </div>
        </section>
      )}

      {story.openQuestion && (
        <p className="story-open-question">
          <b>Reste à faire.</b> {story.openQuestion}
        </p>
      )}

      <div className="project-cta">
        <h2>Prochain chapitre : {next.title}</h2>
        <a className="button primary" href={`/projets/${next.id}`}>
          Continuer le parcours <span>↗</span>
        </a>
      </div>
    </main>
  );
}
