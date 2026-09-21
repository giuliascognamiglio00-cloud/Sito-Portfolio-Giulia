/**
 * Indirizzo pubblico del sito, usato da metadata, sitemap e hreflang.
 * Va aggiornato quando il dominio custom sarà attivo (milestone M8).
 * In sviluppo e nelle anteprime Cloudflare il valore non ha effetti visibili.
 */
export const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? "https://giuliascognamiglio.pages.dev";
