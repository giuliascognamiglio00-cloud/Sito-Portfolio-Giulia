import type { Category, Project } from "../types";
import { isWip } from "@/lib/wip";
import { rikka } from "./rikka";
import { theLastOfUs } from "./the-last-of-us";
import { oculus } from "./oculus";
import { doggo } from "./doggo";
import { syntonia } from "./syntonia";
import { goliosi } from "./goliosi";
import { muta } from "./muta";

// Per aggiungere un progetto: creare il file e metterlo in questo elenco.
// ATTENZIONE: le date sono provvisorie, ricavate dall'ordine della bozza. Da confermare con Giulia.
const projects: Project[] = [syntonia, goliosi, muta, rikka, theLastOfUs, oculus, doggo];

/**
 * I progetti da mostrare, dal più recente. Quelli in lavorazione (lib/wip.ts) restano fuori:
 * da qui nascono tutti i link ai progetti (schede e "progetto successivo"), così spariscono
 * ovunque insieme.
 */
export function getProjects(category?: Category): Project[] {
  return getAllProjects().filter(
    (p) => (!category || p.category === category) && !isWip("works", p.slug),
  );
}

/** Tutti i progetti, anche quelli in lavorazione: servono a pubblicarne comunque l'indirizzo. */
export function getAllProjects(): Project[] {
  return [...projects].sort((a, b) => b.date.localeCompare(a.date));
}

export function getProject(slug: string): Project | undefined {
  return projects.find((p) => p.slug === slug);
}

/** Il progetto che segue nell'elenco, tornando al primo dopo l'ultimo. Salta quelli in WIP. */
export function getNextProject(slug: string): Project {
  const list = getProjects();
  const i = list.findIndex((p) => p.slug === slug);
  return list[(i + 1) % list.length];
}

