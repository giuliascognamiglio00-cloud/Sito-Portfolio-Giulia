"use client";

import { useEffect, useRef, useState } from "react";
import {
  SCREEN_H,
  SCREEN_W,
  createCameraModel,
  createStudio,
} from "./cameraModel";
import styles from "./PhotoCamera.module.css";

export type CameraPhoto = { src: string; alt: string };

type Labels = {
  model: string;
  hint: string;
  prev: string;
  next: string;
  /** "{n} di {total}" */
  count: string;
  /** Il testo sul display quando le foto non ci sono ancora */
  empty: string;
};

type Props = { photos: CameraPhoto[]; labels: Labels };

/** Quello che il componente React chiede alla scena 3D, una volta pronta */
type Scene = {
  showPhoto: (i: number) => void;
  dispose: () => void;
};

/**
 * Una fotocamera 3D (il modello è in cameraModel.ts) da girare col mouse, col dito o con le frecce, e sul display posteriore
 * la galleria delle foto di Giulia: cambiando foto la fotocamera si volta da sola per
 * mostrare lo schermo. three.js si scarica solo quando il riquadro entra nello schermo, e il
 * disegno si ferma quando esce. Con "riduci animazioni" niente rotazione a riposo né
 * oscillazione. Il modello è costruito in codice, nessun file 3D esterno.
 */
export default function PhotoCamera({ photos, labels }: Props) {
  const host = useRef<HTMLDivElement>(null);
  const scene = useRef<Scene | null>(null);
  const [photo, setPhoto] = useState(0);
  const [touched, setTouched] = useState(false);

  useEffect(() => {
    const el = host.current;
    if (!el) return;
    let cancelled = false;
    // Si costruisce la scena solo la prima volta che il riquadro si avvicina allo schermo
    const io = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting || scene.current) return;
        io.disconnect();
        import("three").then((THREE) => {
          if (cancelled) return;
          scene.current = build(THREE, el, photos, labels, () =>
            setTouched(true),
          );
        });
      },
      { rootMargin: "200px" },
    );
    io.observe(el);
    return () => {
      cancelled = true;
      io.disconnect();
      scene.current?.dispose();
      scene.current = null;
    };
    // La scena si costruisce una volta sola: foto ed etichette non cambiano dopo il primo render
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const go = (by: number) => {
    if (!photos.length) return;
    const i = (photo + by + photos.length) % photos.length;
    setPhoto(i);
    scene.current?.showPhoto(i);
  };

  return (
    <figure className={styles.wrap}>
      <div ref={host} className={styles.cam}>
        <p
          className={styles.hint}
          style={{ opacity: touched ? 0 : 1 }}
          aria-hidden="true"
        >
          {labels.hint}
        </p>
      </div>

      {photos.length > 1 ? (
        <div className={styles.nav}>
          <button type="button" onClick={() => go(-1)} aria-label={labels.prev}>
            <span aria-hidden="true">←</span>
          </button>
          <span className={styles.count} aria-live="polite">
            {labels.count
              .replace("{n}", String(photo + 1))
              .replace("{total}", String(photos.length))}
          </span>
          <button type="button" onClick={() => go(1)} aria-label={labels.next}>
            <span aria-hidden="true">→</span>
          </button>
        </div>
      ) : null}

      {/* Per chi non vede il display: la foto mostrata, a parole */}
      <figcaption className={styles.srOnly} aria-live="polite">
        {photos[photo]?.alt ?? labels.empty}
      </figcaption>
    </figure>
  );
}

