/**
 * Pagine in lavorazione. Al loro indirizzo compare la pagina "Work in progress" invece del
 * contenuto, e i link che portano lì spariscono dal sito, come se fossero archiviate.
 *
 * I percorsi sono senza lingua e senza barre agli estremi, come i segmenti di routes.ts:
 * "works/syntonia" vale per /it/works/syntonia/ e per /en/works/syntonia/.
 * Per mettere o togliere una pagina dal WIP basta questo elenco: la procedura è in CLAUDE.md.
 */
export const WIP_PATHS: readonly string[] = ["works/syntonia", "about"];

/** Se la pagina con questi segmenti di percorso (senza lingua) è in lavorazione. */
export function isWip(...segments: string[]): boolean {
  return WIP_PATHS.includes(segments.join("/"));
}
