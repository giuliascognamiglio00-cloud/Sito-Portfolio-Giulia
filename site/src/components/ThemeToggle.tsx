"use client";

import { useSyncExternalStore } from "react";
import type { Dictionary } from "@/lib/i18n";
import styles from "./ThemeToggle.module.css";

type Theme = "light" | "dark";

/**
 * Il tema non vive in React: sta sull'attributo data-theme del <html>, dove lo mette
 * ThemeScript prima del primo disegno. Qui lo leggiamo come stato esterno, così il
 * bottone resta allineato anche se il sistema operativo cambia tema mentre la pagina
 * è aperta.
 */
const listeners = new Set<() => void>();

function notify() {
  for (const listener of listeners) listener();
}

function subscribe(onChange: () => void) {
  listeners.add(onChange);
  const query = window.matchMedia("(prefers-color-scheme: dark)");
  query.addEventListener("change", onChange);
  return () => {
    listeners.delete(onChange);
    query.removeEventListener("change", onChange);
  };
}

function getSnapshot(): Theme {
  const explicit = document.documentElement.getAttribute("data-theme");
  if (explicit === "dark" || explicit === "light") return explicit;
  return window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
}

// Durante il rendering sul server il tema non è conoscibile: il bottone resta neutro
// fino all'idratazione, per non annunciare a voce l'azione sbagliata.
function getServerSnapshot(): Theme | null {
  return null;
}

export default function ThemeToggle({ dict }: { dict: Dictionary }) {
  const theme = useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);

  function toggle() {
    const next: Theme = theme === "dark" ? "light" : "dark";
    document.documentElement.setAttribute("data-theme", next);
    try {
      localStorage.setItem("theme", next);
    } catch {
      // Navigazione privata o storage bloccato: la scelta vale solo per questa visita.
    }
    notify();
  }

  const label =
    theme === "dark"
      ? dict.common.themeLight
      : theme === "light"
        ? dict.common.themeDark
        : dict.common.themeToggle;

  return (
    <button type="button" className={styles.toggle} onClick={toggle} aria-label={label} title={label}>
      <span className={styles.dot} aria-hidden="true" />
    </button>
  );
}
