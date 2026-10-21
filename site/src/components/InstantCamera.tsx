"use client";

import { useEffect, useRef, useState } from "react";
import { createStudio } from "./cameraModel";
import {
  INSTANT_PALETTES,
  PRINT,
  SCENES,
  createInstantCameraModel,
  fontsReady,
  type InstantPaletteName,
} from "./instantCameraModel";
import styles from "./InstantCamera.module.css";

export type InstantPhoto = { src: string; alt: string };

type Labels = {
  model: string;
  /** L'invito a scattare, sopra la fotocamera */
  hint: string;
  shoot: string;
  colors: string;
  palettes: Record<InstantPaletteName, string>;
  /** Letto ai lettori di schermo quando la foto è uscita: "{alt}" diventa la descrizione */
  developed: string;
  /** La descrizione delle scene inventate, finché le foto vere non ci sono */
  sample: string;
};

type Props = { photos: InstantPhoto[]; labels: Labels };

type Scene = {
  shoot: () => void;
  setPalette: (name: InstantPaletteName) => void;
  dispose: () => void;
};

/**
 * La fotocamera istantanea 3D (il modello è in instantCameraModel.ts): si gira col mouse, col
 * dito o con le frecce, e si scatta col tasto rosso sul frontale, con il pulsante "Scatta" o con
 * Invio. Al clic scatta il flash e dalla fessura esce una stampa che si sviluppa piano: sopra
 * ci sono le polaroid di Giulia, una dopo l'altra, o le scene inventate finché non arrivano.
 * three.js si scarica solo quando il riquadro si avvicina allo schermo e il disegno si ferma
 * quando esce; con "riduci animazioni" niente rotazione a riposo né oscillazione.
 */
