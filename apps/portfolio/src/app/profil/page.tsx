export const metadata = {
  title: "Profil",
  description: "Naoufal Ou, profil Growth Marketing, Data et automatisation IA.",
};

const skills = [
  ["Business development", "Prospection B2B, découverte, qualification, suivi CRM et négociation."],
  ["Marketing & acquisition", "Stratégies outbound, parcours clients, campagnes multicanales et growth."],
  ["Data & IA", "Collecte, nettoyage, analyse et restitution de données pour décider plus vite."],
  ["Automatisation", "Agents, workflows et outils sur mesure pour simplifier les opérations."],
];

export default function ProfilePage() {
  return (
    <main className="section profile-page">
      <p className="eyebrow">PROFIL / INTÉRIM IT & INGÉNIERIE DIGITALE</p>
      <h1>Naoufal Ou.<br /><em>Business & technologie.</em></h1>
      <p className="page-lead">Entrepreneur et développeur IA, je relie compréhension métier, développement commercial et outils numériques pour qualifier des besoins IT et faire avancer des projets digitaux concrets.</p>
      <div className="profile-intro">
        <div><p className="eyebrow">POSITIONNEMENT</p><p>Mon parcours combine développement commercial, gestion de projets digitaux, growth marketing, analyse de données et construction d’automatisations. Cette double lecture me permet de comprendre un besoin, d’évaluer une solution et de parler avec des interlocuteurs métier comme techniques.</p></div>
        <div><p className="eyebrow">POUR LE PÔLE INTÉRIM IT</p><p>Je peux contribuer à la conquête, à la qualification des besoins clients, au suivi de missions et à l’identification de profils IT, digitaux et data grâce à une compréhension concrète de leurs environnements.</p><a className="button primary" href="/contact">Échanger sur une opportunité ↗</a></div>
      </div>
      <div className="profile-skills">{skills.map(([title, detail], index) => <article key={title}><span>0{index + 1} /</span><h2>{title}</h2><p>{detail}</p></article>)}</div>
      <div className="profile-links"><p className="eyebrow">LIENS PROFESSIONNELS</p><a href="https://www.linkedin.com/in/naoufal-ou-14a071150" target="_blank" rel="noreferrer">LinkedIn ↗</a><a href="https://github.com/Naoufalou" target="_blank" rel="noreferrer">GitHub ↗</a><a href="mailto:naoufal.ou7@gmail.com">naoufal.ou7@gmail.com ↗</a></div>
    </main>
  );
}
