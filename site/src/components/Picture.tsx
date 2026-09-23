import manifest from "@/content/image-manifest.json";

type Entry = { width: number; height: number; widths: number[]; fallback?: "jpg" | "png" };
const images = manifest as Record<string, Entry>;

/**
 * La forma vera di un'immagine, letta dal manifest. Serve alle pagine progetto per adattarsi
 * a chi lavora in orizzontale e a chi lavora in verticale.
 */
export function imageShape(name: string) {
  const entry = images[name];
  if (!entry) return null;
  return { ratio: `${entry.width} / ${entry.height}`, portrait: entry.height > entry.width };
}

const srcSet = (name: string, widths: number[], ext: string) =>
  widths.map((w) => `/img/${name}-${w}.${ext} ${w}w`).join(", ");

type Props = {
  /** Nome del file in assets/img, senza estensione */
  name: string;
  alt: string;
  /** Larghezza a cui l'immagine viene mostrata, per scegliere la variante giusta */
  sizes: string;
  /** Vero per l'immagine in cima alla pagina: niente caricamento pigro */
  priority?: boolean;
  className?: string;
};

/**
 * Immagine responsive: il browser sceglie tra AVIF, WebP e JPEG (PNG per i ritagli trasparenti) e tra le larghezze
 * generate da scripts/optimize-images.mjs. Le misure vere evitano lo scatto del layout.
 */
export default function Picture({ name, alt, sizes, priority = false, className }: Props) {
  const entry = images[name];
  if (!entry) throw new Error(`Immagine sconosciuta: "${name}". Manca in assets/img?`);

  const { width, height, widths, fallback = "jpg" } = entry;
  const largest = widths[widths.length - 1];

  return (
    <picture>
      <source type="image/avif" srcSet={srcSet(name, widths, "avif")} sizes={sizes} />
      <source type="image/webp" srcSet={srcSet(name, widths, "webp")} sizes={sizes} />
      <img
        className={className}
        src={`/img/${name}-${largest}.${fallback}`}
        srcSet={srcSet(name, widths, fallback)}
        sizes={sizes}
        alt={alt}
        width={width}
        height={height}
        loading={priority ? "eager" : "lazy"}
        decoding="async"
        {...(priority ? { fetchPriority: "high" as const } : {})}
      />
    </picture>
  );
}
