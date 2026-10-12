import { notFound } from "next/navigation";
import type { Metadata } from "next";
import CaseStudy from "../../../components/story/case-study";
import "../../../components/story/story.css";
import { getStory, stories } from "../../../lib/stories";

export function generateStaticParams() {
  return stories.map((story) => ({ slug: story.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const story = getStory(slug);
  return {
    title: story ? `${story.name} · Étude de cas` : "Projet introuvable",
    description: story ? `${story.tagline} ${story.problem.body}` : undefined,
  };
}

export default async function Page({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const index = stories.findIndex((s) => s.slug === slug);
  if (index < 0) notFound();
  const pick = (i: number) => {
    const s = stories[i];
    return s ? { slug: s.slug, name: s.name, number: s.number } : null;
  };
  return (
    <main className="vx-main">
      <CaseStudy story={stories[index]} prev={pick(index - 1)} next={pick(index + 1)} />
    </main>
  );
}
