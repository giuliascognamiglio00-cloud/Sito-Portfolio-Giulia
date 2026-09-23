import type { Category, Project } from "../types";
import { rikka } from "./rikka";
import { theLastOfUs } from "./the-last-of-us";
import { oculus } from "./oculus";
import { doggo } from "./doggo";
import { syntonia } from "./syntonia";

// Per aggiungere un progetto: creare il file e metterlo in questo elenco.
// ATTENZIONE: le date sono provvisorie, ricavate dall'ordine della bozza. Da confermare con Giulia.
const projects: Project[] = [syntonia, rikka, theLastOfUs, oculus, doggo];

/** Tutti i progetti, dal più recente. */
export function getProjects(category?: Category): Project[] {
  return projects
    .filter((p) => !category || p.category === category)
    .sort((a, b) => b.date.localeCompare(a.date));
}

export function getProject(slug: string): Project | undefined {
  return projects.find((p) => p.slug === slug);
}

/** Il progetto che segue nell'elenco, tornando al primo dopo l'ultimo. */
export function getNextProject(slug: string): Project {
  const list = getProjects();
  const i = list.findIndex((p) => p.slug === slug);
  return list[(i + 1) % list.length];
}
