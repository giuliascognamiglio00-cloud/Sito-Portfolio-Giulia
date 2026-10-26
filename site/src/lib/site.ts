/**
 * Indirizzo pubblico del sito, usato da metadata, sitemap e hreflang.
 * È il dominio collegato al Worker di Cloudflare (milestone M8).
 * In sviluppo e nelle anteprime Cloudflare il valore non ha effetti visibili.
 */
export const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? "https://giuliascognamiglio.com";
