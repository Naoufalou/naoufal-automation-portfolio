import { notFound } from "next/navigation";
import projects from "../../../../../../content/projects.json";
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
            Les visuels sont des compositions illustratives.
          </p>
        </section>
      </div>
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