/** Costruisce la scena attorno al modello: luci, ombra, foto sul display, rotazione */
function build(
  THREE: typeof import("three"),
  host: HTMLDivElement,
  photos: CameraPhoto[],
  labels: Labels,
  onTouch: () => void,
): Scene {
  const reduceMotion = window.matchMedia(
    "(prefers-reduced-motion: reduce)",
  ).matches;

  // ---------- Renderer / scena ----------
  const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
  renderer.outputColorSpace = THREE.SRGBColorSpace;
  renderer.toneMapping = THREE.ACESFilmicToneMapping;
  renderer.toneMappingExposure = 1.0;
  renderer.shadowMap.enabled = true;
  renderer.shadowMap.type = THREE.PCFSoftShadowMap;
  const canvas = renderer.domElement;
  canvas.tabIndex = 0;
  canvas.setAttribute("aria-label", labels.model);
  host.prepend(canvas);

  const scene = new THREE.Scene();
  const cam = new THREE.PerspectiveCamera(30, 1, 0.1, 100);
  cam.position.set(0, 1.6, 12.5);
  cam.lookAt(0, 0.1, 0);

  const studio = createStudio(THREE, renderer, scene);
  const camera = createCameraModel(THREE);
  const { model, display, displayMesh } = camera;
  camera.setPalette("nero");
  displayMesh.visible = true;

  const pivot = new THREE.Group();
  pivot.add(model);
  scene.add(pivot);

  // A terra: l'ombra vera proiettata dalla luce principale, più un'ombra di contatto sfumata
  const groundY = camera.bottom - 0.25;
  const groundMat = new THREE.ShadowMaterial({ opacity: 0.22 });
  const ground = new THREE.Mesh(new THREE.PlaneGeometry(30, 30), groundMat);
  ground.rotation.x = -Math.PI / 2;
  ground.position.y = groundY;
  ground.receiveShadow = true;
  scene.add(ground);
  const sc = document.createElement("canvas");
  sc.width = sc.height = 256;
  const sx = sc.getContext("2d")!;
  const grad = sx.createRadialGradient(128, 128, 0, 128, 128, 128);
  grad.addColorStop(0, "rgba(0,0,0,0.55)");
  grad.addColorStop(0.45, "rgba(0,0,0,0.25)");
  grad.addColorStop(1, "rgba(0,0,0,0)");
  sx.fillStyle = grad;
  sx.fillRect(0, 0, 256, 256);
  const shadowMat = new THREE.MeshBasicMaterial({
    map: new THREE.CanvasTexture(sc),
    transparent: true,
    depthWrite: false,
    opacity: 0.75,
  });
  const shadow = new THREE.Mesh(new THREE.PlaneGeometry(5.4, 5.4), shadowMat);
  shadow.rotation.x = -Math.PI / 2;
  shadow.position.y = groundY + 0.002;
  scene.add(shadow);

  // ---------- Stato della rotazione (prima delle foto: mostrarne una gira la fotocamera) ----------
  let rotY = 0.55;
  let rotX = 0.12;
  let tY = rotY;
  let tX = rotX;
  let dragging = false;
  let lastX = 0;
  let lastY = 0;
  let idle = 0;
  let velY = 0;

  // Il retro guarda la camera quando la rotazione è π (più un giro intero qualsiasi)
  function turnToBack() {
    const turn = Math.round((tY - Math.PI) / (2 * Math.PI));
    tY = Math.PI + turn * 2 * Math.PI - 0.18;
    tX = 0.1;
    velY = 0;
    idle = -4;
  }

  // ---------- Le foto sul display ----------
  const loader = new THREE.TextureLoader();
  const textures = new Map<number, InstanceType<typeof THREE.Texture>>();
  let wanted = 0;

  // Il display è orizzontale. Le foto orizzontali lo riempiono, ritagliate al centro come
  // object-fit: cover; quelle verticali si vedono intere con le bande nere ai lati, come sul
  // display di una fotocamera vera, altrimenti se ne perderebbe più di metà
  const fit = (t: InstanceType<typeof THREE.Texture>) => {
    const img = t.image as HTMLImageElement;
    const screen = SCREEN_W / SCREEN_H;
    const ratio = img.width / img.height;
    if (ratio < 1) {
      const c = document.createElement("canvas");
      c.height = 1024;
      c.width = Math.round(1024 * screen);
      const x = c.getContext("2d")!;
      x.fillStyle = "#000";
      x.fillRect(0, 0, c.width, c.height);
      const w = c.height * ratio;
      x.drawImage(img, (c.width - w) / 2, 0, w, c.height);
      t.dispose();
      const boxed = new THREE.CanvasTexture(c);
      boxed.colorSpace = THREE.SRGBColorSpace;
      return boxed;
    }
    t.repeat.set(
      ratio > screen ? screen / ratio : 1,
      ratio > screen ? 1 : ratio / screen,
    );
    t.offset.set((1 - t.repeat.x) / 2, (1 - t.repeat.y) / 2);
    return t;
  };

  const placeholder = () => {
    const c = document.createElement("canvas");
    c.height = 512;
    c.width = Math.round((512 * SCREEN_W) / SCREEN_H);
    const x = c.getContext("2d")!;
    x.fillStyle = "#14161a";
    x.fillRect(0, 0, c.width, c.height);
    // Le linee della griglia dei terzi, come nel mirino
    x.strokeStyle = "rgba(255,255,255,0.18)";
    x.lineWidth = 2;
    for (const f of [1 / 3, 2 / 3]) {
      x.beginPath();
      x.moveTo(c.width * f, 0);
      x.lineTo(c.width * f, c.height);
      x.moveTo(0, c.height * f);
      x.lineTo(c.width, c.height * f);
      x.stroke();
    }
    x.fillStyle = "rgba(255,255,255,0.85)";
    x.font = `500 64px ${getComputedStyle(document.body).fontFamily}`;
    x.textAlign = "center";
    x.textBaseline = "middle";
    x.fillText(labels.empty, c.width / 2, c.height / 2);
    const t = new THREE.CanvasTexture(c);
    t.colorSpace = THREE.SRGBColorSpace;
    return t;
  };

  const showPhoto = (i: number) => {
    wanted = i;
    const ready = textures.get(i);
    if (ready) {
      display.map = ready;
      display.needsUpdate = true;
    } else if (photos[i]) {
      loader.load(photos[i].src, (loaded) => {
        loaded.colorSpace = THREE.SRGBColorSpace;
        const t = fit(loaded);
        textures.set(i, t);
        if (wanted === i) {
          display.map = t;
          display.needsUpdate = true;
        }
      });
    }
    // Cambiando foto la fotocamera si volta da sola per mostrare il display
    if (photos.length) turnToBack();
  };

  if (photos.length) showPhoto(0);
  else {
    display.map = placeholder();
    display.needsUpdate = true;
  }

  // ---------- Interazione ----------
  const onDown = (e: PointerEvent) => {
    dragging = true;
    lastX = e.clientX;
    lastY = e.clientY;
    canvas.setPointerCapture(e.pointerId);
    onTouch();
  };
  const onMove = (e: PointerEvent) => {
    if (!dragging) return;
    const dx = e.clientX - lastX;
    const dy = e.clientY - lastY;
    lastX = e.clientX;
    lastY = e.clientY;
    velY = dx * 0.01;
    tY += velY;
    tX = Math.max(-0.5, Math.min(0.7, tX + dy * 0.006));
    idle = 0;
  };
  const onUp = () => {
    dragging = false;
  };
  const onKey = (e: KeyboardEvent) => {
    if (e.key === "ArrowLeft") tY -= 0.3;
    else if (e.key === "ArrowRight") tY += 0.3;
    else if (e.key === "ArrowUp") tX = Math.max(-0.5, tX - 0.15);
    else if (e.key === "ArrowDown") tX = Math.min(0.7, tX + 0.15);
    else return;
    e.preventDefault();
    idle = 0;
    onTouch();
  };
  canvas.addEventListener("pointerdown", onDown);
  canvas.addEventListener("pointermove", onMove);
  canvas.addEventListener("pointerup", onUp);
  canvas.addEventListener("pointercancel", onUp);
  canvas.addEventListener("keydown", onKey);

  // ---------- Dimensioni ----------
  const resize = () => {
    const w = host.clientWidth;
    const h = host.clientHeight;
    renderer.setSize(w, h, false);
    cam.aspect = w / h;
    cam.updateProjectionMatrix();
  };
  const ro = new ResizeObserver(resize);
  ro.observe(host);
  resize();

  // ---------- Disegno: si ferma quando il riquadro non si vede ----------
  let visible = true;
  let frame = 0;
  let t0 = performance.now();
  const loop = (now: number) => {
    if (!visible) return;
    const dt = Math.min(0.05, (now - t0) / 1000);
    t0 = now;
    idle += dt;
    if (!dragging) {
      tY += velY;
      velY *= 0.92;
      if (!reduceMotion && idle > 2) tY += dt * 0.35;
    }
    rotY += (tY - rotY) * 0.12;
    rotX += (tX - rotX) * 0.12;
    pivot.rotation.set(rotX, rotY, 0);
    // Fluttua sopra il piano: l'ombra di contatto si allarga e sfuma quando sale
    const bob = reduceMotion ? 0 : Math.sin(now / 1100) * 0.09;
    pivot.position.y = bob;
    const k = (bob + 0.09) / 0.18;
    shadow.scale.setScalar(1 + k * 0.12);
    shadowMat.opacity = 0.75 - k * 0.25;
    renderer.render(scene, cam);
    frame = requestAnimationFrame(loop);
  };
  const vo = new IntersectionObserver(([entry]) => {
    const was = visible;
    visible = entry.isIntersecting;
    if (visible && !was) {
      t0 = performance.now();
      frame = requestAnimationFrame(loop);
    }
  });
  vo.observe(host);
  frame = requestAnimationFrame(loop);

  return {
    showPhoto,
    dispose() {
      visible = false;
      cancelAnimationFrame(frame);
      ro.disconnect();
      vo.disconnect();
      canvas.removeEventListener("pointerdown", onDown);
      canvas.removeEventListener("pointermove", onMove);
      canvas.removeEventListener("pointerup", onUp);
      canvas.removeEventListener("pointercancel", onUp);
      canvas.removeEventListener("keydown", onKey);
      for (const t of textures.values()) t.dispose();
      camera.dispose();
      shadow.geometry.dispose();
      shadowMat.map?.dispose();
      shadowMat.dispose();
      ground.geometry.dispose();
      groundMat.dispose();
      studio.dispose();
      renderer.dispose();
      canvas.remove();
    },
  };
}
