import Catalog from "../../components/catalog";
export const metadata = { title: "Réalisations" };
export default function Page() {
  return (
    <main className="section catalog-page">
      <p className="eyebrow">
        PROJETS / RECHERCHE APPLIQUÉE · INGÉNIERIE · PRODUITS
      </p>
      <h1>
        Explorer,
        <br />
        <em>construire, vérifier.</em>
      </h1>
      <p className="page-lead">
        Des systèmes agentiques, des expériences d’IA locale, des applications
        et des outils de données. Chaque fiche sépare l’architecture, les étapes
        construites, les visuels de projet et les validations encore ouvertes.
      </p>
      <Catalog />
    </main>
  );
}
