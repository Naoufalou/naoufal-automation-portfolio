"use client";

import { useEffect, useId, useRef, useState } from "react";

type Point3 = { x: number; y: number; z: number };

const CORE = 78;
const FOCAL = 420;

const NODES: { label: string; ring: 0 | 1 | 2; angle: number }[] = [
  { label: "MYRIAZ", ring: 0, angle: 0 },
  { label: "CONTEXTE", ring: 1, angle: 0.4 },
  { label: "PROJETS", ring: 1, angle: 2.1 },
  { label: "ARTEFACTS", ring: 1, angle: 3.9 },
  { label: "CONNAISSANCE", ring: 2, angle: 1.2 },
  { label: "TRACES", ring: 2, angle: 3.4 },
  { label: "COMPÉTENCES", ring: 2, angle: 5.1 },
];

const EDGES: [number, number][] = [
  [0, 1],
  [0, 2],
  [0, 3],
  [1, 4],
  [2, 6],
  [3, 5],
  [4, 2],
  [5, 3],
];

const ringRadius = [0, 112, 176];
const depthByRing = [0, 34, 68];

function layout(index: number): Point3 {
  const node = NODES[index];
  const r = ringRadius[node.ring];
  const tilt = 0.42;
  return {
    x: Math.cos(node.angle) * r,
    y: Math.sin(node.angle) * r * tilt + depthByRing[node.ring] * 0.16,
    z: Math.sin(node.angle) * r * Math.cos(tilt) * 0.42,
  };
}

const BASE = NODES.map((_, index) => layout(index));

/**
 * Constellation éditoriale en projection perspective sur canvas.
 * Pas de dépendance 3D lourde : une seule passe de rotation + projection
 * par image, avec parallaxe au pointeur et repli statique complet.
 */
export default function OrbitalCore() {
  const instance = useId().replace(/:/g, "");
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const frameRef = useRef<HTMLDivElement>(null);
  const [failed, setFailed] = useState(false);

  useEffect(() => {
    const canvas = canvasRef.current;
    const frame = frameRef.current;
    if (!canvas || !frame) return;

    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const ctx = canvas.getContext("2d");
    if (!ctx) {
      setFailed(true);
      return;
    }

    let raf = 0;
    let width = 0;
    let height = 0;
    const pointer = { x: 0, y: 0, target: 0, targetY: 0 };

    const resize = () => {
      const rect = frame.getBoundingClientRect();
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      width = Math.max(rect.width, 320);
      height = Math.max(rect.height, 260);
      canvas.width = Math.round(width * dpr);
      canvas.height = Math.round(height * dpr);
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };

    const project = (p: Point3, yaw: number, pitch: number) => {
      const cy = Math.cos(yaw);
      const sy = Math.sin(yaw);
      const cp = Math.cos(pitch);
      const sp = Math.sin(pitch);
      const x1 = p.x * cy + p.z * sy;
      const z1 = p.z * cy - p.x * sy;
      const y1 = p.y * cp - z1 * sp;
      const z2 = z1 * cp + p.y * sp;
      const scale = FOCAL / (FOCAL + z2 + 240);
      return {
        x: width / 2 + x1 * scale,
        y: height / 2 + y1 * scale,
        scale,
        depth: z2,
      };
    };

    const draw = (time: number) => {
      const yaw = reduced ? -0.34 : time * 0.00016 + pointer.x;
      const pitch = reduced ? 0.1 : pointer.y * 0.32;
      ctx.clearRect(0, 0, width, height);

      const projected = BASE.map((p) => project(p, yaw, pitch));

      ctx.lineWidth = 1;
      for (const [a, b] of EDGES) {
        const pa = projected[a];
        const pb = projected[b];
        const midX = width / 2;
        const midY = height / 2;
        ctx.strokeStyle = "rgba(174, 210, 138, 0.24)";
        ctx.setLineDash([3, 7]);
        ctx.beginPath();
        ctx.moveTo(pa.x, pa.y);
        ctx.lineTo(midX, midY);
        ctx.lineTo(pb.x, pb.y);
        ctx.stroke();
      }
      ctx.setLineDash([]);

      // Anneaux temporels projetés.
      ringRadius.forEach((radius, ring) => {
        if (radius === 0) return;
        ctx.beginPath();
        for (let step = 0; step <= 72; step += 1) {
          const angle = (step / 72) * Math.PI * 2;
          const tilt = 0.42;
          const point = project(
            {
              x: Math.cos(angle) * radius,
              y: Math.sin(angle) * radius * tilt + depthByRing[ring] * 0.16,
              z: Math.sin(angle) * radius * Math.cos(tilt) * 0.42,
            },
            yaw,
            pitch,
          );
          if (step === 0) ctx.moveTo(point.x, point.y);
          else ctx.lineTo(point.x, point.y);
        }
        ctx.closePath();
        ctx.strokeStyle =
          ring === 1 ? "rgba(187, 217, 154, 0.16)" : "rgba(176, 215, 220, 0.11)";
        ctx.stroke();
      });

      // Cœur.
      const core = projected[0];
      const glow = ctx.createRadialGradient(
        width / 2,
        height / 2,
        4,
        width / 2,
        height / 2,
        CORE * core.scale,
      );
      glow.addColorStop(0, "rgba(214, 250, 152, 0.5)");
      glow.addColorStop(1, "rgba(214, 250, 152, 0)");
      ctx.fillStyle = glow;
      ctx.beginPath();
      ctx.arc(width / 2, height / 2, CORE * core.scale, 0, Math.PI * 2);
      ctx.fill();
      ctx.fillStyle = "#d6fa98";
      ctx.beginPath();
      ctx.arc(width / 2, height / 2, 6 * core.scale, 0, Math.PI * 2);
      ctx.fill();

      projected.forEach((p, index) => {
        if (index === 0) return;
        const radius = (NODES[index].ring === 1 ? 4.4 : 3.4) * p.scale;
        ctx.fillStyle =
          NODES[index].ring === 1
            ? "rgba(155, 184, 132, 0.86)"
            : "rgba(158, 220, 227, 0.78)";
        ctx.beginPath();
        ctx.arc(p.x, p.y, radius, 0, Math.PI * 2);
        ctx.fill();
        ctx.font = "600 8px 'DM Sans', sans-serif";
        ctx.fillStyle = "rgba(215, 223, 204, 0.82)";
        ctx.textAlign = "center";
        ctx.fillText(NODES[index].label, p.x, p.y - radius - 6);
      });

      ctx.font = "600 7px 'DM Sans', sans-serif";
      ctx.fillStyle = "rgba(131, 144, 126, 0.9)";
      ctx.textAlign = "left";
      ctx.fillText("CŒUR · CONNEXIONS ÉDITORIALES", 16, 22);
      ctx.textAlign = "right";
      ctx.fillText(reduced ? "MOUVEMENT RÉDUIT" : "PARALLAXE ACTIVE", width - 16, height - 14);

      if (!reduced) raf = requestAnimationFrame(draw);
    };

    const onPointer = (event: PointerEvent) => {
      const rect = frame.getBoundingClientRect();
      pointer.x = ((event.clientX - rect.left) / rect.width - 0.5) * 0.9;
      pointer.y = ((event.clientY - rect.top) / rect.height - 0.5) * 0.9;
    };

    resize();
    const observer = new ResizeObserver(() => {
      resize();
      draw(reduced ? 0 : performance.now());
    });
    observer.observe(frame);

    if (reduced) draw(0);
    else {
      raf = requestAnimationFrame(draw);
      frame.addEventListener("pointermove", onPointer);
    }

    return () => {
      observer.disconnect();
      frame.removeEventListener("pointermove", onPointer);
      cancelAnimationFrame(raf);
    };
  }, []);

  if (failed) return <StaticConstellation />;

  return (
    <div className="orbital-core" ref={frameRef} data-testid="orbital-core">
      <canvas
        ref={canvasRef}
        aria-hidden="true"
        className="orbital-core-canvas"
        role="presentation"
      />
      <div className="orbital-core-legend">
        <span>
          <i className="legend-core" /> cœur
        </span>
        <span>
          <i className="legend-inner" /> anneau proche
        </span>
        <span>
          <i className="legend-outer" /> anneau récent
        </span>
      </div>
      <p className="visual-disclaimer">
        Schéma en projection perspective · relations éditoriales, pas une
        connexion aux données privées
      </p>
    </div>
  );
}

