"use client";

import { useEffect, useRef, useState } from "react";
import type { Formation } from "../../lib/stories";

// Fond voxel 3D : un champ de cubes instanciés qui se reconfigure à chaque
// chapitre (cœur, constellation, ville, voiture, bulles, entonnoir) et tourne
// avec le défilement. Repli CSS si WebGL est indisponible ; aucun mouvement
// continu si l'utilisateur demande des animations réduites.

type Scene = { formation: Formation; accent: string };
const listeners = new Set<(scene: Scene) => void>();
let currentScene: Scene = { formation: "core", accent: "#c6f58a" };

export function setVoxelScene(formation: Formation, accent: string) {
  if (currentScene.formation === formation && currentScene.accent === accent) return;
  currentScene = { formation, accent };
  listeners.forEach((listener) => listener(currentScene));
}

type Point = [number, number, number];

function seeded(seed: number) {
  let s = seed;
  return () => {
    s = (s * 16807) % 2147483647;
    return (s - 1) / 2147483646;
  };
}

const STEP = 0.24;

function sphere(cx: number, cy: number, cz: number, r: number, shell = true): Point[] {
  const pts: Point[] = [];
  const n = Math.ceil(r / STEP);
  for (let x = -n; x <= n; x++)
    for (let y = -n; y <= n; y++)
      for (let z = -n; z <= n; z++) {
        const d = Math.hypot(x, y, z) * STEP;
        if (d <= r && (!shell || d > r - STEP * 1.1)) pts.push([cx + x * STEP, cy + y * STEP, cz + z * STEP]);
      }
  return pts;
}

function ring(r: number, tiltX: number, tiltZ: number, count: number): Point[] {
  const pts: Point[] = [];
  for (let i = 0; i < count; i++) {
    const a = (i / count) * Math.PI * 2;
    const x = Math.cos(a) * r;
    const z = Math.sin(a) * r;
    const y1 = z * Math.sin(tiltX);
    const z1 = z * Math.cos(tiltX);
    pts.push([x * Math.cos(tiltZ) - y1 * Math.sin(tiltZ), x * Math.sin(tiltZ) + y1 * Math.cos(tiltZ), z1]);
  }
  return pts.map(([x, y, z]) => [Math.round(x / STEP) * STEP, Math.round(y / STEP) * STEP, Math.round(z / STEP) * STEP]);
}

function box(x0: number, y0: number, z0: number, w: number, h: number, d: number, hollow = true): Point[] {
  const pts: Point[] = [];
  const nx = Math.round(w / STEP), ny = Math.round(h / STEP), nz = Math.round(d / STEP);
  for (let i = 0; i <= nx; i++)
    for (let j = 0; j <= ny; j++)
      for (let k = 0; k <= nz; k++) {
        const edge = i === 0 || j === 0 || k === 0 || i === nx || j === ny || k === nz;
        if (!hollow || edge) pts.push([x0 + i * STEP, y0 + j * STEP, z0 + k * STEP]);
      }
  return pts;
}

function line(a: Point, b: Point): Point[] {
  const steps = Math.ceil(Math.hypot(b[0] - a[0], b[1] - a[1], b[2] - a[2]) / STEP);
  return Array.from({ length: steps }, (_, i) => {
    const t = i / steps;
    return [a[0] + (b[0] - a[0]) * t, a[1] + (b[1] - a[1]) * t, a[2] + (b[2] - a[2]) * t] as Point;
  });
}

