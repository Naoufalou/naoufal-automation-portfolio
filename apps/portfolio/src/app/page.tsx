import projects from "../../../../content/projects.json";
import { Card } from "../components/catalog";
import Art from "../components/art";
export default function Home() {
  return (
    <main>
      <section className="hero">
        <div className="hero-copy">
          <p className="eyebrow">
            <span className="live-dot" /> DÉVELOPPEUR IA & ENTREPRENEUR
          </p>
          <h1>
            Vos idées.
            <br />
            Du code.
            <br />
            <em>Du concret.</em>
          </h1>
          <p className="hero-description">
            Je conçois des applications et des agents IA pour transformer vos
            opérations en produits utiles.
          </p>
          <div className="hero-actions">
            <a className="button primary" href="/realisations">
              Explorer mes réalisations <span>↗</span>
            </a>
            <a className="text-link" href="/contact">
              Discuter de votre projet →
            </a>
          </div>
          <div className="hero-note">
            <span>01 / DE L’IDÉE AU PRODUIT</span>
            <span>IA · AUTOMATISATION · WEB</span>
          </div>
        </div>
        <div className="hero-visual">
          <Art id="A01" large />
          <div className="visual-label">
            <span>PROJET À LA UNE</span>
            <a href="/realisations/a01">na_agent / FounderOS ↗</a>
            <p>Un environnement pour orchestrer agents, outils et mémoire.</p>
          </div>
        </div>
      </section>
      <div className="stack-strip">
        <span>UNE STACK, AU SERVICE DU BESOIN</span>
        <strong>Python</strong>
        <strong>TypeScript</strong>
        <strong>React</strong>
        <strong>Next.js</strong>
        <strong>Supabase</strong>
        <strong>n8n</strong>
      </div>
      <section className="section" id="realisations">
        <div className="section-heading">
          <div>
            <p className="eyebrow">01 / SÉLECTION</p>
            <h2>
              Des idées devenues
              <br />
              <em>des réalisations.</em>
            </h2>
          </div>
          <a className="text-link" href="/realisations">
            Voir le catalogue complet ↗
          </a>
        </div>
        <div className="projects-grid">
          {["A01", "A03", "A05", "A10", "L03", "A12"].map((id) => (
            <Card key={id} p={projects.find((p) => p.id === id)!} />
          ))}
        </div>
      </section>
      <section className="section services" id="approche">
        <p className="eyebrow">02 / CE QUE NOUS POUVONS CONSTRUIRE</p>
        <h2>
          Moins de friction.
          <br />
          <em>Plus de possibilités.</em>
        </h2>
        <div className="service-grid">
          {[
            [
              "01",
              "Agents & automatisation",
              "Relier vos outils, structurer vos données et automatiser les tâches répétitives.",
              "Python / n8n / API / agents IA",
            ],
            [
              "02",
              "Applications & micro-SaaS",
              "Transformer un usage métier précis en une application web, desktop ou mobile.",
              "React / Next.js / Electron / Supabase",
            ],
            [
              "03",
              "Sites & acquisition",
              "Présenter votre offre et créer un parcours clair jusqu’à la prise de contact.",
              "Lovable / UI / parcours de conversion",
            ],
          ].map(([n, t, d, s]) => (
            <article key={n}>
              <span>{n} /</span>
              <h3>{t}</h3>
              <p>{d}</p>
              <small>{s}</small>
            </article>
          ))}
        </div>
      </section>
      <section className="section about">
        <div>
          <p className="eyebrow">03 / L’APPROCHE</p>
          <h2>
            Un regard business.
            <br />
            <em>Les mains dans le code.</em>
          </h2>
        </div>
        <div>
          <p className="about-intro">
            Je suis Naoufal, développeur IA et entrepreneur. Je pars d’un
            problème opérationnel pour construire une solution que l’on peut
            voir, utiliser et faire évoluer.
          </p>
          <ol className="process">
            <li>
              <b>Cadrer le vrai besoin</b>
              <span>Votre usage, vos contraintes et un périmètre clair.</span>
            </li>
            <li>
              <b>Construire une première version</b>
              <span>Un produit concret pour confronter l’idée au terrain.</span>
            </li>
            <li>
              <b>Vérifier, livrer, faire évoluer</b>
              <span>Du code structuré et des limites documentées.</span>
            </li>
          </ol>
        </div>
      </section>
      <section className="contact-banner">
        <p className="eyebrow">LE PROCHAIN PROJET POURRAIT ÊTRE LE VÔTRE.</p>
        <h2>
          On construit
          <br />
          <em>quelque chose ?</em>
        </h2>
        <a className="button primary" href="/contact">
          Parlons de votre besoin ↗
        </a>
      </section>
    </main>
  );
}
