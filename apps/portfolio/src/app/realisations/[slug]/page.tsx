import { notFound } from "next/navigation";
import Image from "next/image";
import { projects } from "../../../lib/projects";
import Art from "../../../components/art";
export function generateStaticParams() {
  return projects.map((p) => ({ slug: p.slug }));
}
export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const p = projects.find((p) => p.slug === slug);
  return {
    title: p?.name || "Projet introuvable",
    description: p?.description,
  };
}
export default async function Page({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const p = projects.find((p) => p.slug === slug);
  if (!p) notFound();
  return (
    <main className="section detail">
      <a className="text-link" href="/realisations">
        ← Toutes les réalisations
      </a>
      <p className="eyebrow detail-eyebrow">
        {p.category} / {p.id}
      </p>
      <h1>{p.name}</h1>
      <p className="page-lead">{p.description}</p>
      <div className="detail-actions">
        {p.demo && (
          <a
            className="button primary"
            href={p.demo}
            target="_blank"
            rel="noreferrer"
          >
            Voir le site ↗
          </a>
        )}
        {p.source && (
          <a
            className="button primary"
            href={p.source}
            target="_blank"
            rel="noreferrer"
          >
            Explorer le code ↗
          </a>
        )}
        <span className="status">{p.status}</span>
      </div>
      <Art id={p.id} large />
      {p.gallery.length > 0 && (
        <div className="project-gallery" aria-label="Visuels du concept">
          {p.gallery.map((image) => (
            <figure key={image.src}>
              <div className="gallery-frame">
                <Image
                  src={image.src}
                  alt={image.alt}
                  fill
                  sizes="(max-width: 700px) 92vw, 45vw"
                  style={{ objectFit: "contain" }}
                />
              </div>
              <figcaption>
                <span>{image.caption}</span>
                <small>
                  {image.kind === "capture"
                    ? "Capture de démonstration · données et positions simulées"
                    : image.kind === "architecture"
                      ? "Schéma de synthèse · architecture"
                      : "Planche de conception · concept, pas capture d’une application live"}
                </small>
              </figcaption>
            </figure>
          ))}
        </div>
      )}
      <div className="detail-grid">
        <section>
          <p className="eyebrow">LE PROJET</p>
          <h2>
            Une réalisation,
            <br />
            <em>un usage concret.</em>
          </h2>
          <p>{p.need || p.description}</p>
          {p.features.length > 0 && (
            <ul className="feature-list">
              {p.features.map((feature) => (
                <li key={feature}>{feature}</li>
              ))}
            </ul>
          )}
          {p.value && <p>{p.value}</p>}
          {p.id === "A11" && (
            <p>
              AirMouse s’appuie sur une base open source externe de V-Gutierrez,
              avec adaptations locales. L’ensemble n’est pas présenté comme une
              création originale.
            </p>
          )}
        </section>
        <section>
          <p className="eyebrow">TECHNOLOGIES IDENTIFIÉES</p>
          <div className="tags">
            {p.stack.split(/,|;/).map((s) => (
              <span key={s}>{s.trim()}</span>
            ))}
          </div>
          <p className="eyebrow detail-eyebrow">PÉRIMÈTRE DE LA PRÉSENTATION</p>
          <p className="muted">
            {p.demo
              ? "Le site public était accessible lors de la vérification du 5 septembre 2026. Cela ne constitue pas un test complet de ses parcours métier."
              : p.source
                ? "Le code ou le document de démonstration est consultable sur GitHub. Les intégrations externes nécessitent leur propre configuration."
                : p.status === "En exploration"
                  ? "Projet identifié dans les environnements de travail. Son périmètre détaillé reste à qualifier."
                  : "La présentation décrit les composants identifiés dans le code. Le fonctionnement complet en production n’a pas été retesté dans le cadre de ce portfolio."}{" "}
            La galerie distingue captures de démonstration, concepts et schémas.
          </p>
        </section>
      </div>
      <section className="process-section">
        <div className="section-heading">
          <div>
            <p className="eyebrow">MÉTHODE / {p.steps.length} ÉTAPES</p>
            <h2>
              Du besoin
              <br />
              <em>à la validation.</em>
            </h2>
          </div>
          <p className="process-note">
            Les statuts distinguent ce qui est documenté de ce qui reste à
            vérifier, connecter ou qualifier.
          </p>
        </div>
        <ol className="process-steps">
          {p.steps.map((step, index) => (
            <li key={`${step.title}-${index}`}>
              <span className="process-index">
                {String(index + 1).padStart(2, "0")}
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
      <div className="project-cta">
        <h2>Un besoin similaire ?</h2>
        <a
          className="button primary"
          href={"/contact?projet=" + encodeURIComponent(p.name)}
        >
          Discutons de votre projet ↗
        </a>
      </div>
    </main>
  );
}
