import Experience from "../components/experience";

export default function Home() {
  return (
    <main className="experience-page">
      <Experience />

      <section className="section about" id="approche">
        <div>
          <p className="eyebrow">UNE MÉTHODE, DU LABORATOIRE AU PRODUIT</p>
          <h2>
            Une approche de recherche.
            <br />
            <em>Les mains dans le code.</em>
          </h2>
        </div>
        <div>
          <p className="about-intro">
            Je pars d’un usage ou d’une question concrète, j’explore les
            contraintes, puis je construis un système dont on peut examiner
            l’architecture, les comportements et les limites.
          </p>
          <ol className="process">
            <li>
              <b>Cadrer le vrai besoin</b>
              <span>Nommer le problème et les preuves attendues.</span>
            </li>
            <li>
              <b>Prototyper le système</b>
              <span>Relier données, modèles, outils et interfaces.</span>
            </li>
            <li>
              <b>Vérifier, livrer, apprendre</b>
              <span>Documenter ce qui marche et ce qui reste à tester.</span>
            </li>
          </ol>
        </div>
      </section>

      <section className="contact-banner">
        <p className="eyebrow">INGÉNIERIE IA · PRODUIT · RECHERCHE APPLIQUÉE</p>
        <h2>
          Une idée à mettre
          <br />
          <em>à l’épreuve ?</em>
        </h2>
        <a className="button primary" href="/contact">
          Parlons du prochain système <span>↗</span>
        </a>
      </section>
    </main>
  );
}
