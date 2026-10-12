"use client";

import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { SplitText } from "gsap/SplitText";
import { useLayoutEffect, useRef } from "react";
import { skills, stories, type Formation, type Story } from "../../lib/stories";
import MediaFrame from "./media-frame";
import SkillsGraph from "./skills-graph";
import VoxelField, { setVoxelScene } from "./voxel-field";

gsap.registerPlugin(ScrollTrigger, SplitText);

const usedSkills = skills.filter((sk) => stories.some((s) => s.skills.includes(sk.id)));

function Chapter({ story }: { story: Story }) {
  const captured = story.media.filter((m) => m.src).length;
  return (
    <section
      className="vx-chapter"
      id={`chapitre-${story.slug}`}
      data-formation={story.formation}
      data-accent={story.accent}
      data-name={story.name}
      data-number={story.number}
      style={{ "--accent": story.accent } as React.CSSProperties}
      aria-labelledby={`titre-${story.slug}`}
    >
      <div className="vx-track">
        <article className="vx-panel vx-intro">
          <span className="vx-bignum" aria-hidden="true">{story.number}</span>
          <div className="vx-intro-copy">
            <p className="vx-kicker" data-reveal>
              Chapitre {story.number} · {story.kicker}
            </p>
            <h2 id={`titre-${story.slug}`} data-reveal>
              {story.name}
            </h2>
            <p className="vx-tagline" data-reveal>
              {story.tagline}
            </p>
            <p className="vx-role" data-reveal>
              <span>Mon rôle</span>
              {story.role}
            </p>
          </div>
          <p className="vx-swipe" aria-hidden="true">
            Continuez à défiler <i />
          </p>
        </article>

        <article className="vx-panel vx-problem">
          <div className="vx-col" data-reveal>
            <p className="vx-label">01 · Le problème</p>
            <h3>{story.problem.title}</h3>
            <p className="vx-body">{story.problem.body}</p>
          </div>
          <div className="vx-col vx-research" data-reveal>
            <p className="vx-label">02 · La recherche</p>
            <h3>{story.research.title}</h3>
            <p className="vx-body">{story.research.body}</p>
            <ul>
              {story.research.points.map((p) => (
                <li key={p}>{p}</li>
              ))}
            </ul>
          </div>
        </article>

        <article className="vx-panel vx-decisions">
          <p className="vx-label" data-reveal>
            03 · Les choix de conception
          </p>
          <div className="vx-cards">
            {story.decisions.map((d, i) => (
              <div className="vx-card" key={d.title} data-reveal>
                <span>{String(i + 1).padStart(2, "0")}</span>
                <b>{d.title}</b>
                <p>{d.detail}</p>
              </div>
            ))}
          </div>
        </article>

        <article className="vx-panel vx-steps">
          <p className="vx-label" data-reveal>
            04 · La réalisation
          </p>
          <ol className="vx-timeline">
            <span className="vx-timeline-line" aria-hidden="true" />
            {story.steps.map((s, i) => (
              <li key={s.title} data-reveal>
                <i aria-hidden="true">{i + 1}</i>
                <b>{s.title}</b>
                <p>{s.detail}</p>
              </li>
            ))}
          </ol>
          <div className="vx-stack" data-reveal>
            {story.stack.map((t) => (
              <span key={t}>{t}</span>
            ))}
          </div>
        </article>

        <article className="vx-panel vx-proofs">
          <div className="vx-proofs-head" data-reveal>
            <p className="vx-label">05 · Les preuves</p>
            <ul>
              {story.proofs.map((p) => (
                <li key={p}>{p}</li>
              ))}
            </ul>
            <p className="vx-media-count">
              {captured} capture{captured > 1 ? "s" : ""} réelle{captured > 1 ? "s" : ""}
              {story.media.length > captured && ` · ${story.media.length - captured} à venir`}
            </p>
          </div>
          <div className={`vx-media vx-media-${story.media[0]?.orientation ?? "landscape"}`}>
            {story.media.map((m) => (
              <div data-reveal key={m.label}>
                <MediaFrame media={m} />
              </div>
            ))}
          </div>
        </article>

        <article className="vx-panel vx-result">
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
          <div className="vx-actions" data-reveal>
            <a className="vx-btn vx-btn-primary" href={`/projets/${story.slug}`}>
              Lire l’étude de cas <span aria-hidden="true">→</span>
            </a>
            {story.destination && (
              <a className="vx-btn" href={story.destination.url} target="_blank" rel="noreferrer">
                {story.destination.label} <span aria-hidden="true">↗</span>
              </a>
            )}
          </div>
        </article>
      </div>
    </section>
  );
}

