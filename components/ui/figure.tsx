import Image from "next/image";
import { Parallax } from "@/components/motion/parallax";
import { imageAt } from "@/lib/placeholder";

type FigureProps = {
  /** Which photo from the pool to show (wraps around). Vary it so neighbours differ. */
  image?: number;
  /** Tailwind aspect/height classes for the box, e.g. "aspect-[4/5]" or "h-[40rem]". */
  ratio?: string;
  /** CSS object-position, to show a different crop of the same photo. */
  objectPosition?: string;
  /** Responsive `sizes` hint; defaults to full viewport width. */
  sizes?: string;
  /** Load immediately with high fetch priority. Use for the LCP image only. */
  eager?: boolean;
  /** Image drifts vertically (±5%) inside the frame on scroll. Use on full-width images. */
  parallax?: boolean;
  alt?: string;
  className?: string;
};

export function Figure({
  image: imageIndex = 0,
  ratio = "aspect-[4/3]",
  objectPosition = "center",
  sizes = "100vw",
  eager,
  parallax,
  alt = "",
  className = "",
}: FigureProps) {
  const image = (
    <Image
      src={imageAt(imageIndex)}
      alt={alt}
      fill
      sizes={sizes}
      loading={eager ? "eager" : "lazy"}
      fetchPriority={eager ? "high" : undefined}
      className="object-cover"
      style={{ objectPosition }}
    />
  );

  return (
    <div className={`relative w-full overflow-hidden ${ratio} ${className}`}>
      {parallax ? <Parallax>{image}</Parallax> : image}
    </div>
  );
}
