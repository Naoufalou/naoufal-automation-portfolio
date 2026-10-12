"use client";

import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { SplitText } from "gsap/SplitText";
import { useLayoutEffect, useRef } from "react";
import { skills, type Story } from "../../lib/stories";
import MediaFrame from "./media-frame";
import VoxelField from "./voxel-field";

gsap.registerPlugin(ScrollTrigger, SplitText);

type Neighbor = { slug: string; name: string; number: string } | null;

export default function CaseStudy({ story, prev, next }: { story: Story; prev: Neighbor; next: Neighbor }) {
  const root = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    const el = root.current;
    if (!el || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const ctx = gsap.context(() => {
      const split = SplitText.create(".cs-hero h1", { type: "lines,words", mask: "lines" });
      gsap.from(split.words, { yPercent: 115, duration: 1.1, ease: "expo.out", stagger: 0.05 });
      gsap.from(".cs-hero [data-intro]", { y: 24, opacity: 0, duration: 0.9, stagger: 0.08, delay: 0.4, ease: "power3.out" });
      gsap.to(".cs-hero-num", {
        yPercent: 40,
        ease: "none",
        scrollTrigger: { trigger: ".cs-hero", start: "top top", end: "bottom top", scrub: true },
      });
      ScrollTrigger.batch(el.querySelectorAll("[data-reveal]"), {
        start: "top 86%",
        onEnter: (batch) => gsap.from(batch, { y: 50, opacity: 0, stagger: 0.08, duration: 0.9, ease: "power3.out" }),
      });
      gsap.from(".cs-timeline-line", {
        scaleY: 0,
        ease: "none",
        scrollTrigger: { trigger: ".cs-timeline", start: "top 70%", end: "bottom 60%", scrub: true },
      });
      ScrollTrigger.create({
        start: 0,
        end: "max",
        onUpdate: (self) => gsap.set(".vx-progress i", { scaleX: self.progress }),
      });
    }, el);
    return () => ctx.revert();
  }, []);

  const skillLabels = skills.filter((sk) => story.skills.includes(sk.id)).map((sk) => sk.label);

  return (
    <div className="cs-page" ref={root} style={{ "--accent": story.accent, "--story-accent": story.accent } as React.CSSProperties}>
      <VoxelField formation={story.formation} accent={story.accent} />
      <div className="vx-progress" aria-hidden="true">
        <i />
      </div>

      <header className="cs-hero">
        <span className="cs-hero-num" aria-hidden="true">{story.number}</span>
        <a className="cs-back" href={`/#chapitre-${story.slug}`} data-intro>
          ← Retour au récit
        </a>
        <p className="vx-kicker" data-intro>
          Étude de cas {story.number} · {story.kicker}
        </p>
        <h1>{story.name}</h1>
        <p className="vx-tagline" data-intro>
          {story.tagline}
        </p>
        <dl className="cs-facts" data-intro>
          <div>
            <dt>Rôle</dt>
            <dd>{story.role}</dd>
          </div>
          <div>
            <dt>Compétences</dt>
            <dd>{skillLabels.join(" · ")}</dd>
          </div>
          <div>
            <dt>Destination</dt>
            <dd>
              {story.destination ? (
                <a href={story.destination.url} target="_blank" rel="noreferrer">
                  {story.destination.label} ↗<small>{story.destination.note}</small>
                </a>
              ) : (
                "Aucune destination publique"
              )}
              {story.secondary && (
                <a href={story.secondary.url} target="_blank" rel="noreferrer">
                  {story.secondary.label} ↗<small>{story.secondary.note}</small>
                </a>
              )}
            </dd>
          </div>
        </dl>
      </header>

      <section className="cs-section cs-split">
        <div data-reveal>
          <p className="vx-label">01 · Le problème</p>
          <h2>{story.problem.title}</h2>
          <p className="vx-body">{story.problem.body}</p>
        </div>
        <div data-reveal>
          <p className="vx-label">02 · La recherche</p>
          <h2>{story.research.title}</h2>
          <p className="vx-body">{story.research.body}</p>
          <ul className="cs-points">
            {story.research.points.map((p) => (
              <li key={p}>{p}</li>
            ))}
          </ul>
        </div>
      </section>

      <section className="cs-section">
        <p className="vx-label" data-reveal>
          03 · Les choix de conception
        </p>
        <div className="vx-cards cs-cards">
          {story.decisions.map((d, i) => (
            <div className="vx-card" key={d.title} data-reveal>
              <span>{String(i + 1).padStart(2, "0")}</span>
              <b>{d.title}</b>
              <p>{d.detail}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="cs-section cs-build">
        <p className="vx-label" data-reveal>
          04 · La réalisation
        </p>
        <ol className="cs-timeline">
          <span className="cs-timeline-line" aria-hidden="true" />
          {story.steps.map((s, i) => (
            <li key={s.title} data-reveal>
              <i aria-hidden="true">{i + 1}</i>
              <div>
                <b>{s.title}</b>
                <p>{s.detail}</p>
              </div>
            </li>
          ))}
        </ol>
        <div className="vx-stack" data-reveal>
          {story.stack.map((t) => (
            <span key={t}>{t}</span>
          ))}
        </div>
      </section>

      <section className="cs-section">
        <p className="vx-label" data-reveal>
          05 · Les preuves
        </p>
        <ul className="cs-proofs" data-reveal>
          {story.proofs.map((p) => (
            <li key={p}>{p}</li>
          ))}
        </ul>
        <div className={`cs-gallery cs-gallery-${story.media[0]?.orientation ?? "landscape"}`}>
          {story.media.map((m, i) => (
            <div data-reveal key={m.label}>
              <MediaFrame media={m} priority={i === 0} />
            </div>
          ))}
        </div>
      </section>

      <section className="cs-section cs-result">
        <p className="vx-label" data-reveal>
          06 · Le résultat
        </p>
        <p className="vx-result-quote" data-reveal>
          {story.result}
        </p>
        <div className="vx-limits" data-reveal>
          <b>Limites assumées</b>
          <ul>
            {story.limits.map((l) => (
              <li key={l}>{l}</li>
            ))}
          </ul>
        </div>
        {story.destination && (
          <div className="vx-actions" data-reveal>
            <a className="vx-btn vx-btn-primary" href={story.destination.url} target="_blank" rel="noreferrer">
              {story.destination.label} <span aria-hidden="true">↗</span>
            </a>
          </div>
        )}
      </section>

      <nav className="cs-pager" aria-label="Autres études de cas">
        {prev ? (
          <a href={`/projets/${prev.slug}`}>
            <small>← Précédent · {prev.number}</small>
            {prev.name}
          </a>
        ) : (
          <a href="/">
            <small>← Accueil</small>
            Le récit complet
          </a>
        )}
        {next ? (
          <a href={`/projets/${next.slug}`}>
            <small>Suivant · {next.number} →</small>
            {next.name}
          </a>
        ) : (
          <a href="/realisations">
            <small>Suite →</small>
            Autres projets
          </a>
        )}
      </nav>
    </div>
  );
}
