import type { SectionItem } from "@/content/types";
import Artwork from "./Artwork";
import Picture from "./Picture";
import Slides from "./Slides";

type Props = {
  item: SectionItem;
  sizes: string;
  className?: string;
  /** Etichetta dei pallini del carosello, con {n} al posto del numero */
  goToTemplate: string;
  openArtworkLabel: string;
  closeArtworkLabel: string;
};

/**
 * L'immagine di un riquadro: una sola, oppure un piccolo carosello da sfogliare quando il
 * riquadro ne ha più d'una.
 */
export default function SectionMedia({
  item,
  sizes,
  className,
  goToTemplate,
  openArtworkLabel,
  closeArtworkLabel,
}: Props) {
  if (item.artwork) {
    const [mockup] = item.images;
    return (
      <Artwork
        openLabel={openArtworkLabel}
        closeLabel={closeArtworkLabel}
        artwork={
          <Picture name={item.artwork.key} alt={item.artwork.alt} sizes="94vw" priority={false} />
        }
      >
        <Picture name={mockup.key} alt={mockup.alt} sizes={sizes} />
      </Artwork>
    );
  }

  if (item.images.length > 1) {
    return (
      <Slides
        images={item.images}
        sizes={sizes}
        label={item.title ?? ""}
        goToTemplate={goToTemplate}
      />
    );
  }

  const [image] = item.images;
  return <Picture name={image.key} alt={image.alt} sizes={sizes} className={className} />;
}
