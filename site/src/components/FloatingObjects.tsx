"use client";

import { useEffect, useRef } from "react";
import type * as Three from "three";
import {
  createCameraModel,
  createStudio,
  type PaletteName,
} from "./cameraModel";
import {
  createInstantCameraModel,
  fontsReady,
  type InstantPaletteName,
} from "./instantCameraModel";
import styles from "./FloatingObjects.module.css";

type T = typeof Three;

/**
 * Gli oggetti che fluttuano nella fascia in cima a "Chi sono". Ognuno ha un modello, una
 * grandezza, una corsia e un percorso suo: per aggiungerne uno basta una voce qui. Sono le due
 * fotocamere della pagina, in miniatura: la mirrorless della galleria e l'istantanea dell'anno
 * in California.
 */
const OBJECTS: {
  create: (THREE: T) => { model: Three.Group; dispose: () => void };
  /** Altezza dell'oggetto rispetto alla fascia */
  size: number;
  /** Ingombro del modello nelle sue unità, rotazioni comprese: serve a riportarlo a `size` */
  extent: number;
  /** La corsia orizzontale, da −1 (bordo sinistro) a 1 (destro): così non si scontrano */
  lane: [number, number];
  /** Velocità e fase del percorso, perché gli oggetti non si muovano insieme */
  speed: number;
  phase: number;
}[] = [
  {
    create: (THREE) => {
      const camera = createCameraModel(THREE);
      camera.setPalette("nero" satisfies PaletteName);
      return camera;
    },
    size: 0.3,
    // La fotocamera è alta circa 3 unità (corpo più torretta): 4.2 lascia margine quando ruota
    extent: 4.2,
    lane: [-1, 0],
    speed: 1,
    phase: 0,
  },
  {
    create: (THREE) => {
      const camera = createInstantCameraModel(THREE);
      camera.setPalette("nero" satisfies InstantPaletteName);
      return camera;
    },
    size: 0.3,
    // L'istantanea è un cubo di circa 4 unità, che girando arriva a 5
    extent: 5,
    lane: [0, 1],
    speed: 0.83,
    phase: 2.4,
  },
];

/**
 * Una fascia decorativa, trasparente sullo sfondo della pagina, in cui degli oggetti 3D
 * vagano piano da un capo all'altro: ognuno segue un percorso morbido (somme di sinusoidi,
 * quindi non si ripete mai uguale a breve), si inclina dove va e ruota lentamente su sé
 * stesso. three.js (e i caratteri degli sticker) si scarica solo quando la fascia è vicina allo schermo, e il disegno si
 * ferma quando esce. Con "riduci animazioni" gli oggetti restano fermi. È solo decorazione:
 * nascosta ai lettori di schermo e non cliccabile.
 */
export default function FloatingObjects() {
  const host = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = host.current;
    if (!el) return;
    let cancelled = false;
    let dispose: (() => void) | null = null;
    const io = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting || dispose) return;
        io.disconnect();
        Promise.all([import("three"), fontsReady()]).then(([THREE]) => {
          if (!cancelled) dispose = build(THREE, el);
        });
      },
      { rootMargin: "200px" },
    );
    io.observe(el);
    return () => {
      cancelled = true;
      io.disconnect();
      dispose?.();
    };
  }, []);

  return <div ref={host} className={styles.band} aria-hidden="true" />;
}

function build(THREE: T, host: HTMLDivElement) {
  const reduceMotion = window.matchMedia(
    "(prefers-reduced-motion: reduce)",
  ).matches;

  const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
  renderer.outputColorSpace = THREE.SRGBColorSpace;
  renderer.toneMapping = THREE.ACESFilmicToneMapping;
  renderer.toneMappingExposure = 1.05;
  const canvas = renderer.domElement;
  host.append(canvas);

  const scene = new THREE.Scene();
  const studio = createStudio(THREE, renderer, scene);
  const view = new THREE.PerspectiveCamera(30, 1, 0.1, 200);
  const DIST = 40;
  view.position.set(0, 0, DIST);
  view.lookAt(0, 0, 0);

  // Ogni oggetto sta in un perno che si sposta lungo il percorso e gira su sé stesso
  const items = OBJECTS.map((o) => {
    const made = o.create(THREE);
    const pivot = new THREE.Group();
    pivot.add(made.model);
    scene.add(pivot);
    return { ...o, ...made, pivot };
  });

  // Quanto spazio c'è in scena: altezza e larghezza visibili alla distanza degli oggetti
  let worldH = 1;
  let worldW = 1;
  const resize = () => {
    const w = host.clientWidth;
    const h = host.clientHeight;
    renderer.setSize(w, h, false);
    view.aspect = w / h;
    view.updateProjectionMatrix();
    worldH = 2 * DIST * Math.tan(THREE.MathUtils.degToRad(view.fov / 2));
    worldW = worldH * view.aspect;
    for (const it of items)
      it.pivot.scale.setScalar((it.size * worldH) / it.extent);
  };
  const ro = new ResizeObserver(resize);
  ro.observe(host);
  resize();

  // La posizione lungo il percorso al tempo t: due sinusoidi per asse, di periodo diverso,
  // tenute dentro la corsia dell'oggetto con un margine che lo lascia sempre intero
  const at = (t: number, it: (typeof items)[number]) => {
    const s = t * 0.22 * it.speed + it.phase;
    const half = worldW / 2;
    const margin = it.size * worldH * 0.9;
    const from = Math.max(-half + margin, it.lane[0] * half + margin * 0.6);
    const to = Math.min(half - margin, it.lane[1] * half - margin * 0.6);
    const my = worldH / 2 - it.size * worldH * 0.7;
    const u = 0.7 * Math.sin(s) + 0.3 * Math.sin(s * 2.3 + 1.1);
    return {
      x: (from + to) / 2 + ((to - from) / 2) * u,
      y: my * (0.6 * Math.sin(s * 1.7 + 0.4) + 0.4 * Math.sin(s * 0.6 + 2)),
    };
  };

  let visible = true;
  let frame = 0;
  const start = performance.now();
  const draw = (now: number) => {
    // Con "riduci animazioni" il tempo è fermo: un'unica posa, sempre la stessa
    const t = reduceMotion ? 6 : (now - start) / 1000;
    for (const it of items) {
      const p = at(t, it);
      const q = at(t + 0.4, it);
      it.pivot.position.set(p.x, p.y, 0);
      // Si gira piano su sé stessa e si inclina verso dove sta andando
      it.pivot.rotation.set(
        0.25 + 0.2 * Math.sin(t * 0.5 + it.phase),
        t * 0.35 + it.phase,
        THREE.MathUtils.clamp(
          (p.y - q.y) * 0.25 - (q.x - p.x) * 0.08,
          -0.5,
          0.5,
        ),
      );
    }
    renderer.render(scene, view);
    if (!reduceMotion && visible) frame = requestAnimationFrame(draw);
  };
  const vo = new IntersectionObserver(([entry]) => {
    const was = visible;
    visible = entry.isIntersecting;
    if (visible && !was && !reduceMotion) frame = requestAnimationFrame(draw);
  });
  vo.observe(host);
  frame = requestAnimationFrame(draw);

  return () => {
    visible = false;
    cancelAnimationFrame(frame);
    ro.disconnect();
    vo.disconnect();
    for (const it of items) it.dispose();
    studio.dispose();
    renderer.dispose();
    canvas.remove();
  };
}
