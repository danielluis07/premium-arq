import Image from "next/image";
import { PLACEHOLDER_IMAGE } from "@/lib/placeholder";

type FigureProps = {
  /** Tailwind aspect/height classes for the box, e.g. "aspect-[4/5]" or "h-[40rem]". */
  ratio?: string;
  /** CSS object-position, to show a different crop of the same photo. */
  objectPosition?: string;
  /** Responsive `sizes` hint; defaults to full viewport width. */
  sizes?: string;
  /** Load immediately with high fetch priority. Use for the LCP image only. */
  eager?: boolean;
  alt?: string;
  className?: string;
};

export function Figure({
  ratio = "aspect-[4/3]",
  objectPosition = "center",
  sizes = "100vw",
  eager,
  alt = "",
  className = "",
}: FigureProps) {
  return (
    <div className={`relative w-full overflow-hidden ${ratio} ${className}`}>
      <Image
        src={PLACEHOLDER_IMAGE}
        alt={alt}
        fill
        sizes={sizes}
        loading={eager ? "eager" : "lazy"}
        fetchPriority={eager ? "high" : undefined}
        className="object-cover"
        style={{ objectPosition }}
      />
    </div>
  );
}
