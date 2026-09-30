import { projects } from "../lib/projects";
export default function sitemap() {
  return [
    "",
    "/realisations",
    "/profil",
    "/contact",
    ...projects.map((p) => "/realisations/" + p.slug),
  ].map((path) => ({
    url: "https://naoufal-automation-portfolio.vercel.app" + path,
  }));
}
