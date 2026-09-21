import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Export statico: il build produce HTML e asset in out/, senza bisogno di un server.
  // È quello che Cloudflare Pages pubblica.
  output: "export",

  // L'ottimizzazione automatica delle immagini di Next richiede un server.
  // Le nostre varianti sono pre-generate a build time da scripts/optimize-images.mjs.
  images: { unoptimized: true },

  // Ogni rotta diventa una cartella con dentro index.html: è il modo in cui
  // gli host statici risolvono /it/works/ senza riscritture.
  trailingSlash: true,

  reactStrictMode: true,
};

export default nextConfig;
