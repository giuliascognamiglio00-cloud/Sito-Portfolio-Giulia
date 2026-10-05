"use client";

import { useEffect, useRef } from "react";

/** Entro questa distanza dal cursore (px) un elemento si accorge di lui */
const RADIUS = 300;
/** Quanto può spostarsi al massimo verso il cursore (px) */
const REACH = 48;
/** Quanto gira al massimo quando il cursore è vicino (gradi) */
const SPIN = 36;

/**
 * Il movimento verso il cursore degli elementi fluttuanti di Floaters: quando il cursore
 * passa vicino, ognuno si sposta un poco verso di lui e gira, e si ferma a un piccolo
 * raggio dal suo posto. Lontano dal cursore torna dov'era. Non fa nulla con "riduci
 * animazioni" o sui dispositivi senza cursore. Non disegna niente: lavora sugli elementi
 * [data-follow] del suo contenitore.
 */
export default function FloatMotion() {
  const anchor = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const layer = anchor.current?.parentElement;
    if (!layer) return;
    const calm = window.matchMedia("(prefers-reduced-motion: reduce)");
    const mouse = window.matchMedia("(hover: hover) and (pointer: fine)");
    if (calm.matches || !mouse.matches) return;

    const items = Array.from(layer.querySelectorAll<HTMLElement>("[data-follow]"));
    let frame = 0;
    let x = 0;
    let y = 0;

    const update = () => {
      frame = 0;
      for (const el of items) {
        // Il riquadro del genitore, che non si muove con l'inseguimento: niente rincorse
        const r = (el.parentElement ?? el).getBoundingClientRect();
        const dx = x - (r.left + r.width / 2);
        const dy = y - (r.top + r.height / 2);
        const d = Math.hypot(dx, dy);
        if (d < RADIUS) {
          const k = 1 - d / RADIUS;
          const tx = Math.max(-REACH, Math.min(REACH, dx * 0.45 * k));
          const ty = Math.max(-REACH, Math.min(REACH, dy * 0.45 * k));
          const turn = (dx >= 0 ? 1 : -1) * SPIN * k;
          el.style.transform = `translate(${tx}px, ${ty}px) rotate(${turn}deg)`;
        } else if (el.style.transform) {
          el.style.transform = "";
        }
      }
    };

    const onMove = (e: PointerEvent) => {
      x = e.clientX;
      y = e.clientY;
      if (!frame) frame = requestAnimationFrame(update);
    };

    window.addEventListener("pointermove", onMove, { passive: true });
    return () => {
      window.removeEventListener("pointermove", onMove);
      cancelAnimationFrame(frame);
    };
  }, []);

  return <span ref={anchor} hidden />;
}
