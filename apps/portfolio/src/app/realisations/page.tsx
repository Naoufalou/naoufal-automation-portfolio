import Catalog from "../../components/catalog";
export const metadata = { title: "Réalisations" };
export default function Page() {
  return (
    <main className="section catalog-page">
      <p className="eyebrow">
        LE CATALOGUE / APPLICATIONS, AUTOMATISATIONS & EXPÉRIMENTATIONS
      </p>
      <h1>
        Du besoin
        <br />
        <em>au produit.</em>
      </h1>
      <p className="page-lead">
        Une collection de projets web, desktop, mobile et IA. Chaque fiche
        distingue le travail identifié, les démonstrateurs et les sites
        accessibles.
      </p>
      <Catalog />
    </main>
  );
}
