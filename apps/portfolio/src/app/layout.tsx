import type { Metadata } from "next";
import "@fontsource/dm-sans/400.css";
import "@fontsource/dm-sans/500.css";
import "@fontsource/dm-sans/600.css";
import "@fontsource/dm-sans/700.css";
import "@fontsource/instrument-serif/400-italic.css";
import "./globals.css";
export const metadata: Metadata = {
  metadataBase: new URL("https://naoufal-automation-portfolio.vercel.app"),
  title: {
    default: "Naoufal Ou — Développeur IA & entrepreneur",
    template: "%s · Naoufal Ou",
  },
  description:
    "Applications métier, agents IA et automatisations. Du besoin opérationnel au produit concret, avec Naoufal Ou.",
  openGraph: { locale: "fr_FR", type: "website" },
};
export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="fr">
      <body>
        <header className="nav">
          <a className="brand" href="/">
            naoufal<span>®</span>
          </a>
          <nav>
            <a href="/realisations">Réalisations</a>
            <a href="/#approche">Approche</a>
            <a className="nav-cta" href="/contact">
              Parlons projet <span>↗</span>
            </a>
          </nav>
        </header>
        {children}
        <footer>
          <a className="brand" href="/">
            naoufal<span>®</span>
          </a>
          <p>Développeur IA. Entrepreneur. Créateur de produits.</p>
          <div>
            <a
              href="https://github.com/Naoufalou"
              target="_blank"
              rel="noreferrer"
            >
              GitHub ↗
            </a>
            <a
              href="https://www.linkedin.com/in/naoufal-ou-14a071150"
              target="_blank"
              rel="noreferrer"
            >
              LinkedIn ↗
            </a>
            <a href="mailto:naoufal.ou7@gmail.com">Email ↗</a>
          </div>
          <small>
            © {new Date().getFullYear()} Naoufal Ou · Conçu avec Next.js
          </small>
        </footer>
      </body>
    </html>
  );
}
