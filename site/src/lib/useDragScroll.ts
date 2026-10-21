"use client";

import { useEffect, type RefObject } from "react";

/**
 * Le file da scorrere in orizzontale si possono anche trascinare col mouse, come col dito.
 * Col tocco e col trackpad basta lo scroll nativo: qui si gestisce solo il mouse. Il
 * trascinamento parte dopo qualche pixel, così un clic resta un clic; se invece c'è stato,
 * il clic che segue viene ignorato e non apre l'anteprima o sceglie una voce per sbaglio.
 * Durante il trascinamento lo scroll-snap è sospeso, poi il browser porta la voce più
 * vicina al bordo.
 */
export function useDragScroll(ref: RefObject<HTMLElement | null>) {
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    let start: { x: number; left: number; id: number } | null = null;
    let dragging = false;

    const down = (e: PointerEvent) => {
      if (e.pointerType !== "mouse" || e.button !== 0) return;
      if (el.scrollWidth <= el.clientWidth) return;
      start = { x: e.clientX, left: el.scrollLeft, id: e.pointerId };
    };
    const move = (e: PointerEvent) => {
      if (!start) return;
      const dx = e.clientX - start.x;
      if (!dragging && Math.abs(dx) < 6) return;
      if (!dragging) {
        dragging = true;
        el.style.scrollSnapType = "none";
        el.style.cursor = "grabbing";
        el.setPointerCapture(start.id);
      }
      el.scrollLeft = start.left - dx;
    };
    const up = () => {
      if (!start) return;
      start = null;
      if (!dragging) return;
      el.style.scrollSnapType = "";
      el.style.cursor = "";
      // Il clic arriva subito dopo il rilascio: si scarta quello, e solo quello
      const swallow = (e: MouseEvent) => {
        e.preventDefault();
        e.stopPropagation();
      };
      el.addEventListener("click", swallow, { capture: true, once: true });
      window.setTimeout(() => el.removeEventListener("click", swallow, { capture: true }), 0);
      dragging = false;
    };
    // Le immagini non devono partire col trascinamento nativo del browser
    const noDrag = (e: DragEvent) => e.preventDefault();

    el.addEventListener("pointerdown", down);
    el.addEventListener("pointermove", move);
    el.addEventListener("pointerup", up);
    el.addEventListener("pointercancel", up);
    el.addEventListener("dragstart", noDrag);
    return () => {
      el.removeEventListener("pointerdown", down);
      el.removeEventListener("pointermove", move);
      el.removeEventListener("pointerup", up);
      el.removeEventListener("pointercancel", up);
      el.removeEventListener("dragstart", noDrag);
    };
  }, [ref]);
}