function StaticConstellation() {
  return (
    <div className="orbital-core orbital-core-static" data-testid="orbital-core-static">
      <svg
        viewBox="0 0 640 400"
        role="img"
        aria-label="Schéma statique : un cœur entouré de deux anneaux de nœuds reliés"
      >
        <circle cx="320" cy="200" r="112" className="static-ring" />
        <circle cx="320" cy="200" r="176" className="static-ring static-ring-outer" />
        <circle cx="320" cy="200" r="7" className="static-core" />
        {NODES.map((node, index) => {
          if (index === 0) return null;
          const p = projectStatic(BASE[index]);
          return (
            <circle
              key={node.label}
              cx={p.x}
              cy={p.y}
              r={node.ring === 1 ? 4.5 : 3.6}
              className={node.ring === 1 ? "static-node" : "static-node-outer"}
            />
          );
        })}
        {EDGES.map(([a, b]) => {
          if (a === 0 || b === 0) return null;
          const pa = projectStatic(BASE[a]);
          const pb = projectStatic(BASE[b]);
          return (
            <line
              key={`${a}-${b}`}
              x1={pa.x}
              y1={pa.y}
              x2={pb.x}
              y2={pb.y}
              className="static-edge"
            />
          );
        })}
      </svg>
      <p className="visual-disclaimer">
        Repli statique · mouvement réduit ou canvas indisponible
      </p>
    </div>
  );
}

function projectStatic(p: Point3) {
  const tilt = 0.42;
  const yaw = -0.34;
  const cy = Math.cos(yaw);
  const sy = Math.sin(yaw);
  const x1 = p.x * cy + p.z * sy;
  const z1 = p.z * cy - p.x * sy;
  const y1 = p.y * 0.9;
  const scale = FOCAL / (FOCAL + z1 + 240);
  return { x: 320 + x1 * scale, y: 200 + y1 * scale, scale };
}
