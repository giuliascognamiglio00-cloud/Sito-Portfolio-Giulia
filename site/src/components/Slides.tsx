"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import Picture from "./Picture";
import styles from "./Slides.module.css";

type Props = {
  images: { key: string; alt: string }[];
  sizes: string;
  /** Nome accessibile del gruppo */
  label: string;
  /** Etichetta dei pallini, con {n} al posto del numero */
  goToTemplate: string;
};

/**
 * Un riquadro solo, da sfogliare come un carosello di un post: una immagine per volta, si
 * scorre col dito, trascinando col mouse, con le frecce della tastiera o con i pallini.
 * Diverso dal Carousel della pagina, che mostra più slide affiancate e ha la sua barra.
 */
export default function Slides({ images, sizes, label, goToTemplate }: Props) {
  const track = useRef<HTMLDivElement>(null);
  const drag = useRef<{ x: number; left: number } | null>(null);
  const [index, setIndex] = useState(0);
  const [dragging, setDragging] = useState(false);

  const update = useCallback(() => {
    const el = track.current;
    if (!el) return;
    const step = el.clientWidth;
    setIndex(step > 0 ? Math.min(images.length - 1, Math.round(el.scrollLeft / step)) : 0);
  }, [images.length]);

  useEffect(() => {
    window.addEventListener("resize", update);
    return () => window.removeEventListener("resize", update);
  }, [update]);

  const go = (to: number) => {
    const el = track.current;
    if (!el) return;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    el.scrollTo({ left: to * el.clientWidth, behavior: reduce ? "auto" : "smooth" });
  };

  const onPointerDown = (e: React.PointerEvent<HTMLDivElement>) => {
    // Col tocco basta lo scorrimento nativo: il trascinamento serve solo al mouse
    if (e.pointerType !== "mouse" || e.button !== 0) return;
    const el = track.current;
    if (!el) return;
    drag.current = { x: e.clientX, left: el.scrollLeft };
    setDragging(true);
    el.setPointerCapture(e.pointerId);
  };

  const onPointerMove = (e: React.PointerEvent<HTMLDivElement>) => {
    const el = track.current;
    if (!drag.current || !el) return;
    el.scrollLeft = drag.current.left - (e.clientX - drag.current.x);
  };

  const endDrag = () => {
    if (!drag.current) return;
    drag.current = null;
    setDragging(false);
  };

  const onKeyDown = (e: React.KeyboardEvent<HTMLDivElement>) => {
    if (e.key !== "ArrowRight" && e.key !== "ArrowLeft") return;
    e.preventDefault();
    go(Math.max(0, Math.min(images.length - 1, index + (e.key === "ArrowRight" ? 1 : -1))));
  };

  return (
    <div className={styles.slides}>
      <div
        ref={track}
        className={`${styles.track} ${dragging ? styles.dragging : ""}`}
        role="group"
        aria-label={label}
        tabIndex={0}
        onScroll={update}
        onKeyDown={onKeyDown}
        onPointerDown={onPointerDown}
        onPointerMove={onPointerMove}
        onPointerUp={endDrag}
        onPointerCancel={endDrag}
      >
        {images.map((image) => (
          <Picture key={image.key} name={image.key} alt={image.alt} sizes={sizes} />
        ))}
      </div>

      <div className={styles.dots}>
        {images.map((image, i) => (
          <button
            key={image.key}
            type="button"
            className={i === index ? styles.on : undefined}
            onClick={() => go(i)}
            aria-label={goToTemplate.replace("{n}", String(i + 1))}
            aria-current={i === index}
          />
        ))}
      </div>
    </div>
  );
}