export default function HomeExperience() {
  const root = useRef<HTMLDivElement>(null);
  const hudName = useRef<HTMLSpanElement>(null);
  const hudNum = useRef<HTMLSpanElement>(null);
  const hudBar = useRef<HTMLElement>(null);

  useLayoutEffect(() => {
    const el = root.current;
    if (!el) return;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const docEl = document.documentElement;

    const setHud = (num: string, name: string) => {
      if (hudNum.current) hudNum.current.textContent = num;
      if (hudName.current) hudName.current.textContent = name;
    };

    const ctx = gsap.context(() => {
      // Changement de décor 3D et d'accent à l'entrée de chaque section. Créés
      // après les épinglages pour que leurs positions tiennent compte des pin-spacers.
      const sceneTriggers = () => {
      el.querySelectorAll<HTMLElement>("[data-formation]").forEach((section) => {
        const spacer = section.parentElement?.classList.contains("pin-spacer") ? section.parentElement : section;
        ScrollTrigger.create({
          trigger: spacer,
          start: "top 55%",
          end: "bottom 45%",
          onToggle: (self) => {
            if (!self.isActive) return;
            const accent = section.dataset.accent ?? "#c6f58a";
            setVoxelScene(section.dataset.formation as Formation, accent);
            docEl.style.setProperty("--story-accent", accent);
            setHud(section.dataset.number ?? "00", section.dataset.name ?? "Ouverture");
          },
        });
      });

      ScrollTrigger.create({
        start: 0,
        end: "max",
        onUpdate: (self) => gsap.set(".vx-progress i", { scaleX: self.progress }),
      });
      };

      if (reduce) {
        sceneTriggers();
        return;
      }

      // Ouverture : le titre se compose ligne à ligne puis s'efface au défilement.
      const split = SplitText.create(".vx-hero h1", { type: "lines,words", mask: "lines" });
      gsap.from(split.words, { yPercent: 115, duration: 1.1, ease: "expo.out", stagger: 0.045, delay: 0.15 });
      gsap.from(".vx-hero [data-intro]", { y: 24, opacity: 0, duration: 0.9, stagger: 0.08, delay: 0.55, ease: "power3.out" });
      gsap.to(".vx-hero-inner", {
        yPercent: -18,
        opacity: 0,
        ease: "none",
        scrollTrigger: { trigger: ".vx-hero", start: "top top", end: "bottom top", scrub: true },
      });

      // Manifeste : les mots s'allument au rythme du défilement.
      const manifesto = SplitText.create(".vx-manifesto-text", { type: "words" });
      gsap.fromTo(
        manifesto.words,
        { opacity: 0.12 },
        {
          opacity: 1,
          stagger: 0.05,
          ease: "none",
          scrollTrigger: { trigger: ".vx-manifesto", start: "top 70%", end: "bottom 60%", scrub: true },
        },
      );
      gsap.from(".vx-method li", {
        y: 50,
        opacity: 0,
        stagger: 0.12,
        duration: 0.8,
        ease: "power3.out",
        scrollTrigger: { trigger: ".vx-method", start: "top 80%" },
      });
      gsap.from(".vx-skills-head > *, .skills-graph", {
        y: 40,
        opacity: 0,
        stagger: 0.1,
        duration: 0.9,
        ease: "power3.out",
        scrollTrigger: { trigger: ".vx-skills", start: "top 70%" },
      });

      const mm = gsap.matchMedia();

      // Bureau : chaque chapitre est épinglé et se lit horizontalement.
      mm.add("(min-width: 900px)", () => {
        el.classList.remove("vx-flat");
        const cleanups: Array<() => void> = [() => el.classList.add("vx-flat")];
        el.querySelectorAll<HTMLElement>(".vx-chapter").forEach((chapter) => {
          const track = chapter.querySelector<HTMLElement>(".vx-track")!;
          const distance = () => track.scrollWidth - window.innerWidth;
          const tween = gsap.to(track, {
            x: () => -distance(),
            ease: "none",
            scrollTrigger: {
              trigger: chapter,
              pin: true,
              scrub: 0.8,
              start: "top top",
              end: () => `+=${distance()}`,
              invalidateOnRefresh: true,
              onUpdate: (self) => {
                if (hudBar.current) hudBar.current.style.transform = `scaleX(${self.progress})`;
                docEl.classList.toggle("vx-dim", self.progress > 0.1 && self.progress < 0.995);
              },
              onLeave: () => docEl.classList.remove("vx-dim"),
              onLeaveBack: () => docEl.classList.remove("vx-dim"),
            },
          });

          chapter.querySelectorAll<HTMLElement>(".vx-panel").forEach((panel, index) => {
            const items = panel.querySelectorAll("[data-reveal]");
            if (index === 0) {
              gsap.from(items, {
                y: 70,
                opacity: 0,
                stagger: 0.09,
                duration: 1,
                ease: "expo.out",
                scrollTrigger: { trigger: chapter, start: "top 65%", toggleActions: "play none none reverse" },
              });
              gsap.to(panel.querySelector(".vx-bignum"), {
                xPercent: -40,
                ease: "none",
                scrollTrigger: { trigger: panel, containerAnimation: tween, start: "left left", end: "right left", scrub: true },
              });
              return;
            }
            gsap.from(items, {
              x: 120,
              opacity: 0,
              rotateY: -12,
              stagger: 0.08,
              duration: 0.9,
              ease: "power3.out",
              scrollTrigger: {
                trigger: panel,
                containerAnimation: tween,
                start: "left 78%",
                toggleActions: "play none none reverse",
              },
            });
          });

          const line = chapter.querySelector(".vx-timeline-line");
          if (line)
            gsap.from(line, {
              scaleX: 0,
              ease: "none",
              scrollTrigger: {
                trigger: chapter.querySelector(".vx-steps"),
                containerAnimation: tween,
                start: "left 70%",
                end: "right 60%",
                scrub: true,
              },
            });

          // Le focus clavier dans un panneau hors champ ramène le défilement au bon endroit.
          const onFocus = (e: FocusEvent) => {
            const panel = (e.target as HTMLElement).closest<HTMLElement>(".vx-panel");
            const st = tween.scrollTrigger;
            if (!panel || !st) return;
            const ratio = Math.min(1, panel.offsetLeft / Math.max(1, distance()));
            window.scrollTo({ top: st.start + ratio * (st.end - st.start), behavior: "auto" });
          };
          chapter.addEventListener("focusin", onFocus);
          cleanups.push(() => chapter.removeEventListener("focusin", onFocus));
        });
        return () => cleanups.forEach((fn) => fn());
      });

      // Mobile : lecture verticale, révélations successives.
      mm.add("(max-width: 899px)", () => {
        ScrollTrigger.batch(el.querySelectorAll(".vx-chapter [data-reveal]"), {
          start: "top 88%",
          onEnter: (batch) => gsap.from(batch, { y: 40, opacity: 0, stagger: 0.08, duration: 0.8, ease: "power3.out" }),
        });
      });

      gsap.from(".vx-outro [data-reveal]", {
        y: 60,
        opacity: 0,
        stagger: 0.1,
        duration: 1,
        ease: "expo.out",
        scrollTrigger: { trigger: ".vx-outro", start: "top 70%" },
      });

      sceneTriggers();
    }, el);

    return () => {
      ctx.revert();
      docEl.style.removeProperty("--story-accent");
      docEl.classList.remove("vx-dim");
    };
  }, []);

  return (
    <div className="vx-experience vx-flat" ref={root}>
      <VoxelField />
      <div className="vx-progress" aria-hidden="true">
        <i />
      </div>
      <div className="vx-hud" aria-hidden="true">
        <span ref={hudNum}>00</span>
        <span ref={hudName}>Ouverture</span>
        <em>
          <i ref={hudBar} />
        </em>
      </div>

      <section className="vx-hero" data-formation="core" data-accent="#c6f58a" data-number="00" data-name="Ouverture">
        <div className="vx-hero-inner">
          <p className="vx-eyebrow" data-intro>
            <span className="vx-dot" /> Ingénieur IA · Chercheur · Développeur produit
          </p>
          <h1>
            Je construis des systèmes qui se souviennent, agissent <em>et se prouvent.</em>
          </h1>
          <p className="vx-lead" data-intro>
            Mémoire d’agents, mondes 3D pilotés par l’IA, applications mobiles et desktop : cinq projets racontés de la
            question de départ jusqu’aux preuves.
          </p>
          <nav className="vx-index" aria-label="Chapitres" data-intro>
            {stories.map((s) => (
              <a key={s.slug} href={`#chapitre-${s.slug}`} style={{ "--accent": s.accent } as React.CSSProperties}>
                <i>{s.number}</i>
                {s.name}
              </a>
            ))}
          </nav>
        </div>
        <a className="vx-scroll-cue" href="#approche" data-intro>
          <span>Entrer dans l’histoire</span>
          <i aria-hidden="true" />
        </a>
      </section>

      <section className="vx-manifesto" id="approche" data-formation="scatter" data-accent="#e8f0d8" data-number="00" data-name="Méthode">
        <p className="vx-eyebrow">La méthode</p>
        <p className="vx-manifesto-text">
          Je pars d’une question concrète. J’étudie ce qui existe, je choisis une architecture que l’on peut expliquer, je
          la construis, puis je sépare ce qui est vérifié de ce qui reste à prouver.
        </p>
        <ol className="vx-method">
          <li>
            <b>Chercher</b>
            <span>Lire les sources, auditer le code tiers, comparer les options.</span>
          </li>
          <li>
            <b>Concevoir</b>
            <span>Des invariants simples : une source de vérité, des états explicites.</span>
          </li>
          <li>
            <b>Prouver</b>
            <span>Tests, builds et captures réelles ; les limites sont écrites.</span>
          </li>
        </ol>
      </section>

      <section className="vx-skills" data-formation="core" data-accent="#c6f58a" data-number="00" data-name="Compétences">
        <div className="vx-skills-head">
          <p className="vx-eyebrow">Compétences</p>
          <h2>
            {stories.length} systèmes, <em>{usedSkills.length} savoir-faire</em> qui se croisent.
          </h2>
          <p>Chaque lien relie un projet à une compétence qu’il a réellement mobilisée.</p>
          <ul className="vx-skill-list">
            {usedSkills.map((sk) => (
              <li key={sk.id}>{sk.label}</li>
            ))}
          </ul>
        </div>
        <SkillsGraph />
      </section>

      {stories.map((story) => (
        <Chapter key={story.slug} story={story} />
      ))}

      <section className="vx-outro" data-formation="scatter" data-accent="#c6f58a" data-number="06" data-name="Suite">
        <p className="vx-eyebrow" data-reveal>
          Le reste de l’atelier
        </p>
        <h2 data-reveal>
          Chaque piste <em>laisse une trace.</em>
        </h2>
        <p data-reveal>
          Agents locaux, outils de données, sites et prototypes : le catalogue rassemble les autres expériences et précise
          pour chacune ce qui a été construit et vérifié.
        </p>
        <div className="vx-actions" data-reveal>
          <a className="vx-btn vx-btn-primary" href="/realisations">
            Autres projets <span aria-hidden="true">→</span>
          </a>
          <a className="vx-btn" href="/contact">
            Parlons du prochain système <span aria-hidden="true">↗</span>
          </a>
        </div>
      </section>
    </div>
  );
}
