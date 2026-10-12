"use client";

import {
  forceCenter,
  forceCollide,
  forceLink,
  forceManyBody,
  forceSimulation,
  forceX,
  forceY,
  type SimulationLinkDatum,
  type SimulationNodeDatum,
} from "d3-force";
import { useEffect, useMemo, useRef, useState } from "react";
import { skills, stories } from "../../lib/stories";

// Graphe des compétences : chaque lien relie un projet à une compétence
// qu'il mobilise réellement (champ `skills` de stories.ts).

type Node = SimulationNodeDatum & {
  id: string;
  label: string;
  kind: "project" | "skill";
  accent?: string;
  slug?: string;
  r: number;
};
type Link = SimulationLinkDatum<Node> & { source: string | Node; target: string | Node };

const W = 760;
const H = 520;

export default function SkillsGraph() {
  const svgRef = useRef<SVGSVGElement>(null);
  const nodeRefs = useRef<Array<SVGGElement | null>>([]);
  const linkRefs = useRef<Array<SVGLineElement | null>>([]);
  const [active, setActive] = useState<string | null>(null);

  const { nodes, links } = useMemo(() => {
    const used = new Set(stories.flatMap((s) => s.skills));
    const nodes: Node[] = [
      ...stories.map((s, i) => ({
        id: s.slug,
        label: s.name,
        kind: "project" as const,
        accent: s.accent,
        slug: s.slug,
        r: 22,
        x: W / 2 + Math.cos((i / stories.length) * Math.PI * 2) * 140,
        y: H / 2 + Math.sin((i / stories.length) * Math.PI * 2) * 120,
      })),
      ...skills
        .filter((sk) => used.has(sk.id))
        .map((sk, i) => ({
          id: sk.id,
          label: sk.label,
          kind: "skill" as const,
          r: 7,
          x: W / 2 + Math.cos(i * 0.9) * 260,
          y: H / 2 + Math.sin(i * 0.9) * 200,
        })),
    ];
    const links: Link[] = stories.flatMap((s) => s.skills.map((sk) => ({ source: s.slug, target: sk })));
    return { nodes, links };
  }, []);

  const neighbors = useMemo(() => {
    const map = new Map<string, Set<string>>();
    for (const l of links) {
      const a = l.source as string, b = l.target as string;
      if (!map.has(a)) map.set(a, new Set());
      if (!map.has(b)) map.set(b, new Set());
      map.get(a)!.add(b);
      map.get(b)!.add(a);
    }
    return map;
  }, [links]);

  useEffect(() => {
    const svg = svgRef.current;
    if (!svg) return;
    const simNodes = nodes.map((n) => ({ ...n }));
    const simLinks = links.map((l) => ({ ...l }));
    const sim = forceSimulation<Node>(simNodes)
      .force("link", forceLink<Node, Link>(simLinks).id((n) => n.id).distance(150).strength(0.22))
      .force("charge", forceManyBody<Node>().strength((n) => (n.kind === "project" ? -1100 : -320)))
      .force("center", forceCenter(W / 2, H / 2))
      .force("x", forceX<Node>(W / 2).strength(0.02))
      .force("y", forceY<Node>(H / 2).strength(0.05))
      .force("collide", forceCollide<Node>((n) => n.r + (n.kind === "skill" ? 52 : 30)))
      .stop();

    const render = () => {
      simLinks.forEach((l, i) => {
        const el = linkRefs.current[i];
        const s = l.source as Node, t = l.target as Node;
        if (!el || typeof s !== "object" || typeof t !== "object") return;
        el.setAttribute("x1", String(s.x));
        el.setAttribute("y1", String(s.y));
        el.setAttribute("x2", String(t.x));
        el.setAttribute("y2", String(t.y));
      });
      simNodes.forEach((n, i) => {
        const x = Math.max(40, Math.min(W - 40, n.x ?? 0));
        const y = Math.max(30, Math.min(H - 30, n.y ?? 0));
        n.x = x;
        n.y = y;
        nodeRefs.current[i]?.setAttribute("transform", `translate(${x} ${y})`);
      });
    };

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      sim.tick(300);
      render();
      return () => sim.stop();
    }
    sim.tick(40);
    render();
    sim.on("tick", render);
    const io = new IntersectionObserver(([e]) => (e.isIntersecting ? sim.alpha(0.7).restart() : sim.stop()), {
      threshold: 0.2,
    });
    io.observe(svg);
    return () => {
      io.disconnect();
      sim.stop();
    };
  }, [nodes, links]);

  const isLit = (id: string) => !active || active === id || neighbors.get(active)?.has(id);
  const linkLit = (l: Link) => !active || l.source === active || l.target === active;

  const go = (slug?: string) => {
    if (slug) document.getElementById(`chapitre-${slug}`)?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <div className="skills-graph">
      <svg
        ref={svgRef}
        viewBox={`0 0 ${W} ${H}`}
        role="group"
        aria-label="Graphe reliant chaque projet aux compétences qu’il mobilise"
      >
        <g className="sg-links">
          {links.map((l, i) => (
            <line
              key={`${l.source}-${l.target}`}
              ref={(el) => {
                linkRefs.current[i] = el;
              }}
              className={linkLit(l) ? "lit" : ""}
            />
          ))}
        </g>
        {nodes.map((n, i) => (
          <g
            key={n.id}
            ref={(el) => {
              nodeRefs.current[i] = el;
            }}
            className={`sg-node sg-${n.kind}${isLit(n.id) ? " lit" : ""}`}
            style={n.accent ? ({ "--node": n.accent } as React.CSSProperties) : undefined}
            tabIndex={0}
            role={n.kind === "project" ? "link" : undefined}
            aria-label={
              n.kind === "project"
                ? `${n.label} : aller au chapitre`
                : `${n.label} : ${[...(neighbors.get(n.id) ?? [])].map((id) => nodes.find((x) => x.id === id)?.label).join(", ")}`
            }
            onMouseEnter={() => setActive(n.id)}
            onMouseLeave={() => setActive(null)}
            onFocus={() => setActive(n.id)}
            onBlur={() => setActive(null)}
            onClick={() => go(n.slug)}
            onKeyDown={(e) => {
              if (e.key === "Enter" || e.key === " ") {
                e.preventDefault();
                go(n.slug);
              }
            }}
          >
            {n.kind === "project" && <circle className="sg-halo" r={n.r + 14} />}
            <circle className="sg-dot" r={n.r} />
            <text y={n.kind === "project" ? n.r + 20 : n.r + 15}>{n.label}</text>
          </g>
        ))}
      </svg>
      <p className="sg-hint">Survolez une compétence pour voir où elle a servi · cliquez un projet pour y aller</p>
    </div>
  );
}