const builders: Record<Formation, () => Point[]> = {
  core: () => [
    ...sphere(0, 0, 0, 1.5),
    ...ring(2.7, 1.2, 0.3, 90),
    ...ring(3.4, 1.45, -0.5, 110),
    ...ring(4.2, 1.0, 0.9, 130),
  ],
  constellation: () => {
    const rnd = seeded(7);
    const pts: Point[] = [...sphere(0, 0, 0, 0.95)];
    for (let i = 0; i < 8; i++) {
      const a = (i / 8) * Math.PI * 2;
      const r = 3 + rnd() * 1.4;
      const c: Point = [Math.cos(a) * r, (rnd() - 0.5) * 2.4, Math.sin(a) * r];
      pts.push(...sphere(c[0], c[1], c[2], 0.35 + rnd() * 0.35));
      pts.push(...line([0, 0, 0], c).filter((_, k) => k % 2 === 0));
    }
    pts.push(...ring(2.1, 1.4, 0.2, 70));
    return pts;
  },
  city: () => {
    const rnd = seeded(42);
    const pts: Point[] = [];
    for (let gx = -4; gx <= 4; gx++)
      for (let gz = -4; gz <= 4; gz++) {
        if (gx % 3 === 0 || gz % 3 === 0) {
          if ((gx + gz) % 2 === 0) pts.push([gx * 0.62, -1.6, gz * 0.62]);
          continue;
        }
        const h = Math.round(1 + rnd() * 9 * (1 - Math.hypot(gx, gz) / 7));
        for (let y = 0; y < h; y++) pts.push([gx * 0.62, -1.6 + y * STEP * 1.05, gz * 0.62]);
      }
    return pts;
  },
  car: () => {
    const pts: Point[] = [
      ...box(-2.4, -0.7, -1.0, 4.8, 0.95, 2.0),
      ...box(-1.2, 0.25, -0.85, 2.4, 0.8, 1.7),
    ];
    for (const [x, z] of [[-1.5, -1.1], [1.5, -1.1], [-1.5, 1.1], [1.5, 1.1]]) {
      for (let i = 0; i < 18; i++) {
        const a = (i / 18) * Math.PI * 2;
        pts.push([x + Math.cos(a) * 0.5, -0.8 + Math.sin(a) * 0.5, z]);
      }
    }
    for (let x = -5; x <= 5; x += 0.72) pts.push([x, -1.45, 0], [x + 0.24, -1.45, 0]);
    return pts;
  },
  bubbles: () => {
    const pts: Point[] = [];
    const bubble = (x: number, y: number, z: number, w: number, h: number, tailLeft: boolean) => {
      pts.push(...box(x, y, z, w, h, 0.24));
      const tx = tailLeft ? x + 0.3 : x + w - 0.3;
      pts.push([tx, y - STEP, z], [tx + (tailLeft ? -STEP : STEP), y - STEP * 2, z]);
    };
    bubble(-3.2, 1.0, -0.6, 3.4, 1.4, true);
    bubble(-0.2, -0.6, 0.4, 3.6, 1.2, false);
    bubble(-2.6, -2.3, 1.2, 2.6, 1.0, true);
    for (let i = 0; i < 3; i++) pts.push(...sphere(1.2 + i * 0.5, 2.0, -1.2, 0.16, false));
    return pts;
  },
  funnel: () => {
    const pts: Point[] = [];
    for (let level = 0; level < 14; level++) {
      const y = 2.4 - level * 0.34;
      const r = 3.6 - level * 0.24;
      const count = Math.round(r * 18);
      for (let i = 0; i < count; i++) {
        const a = (i / count) * Math.PI * 2 + level * 0.15;
        pts.push([Math.cos(a) * r, y, Math.sin(a) * r]);
      }
    }
    const rnd = seeded(3);
    for (let i = 0; i < 40; i++) pts.push([(rnd() - 0.5) * 0.5, -2.6 - rnd() * 1.6, (rnd() - 0.5) * 0.5]);
    return pts;
  },
  scatter: () => {
    const rnd = seeded(11);
    // Nuage d'étoiles maintenu derrière le plan du texte (z ≤ 1) pour éviter
    // des voxels géants au premier plan.
    return Array.from({ length: 900 }, () => {
      const r = 4 + rnd() * 6;
      const t = rnd() * Math.PI * 2;
      const p = Math.acos(2 * rnd() - 1);
      return [r * Math.sin(p) * Math.cos(t) * 1.4, r * Math.sin(p) * Math.sin(t) * 0.8, -Math.abs(r * Math.cos(p)) + 1] as Point;
    });
  },
};

type Layout = { pos: Float32Array; scale: Float32Array };

