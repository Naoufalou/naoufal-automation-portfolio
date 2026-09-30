import source from "../../../../content/projects.json";

export type ProjectStep = {
  title: string;
  detail: string;
  state: string;
};

export type ProjectVisual = {
  src: string;
  alt: string;
  caption: string;
  kind?: "capture" | "concept" | "architecture";
};

export type Project = {
  id: string;
  name: string;
  description: string;
  stack: string;
  slug: string;
  category: string;
  featured: boolean;
  demo: string;
  source: string;
  status: string;
  need: string;
  features: string[];
  value: string;
  steps: ProjectStep[];
  gallery: ProjectVisual[];
};

export const projects = source as Project[];
