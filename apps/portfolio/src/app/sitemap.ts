import { projects } from "../lib/projects";
import { stories } from "../lib/stories";
export default function sitemap() {
  return [
    "",
    "/realisations",
    "/profil",
    "/contact",
    ...stories.map((story) => "/projets/" + story.id),
    ...projects.map((p) => "/realisations/" + p.slug),
  ].map((path) => ({
    url: "https://naoufal-automation-portfolio.vercel.app" + path,
  }));
}
