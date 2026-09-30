"use client";
import { useState } from "react";
import Image from "next/image";
import { projects, type Project } from "../lib/projects";
import Art from "./art";
export function Card({ p }: { p: Project }) {
  const capture = p.gallery.find((visual) => visual.kind === "capture");
  return (
    <a className="project-card" href={"/realisations/" + p.slug}>
      {capture ? (
        <div className="project-card-capture">
          <Image
            src={capture.src}
            alt={capture.alt}
            fill
            sizes="(max-width: 700px) 92vw, (max-width: 1100px) 45vw, 30vw"
          />
          <span>Capture de la démo</span>
        </div>
      ) : (
        <Art id={p.id} />
      )}
      <div className="card-meta">
        <span>{p.category}</span>
        <span>↗</span>
      </div>
      <h3>{p.name}</h3>
      <p>{p.description}</p>
      <div className="card-bottom">
        <span className={"status " + (p.demo ? "online" : "")}>{p.status}</span>
        <span>{p.stack.split(",")[0].split(";")[0]}</span>
      </div>
      <div className="card-steps">
        Voir les étapes du projet <span>({p.steps.length})</span> →
      </div>
    </a>
  );
}
export default function Catalog() {
  const [q, setQ] = useState("");
  const [filter, setFilter] = useState("Tout");
  const filtered = projects.filter(
    (p) =>
      (filter === "Tout" || p.category === filter) &&
      (p.name + " " + p.stack + " " + p.description)
        .toLowerCase()
        .includes(q.toLowerCase()),
  );
  return (
    <>
      <div className="catalog-controls">
        <div className="filters">
          {[
            "Tout",
            "Applications & IA",
            "Automatisation",
            "Sites & acquisition",
          ].map((x) => (
            <button
              key={x}
              onClick={() => setFilter(x)}
              aria-pressed={filter === x}
            >
              {x}
            </button>
          ))}
        </div>
        <input
          aria-label="Rechercher une réalisation"
          placeholder="Chercher un projet, une technologie…"
          value={q}
          onChange={(e) => setQ(e.target.value)}
        />
      </div>
      <p className="result-count">
        {filtered.length} réalisation{filtered.length > 1 ? "s" : ""}
      </p>
      <div className="projects-grid">
        {filtered.map((p) => (
          <Card key={p.id} p={p} />
        ))}
      </div>
      {!filtered.length && (
        <p className="empty">Aucun projet trouvé. Essayez un autre mot-clé.</p>
      )}
    </>
  );
}
