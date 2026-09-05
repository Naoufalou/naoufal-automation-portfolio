import projects from "../../../../content/projects.json";
export default function sitemap() {
  return [
    "",
    "/realisations",
    "/contact",
    ...projects.map((p) => "/realisations/" + p.slug),
  ].map((path) => ({
    url: "https://naoufal-automation-portfolio.vercel.app" + path,
  }));
}
