import Contact from "../../components/contact";
export const metadata = { title: "Parlons de votre projet" };
export default function Page() {
  return (
    <main className="section contact-page">
      <p className="eyebrow">PREMIER CONTACT / SANS DÉTOUR</p>
      <h1>
        Une idée en tête ?<br />
        <em>Parlons-en.</em>
      </h1>
      <div className="contact-grid">
        <div>
          <p className="page-lead">
            Un processus à automatiser, une application à créer ou une offre à
            mettre en ligne. Racontez-moi ce que vous voulez faire avancer.
          </p>
          <a className="email" href="mailto:naoufal.ou7@gmail.com">
            naoufal.ou7@gmail.com ↗
          </a>
          <p className="muted">
            Vous pouvez aussi me retrouver sur{" "}
            <a href="https://www.linkedin.com/in/naoufal-ou-14a071150">
              LinkedIn
            </a>
            .
          </p>
        </div>
        <Contact />
      </div>
    </main>
  );
}