function fit(points: Point[], count: number, seed: number): Layout {
  // Échantillonne la forme sur exactement `count` voxels ; le surplus devient
  // une fine poussière lointaine qui donne de la profondeur.
  const rnd = seeded(seed);
  const pos = new Float32Array(count * 3);
  const scale = new Float32Array(count);
  const shuffled = [...points].sort(() => rnd() - 0.5);
  for (let i = 0; i < count; i++) {
    const shape = i < shuffled.length;
    const p = shape ? shuffled[i] : ([(rnd() - 0.5) * 26, (rnd() - 0.5) * 16, -5 - rnd() * 12] as Point);
    pos[i * 3] = p[0];
    pos[i * 3 + 1] = p[1];
    pos[i * 3 + 2] = p[2];
    scale[i] = shape ? 1 : 0.28 + rnd() * 0.3;
  }
  return { pos, scale };
}

export default function VoxelField({
  formation = "core",
  accent = "#c6f58a",
}: {
  formation?: Formation;
  accent?: string;
}) {
  const mountRef = useRef<HTMLDivElement>(null);
  const [fallback, setFallback] = useState(false);
  const initial = useRef<Scene>({ formation, accent });

  useEffect(() => {
    const mount = mountRef.current;
    if (!mount) return;
    currentScene = initial.current;
    let disposed = false;
    let cleanup = () => {};

    (async () => {
      const THREE = await import("three");
      if (disposed) return;
      const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
      const small = window.innerWidth < 760;
      const COUNT = small ? 760 : 1500;

      let renderer: import("three").WebGLRenderer;
      try {
        renderer = new THREE.WebGLRenderer({ antialias: !small, alpha: true, powerPreference: "high-performance" });
      } catch {
        setFallback(true);
        return;
      }
      renderer.setPixelRatio(Math.min(window.devicePixelRatio, small ? 1.25 : 1.6));
      renderer.setSize(window.innerWidth, window.innerHeight);
      renderer.toneMapping = THREE.ACESFilmicToneMapping;
      mount.appendChild(renderer.domElement);

      const scene = new THREE.Scene();
      scene.fog = new THREE.FogExp2(0x0b0d0a, 0.055);
      const camera = new THREE.PerspectiveCamera(42, window.innerWidth / window.innerHeight, 0.1, 80);
      camera.position.set(0, 0.6, small ? 15 : 12);

      scene.add(new THREE.HemisphereLight(0xe8f0ff, 0x0b0d0a, 1.1));
      const key = new THREE.DirectionalLight(0xffffff, 2.2);
      key.position.set(4, 6, 8);
      scene.add(key);
      const rim = new THREE.PointLight(0xffffff, 30, 30);
      rim.position.set(-6, -2, -4);
      scene.add(rim);

      const geometry = new THREE.BoxGeometry(0.17, 0.17, 0.17);
      const material = new THREE.MeshStandardMaterial({ roughness: 0.38, metalness: 0.25 });
      const mesh = new THREE.InstancedMesh(geometry, material, COUNT);
      mesh.instanceMatrix.setUsage(THREE.DynamicDrawUsage);
      const group = new THREE.Group();
      group.add(mesh);
      scene.add(group);

      const formations = Object.fromEntries(
        (Object.keys(builders) as Formation[]).map((name, i) => [name, fit(builders[name](), COUNT, 97 + i)]),
      ) as Record<Formation, Layout>;

      const pos = new Float32Array(formations.scatter.pos);
      const scl = new Float32Array(formations.scatter.scale);
      let target = formations[currentScene.formation];
      if (reduce) {
        pos.set(target.pos);
        scl.set(target.scale);
      }
      // Sur grand écran, la sculpture se place à droite du texte.
      const offsetX = () => (window.innerWidth >= 900 ? 3.4 : 0);
      group.position.x = offsetX();
      const speed = Float32Array.from({ length: COUNT }, () => 0.025 + Math.random() * 0.06);
      const phase = Float32Array.from({ length: COUNT }, () => Math.random() * Math.PI * 2);
      const tone = Float32Array.from({ length: COUNT }, () => Math.random());

      const base = new THREE.Color(currentScene.accent);
      const targetColor = new THREE.Color(currentScene.accent);
      const dim = new THREE.Color(0x3a4236);
      const white = new THREE.Color(0xf1f2e9);
      const tmpColor = new THREE.Color();
      const paint = () => {
        for (let i = 0; i < COUNT; i++) {
          const t = tone[i];
          if (t > 0.72) tmpColor.copy(base);
          else if (t > 0.6) tmpColor.copy(white);
          else tmpColor.copy(dim).lerp(base, t * 0.55);
          mesh.setColorAt(i, tmpColor);
        }
        if (mesh.instanceColor) mesh.instanceColor.needsUpdate = true;
      };
      paint();

      const dummy = new THREE.Object3D();
      let frame = 0;
      let raf = 0;
      let pointerX = 0, pointerY = 0, smoothX = 0, smoothY = 0;
      let lastScroll = window.scrollY, velocity = 0, spin = 0;

      const onScene = (next: Scene) => {
        target = formations[next.formation];
        targetColor.set(next.accent);
        if (reduce) {
          pos.set(target.pos);
          scl.set(target.scale);
          base.copy(targetColor);
          paint();
          draw(0);
        }
      };
      listeners.add(onScene);

      const draw = (time: number) => {
        const tp = target.pos;
        for (let i = 0; i < COUNT; i++) {
          const k = i * 3;
          if (!reduce) {
            pos[k] += (tp[k] - pos[k]) * speed[i];
            pos[k + 1] += (tp[k + 1] - pos[k + 1]) * speed[i];
            pos[k + 2] += (tp[k + 2] - pos[k + 2]) * speed[i];
            scl[i] += (target.scale[i] - scl[i]) * speed[i];
          }
          const wobble = reduce ? 0 : Math.sin(time * 0.0011 + phase[i]) * 0.035;
          dummy.position.set(pos[k], pos[k + 1] + wobble, pos[k + 2]);
          dummy.scale.setScalar(scl[i]);
          dummy.updateMatrix();
          mesh.setMatrixAt(i, dummy.matrix);
        }
        mesh.instanceMatrix.needsUpdate = true;
        const scrollAngle = window.scrollY * 0.00045;
        group.rotation.y = scrollAngle + spin + smoothX * 0.35;
        group.rotation.x = 0.18 + smoothY * 0.2 + Math.sin(scrollAngle * 0.7) * 0.12;
        renderer.render(scene, camera);
      };

      const loop = (time: number) => {
        raf = requestAnimationFrame(loop);
        if (document.hidden) return;
        frame++;
        const scroll = window.scrollY;
        velocity += (scroll - lastScroll - velocity) * 0.1;
        lastScroll = scroll;
        spin += 0.0012 + Math.min(Math.abs(velocity), 80) * 0.00012;
        smoothX += (pointerX - smoothX) * 0.05;
        smoothY += (pointerY - smoothY) * 0.05;
        if (!base.equals(targetColor)) {
          base.lerp(targetColor, 0.06);
          if (frame % 3 === 0) paint();
        }
        camera.position.z = (small ? 15 : 12) - Math.min(Math.abs(velocity), 60) * 0.02;
        draw(time);
      };

      const onPointer = (e: PointerEvent) => {
        pointerX = (e.clientX / window.innerWidth) * 2 - 1;
        pointerY = (e.clientY / window.innerHeight) * 2 - 1;
      };
      const onResize = () => {
        camera.aspect = window.innerWidth / window.innerHeight;
        camera.updateProjectionMatrix();
        renderer.setSize(window.innerWidth, window.innerHeight);
        group.position.x = offsetX();
        if (reduce) draw(0);
      };
      const onScrollStatic = () => draw(0);

      window.addEventListener("resize", onResize);
      if (reduce) {
        window.addEventListener("scroll", onScrollStatic, { passive: true });
        draw(0);
      } else {
        window.addEventListener("pointermove", onPointer, { passive: true });
        raf = requestAnimationFrame(loop);
      }
      mount.dataset.ready = "true";

      cleanup = () => {
        cancelAnimationFrame(raf);
        listeners.delete(onScene);
        window.removeEventListener("resize", onResize);
        window.removeEventListener("pointermove", onPointer);
        window.removeEventListener("scroll", onScrollStatic);
        geometry.dispose();
        material.dispose();
        renderer.dispose();
        renderer.domElement.remove();
      };
    })();

    return () => {
      disposed = true;
      cleanup();
    };
  }, []);

  return (
    <div className={`voxel-field${fallback ? " is-fallback" : ""}`} ref={mountRef} aria-hidden="true">
      <div className="voxel-vignette" />
    </div>
  );
}