export default function InstantCamera({ photos, labels }: Props) {
  const host = useRef<HTMLDivElement>(null);
  const scene = useRef<Scene | null>(null);
  const [palette, setPalette] = useState<InstantPaletteName>("nero");
  const [busy, setBusy] = useState(false);
  const [shots, setShots] = useState(0);
  const [said, setSaid] = useState("");

  useEffect(() => {
    const el = host.current;
    if (!el) return;
    let cancelled = false;
    const io = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting || scene.current) return;
        io.disconnect();
        Promise.all([import("three"), fontsReady()]).then(([THREE]) => {
          if (cancelled) return;
          scene.current = build(THREE, el, photos, labels, {
            onBusy: setBusy,
            onShot: (text) => {
              setShots((n) => n + 1);
              setSaid(text);
            },
          });
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

  const choosePalette = (name: InstantPaletteName) => {
    setPalette(name);
    scene.current?.setPalette(name);
  };

  return (
    <figure className={styles.wrap}>
      <div ref={host} className={styles.cam}>
        <p
          className={styles.hint}
          style={{ opacity: shots ? 0 : 1 }}
          aria-hidden="true"
        >
          {labels.hint}
        </p>
      </div>
      <div className={styles.controls}>
        <div
          className={styles.swatches}
          role="group"
          aria-label={labels.colors}
        >
          {(Object.keys(INSTANT_PALETTES) as InstantPaletteName[]).map(
            (name) => (
              <button
                key={name}
                type="button"
                style={{ background: INSTANT_PALETTES[name].swatch }}
                aria-label={labels.palettes[name]}
                aria-pressed={palette === name}
                onClick={() => choosePalette(name)}
              />
            ),
          )}
        </div>
        <button
          type="button"
          className={styles.shoot}
          onClick={() => scene.current?.shoot()}
          disabled={busy}
        >
          {labels.shoot}
        </button>
      </div>
      <figcaption className={styles.srOnly} aria-live="polite">
        {said}
      </figcaption>
    </figure>
  );
}

function build(
  THREE: typeof import("three"),
  host: HTMLDivElement,
  photos: InstantPhoto[],
  labels: Labels,
  on: { onBusy: (busy: boolean) => void; onShot: (text: string) => void },
): Scene {
  const reduceMotion = window.matchMedia(
    "(prefers-reduced-motion: reduce)",
  ).matches;

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
  const cam = new THREE.PerspectiveCamera(26, 1, 0.1, 100);
  // Un po' più lontano e più in avanti dello snippet: così la stampa, quando esce, resta in quadro
  const target = new THREE.Vector3(0, -0.15, 1.6);
  const DIST = 21.5;

  const studio = createStudio(THREE, renderer, scene);
  const camera = createInstantCameraModel(THREE);
  const {
    model,
    shutter,
    shutterCap,
    flashLight,
    flashMat,
    print,
    printPivot,
  } = camera;
  camera.setPalette("nero");
  const pivot = new THREE.Group();
  pivot.add(model);
  scene.add(pivot);

  // A terra: l'ombra vera e un'ombra di contatto sfumata
  const groundY = camera.bottom - 0.02;
  const groundMat = new THREE.ShadowMaterial({ opacity: 0.2 });
  const ground = new THREE.Mesh(new THREE.PlaneGeometry(40, 40), groundMat);
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
  const contactMat = new THREE.MeshBasicMaterial({
    map: new THREE.CanvasTexture(sc),
    transparent: true,
    depthWrite: false,
    opacity: 0.75,
  });
  const contact = new THREE.Mesh(new THREE.PlaneGeometry(6.2, 6.2), contactMat);
  contact.rotation.x = -Math.PI / 2;
  contact.position.y = groundY + 0.002;
  scene.add(contact);

  // ---------- Le foto da stampare ----------
  // Le polaroid di Giulia si caricano subito, così allo scatto sono già pronte
  const images = photos.map((p) => {
    const img = new Image();
    img.src = p.src;
    return img;
  });
  let next = photos.length ? 0 : Math.floor(Math.random() * SCENES.length);
  const nextPhoto = () => {
    if (photos.length) {
      const i = next;
      next = (next + 1) % photos.length;
      const img = images[i];
      camera.paintPhoto((g) => {
        g.fillStyle = "#3a403b";
        g.fillRect(0, 0, 512, 512);
        if (!img.complete || !img.naturalWidth) return;
        // Ritagliata al centro, come object-fit: cover
        const s = Math.min(img.naturalWidth, img.naturalHeight);
        g.drawImage(
          img,
          (img.naturalWidth - s) / 2,
          (img.naturalHeight - s) / 2,
          s,
          s,
          0,
          0,
          512,
          512,
        );
      });
      return labels.developed.replace("{alt}", photos[i].alt);
    }
    camera.paintPhoto(SCENES[next]);
    next = (next + 1) % SCENES.length;
    return labels.developed.replace("{alt}", labels.sample);
  };

  // ---------- Lo scatto: il tasto si abbassa, il flash, la stampa esce e si sviluppa ----------
  const shot = { busy: false, t: 0, state: "hidden", dev: 1, leaveT: 0 };
  const EJECT = 2.0;
  const dark = new THREE.Color(0x3a403b);
  const full = new THREE.Color(0xffffff);
  let caption = "";
  const setPrintOpacity = (o: number) => {
    for (const m of camera.printMats) m.opacity = o;
  };

  const shoot = () => {
    if (shot.busy) return;
    shot.busy = true;
    shot.t = 0;
    on.onBusy(true);
    if (shot.state === "out") {
      shot.state = "leaving";
      shot.leaveT = 0;
    }
    idle = 0;
  };

  const updateShot = (dt: number) => {
    // La foto di prima scivola via
    if (shot.state === "leaving") {
      shot.leaveT += dt;
      const k = Math.min(1, shot.leaveT / 0.5);
      print.position.z = -0.35 + k * 1.6;
      print.position.y = -k * k * 1.6;
      print.rotation.x = k * 0.6;
      setPrintOpacity(1 - k);
      if (k >= 1) {
        shot.state = "hidden";
        print.visible = false;
      }
    }
    if (!shot.busy) return;
    shot.t += dt;
    const t = shot.t;
    const press = t < 0.12 ? t / 0.12 : Math.max(0, 1 - (t - 0.12) / 0.2);
    shutterCap.position.z = -0.06 * press;
    const f = t > 0.08 ? Math.exp(-(t - 0.08) * 9) : 0;
    flashLight.intensity = 7 * Math.PI * f;
    flashMat.emissiveIntensity = 2.5 * f;
    const start = 0.75;
    if (t >= start && shot.state !== "leaving") {
      if (shot.state === "hidden") {
        caption = nextPhoto();
        shot.state = "ejecting";
        print.visible = true;
        setPrintOpacity(1);
        print.position.y = 0;
        print.rotation.x = 0;
        shot.dev = 0;
      }
      const k = Math.min(1, (t - start) / EJECT);
      // L'uscita, con il piccolo tremolio del motore
      const e =
        1 - Math.pow(1 - k, 2.2) + (k < 1 ? Math.sin(t * 70) * 0.004 : 0);
      print.position.z = e * (PRINT.l - 0.35) - PRINT.l;
      printPivot.rotation.x = 0.1 * e * e;
      if (k >= 1) {
        shot.state = "out";
        shot.busy = false;
        on.onBusy(false);
        on.onShot(caption);
      }
    }
  };
  const updateDevelop = (dt: number) => {
    if (shot.state !== "ejecting" && shot.state !== "out") return;
    shot.dev = Math.min(1, shot.dev + dt / 7);
    const d = shot.dev;
    camera.photoMat.color.copy(dark).lerp(full, d * d * (3 - 2 * d));
  };

  // ---------- Interazione ----------
  let yaw = 0.55;
  let tYaw = yaw;
  let elev = 0.3;
  let tElev = elev;
  let dragging = false;
  let moved = 0;
  let lastX = 0;
  let lastY = 0;
  let idle = 0;
  let vel = 0;
  const ELEV_MIN = 0.04;
  const ELEV_MAX = 1.05;
  const ray = new THREE.Raycaster();
  const ndc = new THREE.Vector2();
  const hitsShutter = (e: PointerEvent) => {
    const r = canvas.getBoundingClientRect();
    ndc.set(
      ((e.clientX - r.left) / r.width) * 2 - 1,
      -((e.clientY - r.top) / r.height) * 2 + 1,
    );
    ray.setFromCamera(ndc, cam);
    const hits = ray.intersectObjects(model.children, true);
    let o: InstanceType<typeof THREE.Object3D> | null = hits[0]?.object ?? null;
    for (; o; o = o.parent) if (o === shutter) return true;
    return false;
  };
  const onDown = (e: PointerEvent) => {
    dragging = true;
    moved = 0;
    lastX = e.clientX;
    lastY = e.clientY;
    canvas.setPointerCapture(e.pointerId);
    canvas.classList.add(styles.dragging);
  };
  const onMove = (e: PointerEvent) => {
    if (!dragging) {
      canvas.classList.toggle(styles.onShutter, hitsShutter(e));
      return;
    }
    const dx = e.clientX - lastX;
    const dy = e.clientY - lastY;
    lastX = e.clientX;
    lastY = e.clientY;
    moved += Math.abs(dx) + Math.abs(dy);
    if (moved > 4) {
      vel = dx * 0.01;
      tYaw += vel;
      tElev = Math.max(ELEV_MIN, Math.min(ELEV_MAX, tElev + dy * 0.005));
      idle = 0;
    }
  };
  const onUp = (e: PointerEvent) => {
    dragging = false;
    canvas.classList.remove(styles.dragging);
    if (moved <= 4 && hitsShutter(e)) shoot();
  };
  const onCancel = () => {
    dragging = false;
    canvas.classList.remove(styles.dragging);
  };
  const onKey = (e: KeyboardEvent) => {
    if (e.key === "ArrowLeft") tYaw -= 0.3;
    else if (e.key === "ArrowRight") tYaw += 0.3;
    else if (e.key === "ArrowUp") tElev = Math.min(ELEV_MAX, tElev + 0.12);
    else if (e.key === "ArrowDown") tElev = Math.max(ELEV_MIN, tElev - 0.12);
    else if (e.key === "Enter" || e.key === " ") shoot();
    else return;
    e.preventDefault();
    idle = 0;
  };
  canvas.addEventListener("pointerdown", onDown);
  canvas.addEventListener("pointermove", onMove);
  canvas.addEventListener("pointerup", onUp);
  canvas.addEventListener("pointercancel", onCancel);
  canvas.addEventListener("keydown", onKey);

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

  let visible = true;
  let frame = 0;
  let t0 = performance.now();
  const loop = (now: number) => {
    if (!visible) return;
    const dt = Math.min(0.05, (now - t0) / 1000);
    t0 = now;
    idle += dt;
    if (!dragging) {
      tYaw += vel;
      vel *= 0.92;
      if (!reduceMotion && idle > 3 && !shot.busy) tYaw += dt * 0.25;
    }
    yaw += (tYaw - yaw) * 0.12;
    elev += (tElev - elev) * 0.12;
    pivot.rotation.y = yaw;
    // Fluttua sopra il piano, con l'ombra di contatto che si allarga e sfuma
    const bob = reduceMotion ? 0 : Math.sin(now / 1100) * 0.09;
    pivot.position.y = 0.24 + bob;
    const k = (bob + 0.09) / 0.18;
    contact.scale.setScalar(1 + k * 0.12);
    contactMat.opacity = 0.75 - k * 0.25;
    updateShot(dt);
    updateDevelop(dt);
    cam.position.set(
      0,
      target.y + Math.sin(elev) * DIST,
      Math.cos(elev) * DIST,
    );
    cam.lookAt(target);
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
    shoot,
    setPalette: camera.setPalette,
    dispose() {
      visible = false;
      cancelAnimationFrame(frame);
      ro.disconnect();
      vo.disconnect();
      canvas.removeEventListener("pointerdown", onDown);
      canvas.removeEventListener("pointermove", onMove);
      canvas.removeEventListener("pointerup", onUp);
      canvas.removeEventListener("pointercancel", onCancel);
      canvas.removeEventListener("keydown", onKey);
      camera.dispose();
      contact.geometry.dispose();
      contactMat.map?.dispose();
      contactMat.dispose();
      ground.geometry.dispose();
      groundMat.dispose();
      studio.dispose();
      renderer.dispose();
      canvas.remove();
    },
  };
}
