"use client";

import { useEffect, useRef, type CSSProperties, type RefObject } from "react";
import { Figure } from "@/components/ui/figure";

/**
 * Tile shapes, sized against the 1536px reference (17.43px root):
 * 454×321 ≈ 26rem, 504×356 ≈ 29rem, 454×606 ≈ 26rem portrait.
 */
const SHAPES = {
  landscape: { ratio: "aspect-[454/321]", width: "md:w-[26rem]" },
  wide: { ratio: "aspect-[504/356]", width: "md:w-[29rem]" },
  portrait: { ratio: "aspect-[454/606]", width: "md:w-[26rem]" },
} as const;

type Tile = {
  shape: keyof typeof SHAPES;
  /** Desktop position inside the band, in rem. */
  x: number;
  y: number;
  objectPosition: string;
};

/** Staggered so no two tiles overlap; the band is 45rem (~780px) tall. */
const TILES: Tile[] = [
  { shape: "landscape", x: 1.5, y: 0, objectPosition: "20% 30%" },
  { shape: "landscape", x: 19, y: 24, objectPosition: "70% 60%" },
  { shape: "wide", x: 37, y: 2, objectPosition: "45% 20%" },
  { shape: "portrait", x: 70, y: 8, objectPosition: "85% 50%" },
  { shape: "landscape", x: 100, y: 0, objectPosition: "10% 75%" },
  { shape: "wide", x: 113, y: 23, objectPosition: "60% 40%" },
  { shape: "landscape", x: 132, y: 2, objectPosition: "35% 85%" },
  { shape: "portrait", x: 164, y: 10, objectPosition: "55% 15%" },
];

/** Desktop track width: last tile's right edge plus a gutter. */
const TRACK_WIDTH = 191.5;

const DESKTOP = "(min-width: 48rem)";
const REDUCED_MOTION = "(prefers-reduced-motion: reduce)";

/**
 * Translates `track` horizontally as `band` scrolls through the viewport:
 * from fully shifted left (last tiles in view) when the band enters at the
 * bottom, to rest (first tiles in view) when it leaves at the top.
 * Only runs on desktop without reduced motion.
 */
function useScrollDrift(
  bandRef: RefObject<HTMLDivElement | null>,
  trackRef: RefObject<HTMLDivElement | null>,
) {
  useEffect(() => {
    const band = bandRef.current;
    const track = trackRef.current;
    if (!band || !track) return;

    const desktop = window.matchMedia(DESKTOP);
    const motion = window.matchMedia(REDUCED_MOTION);
    let frame = 0;
    let visible = false;

    const update = () => {
      frame = 0;
      const rect = band.getBoundingClientRect();
      const vh = window.innerHeight;
      const progress = Math.min(
        1,
        Math.max(0, (vh - rect.top) / (vh + rect.height)),
      );
      const distance = Math.max(0, track.offsetWidth - band.clientWidth);
      track.style.transform = `translate3d(${-(1 - progress) * distance}px, 0, 0)`;
    };

    const schedule = () => {
      if (!frame) frame = requestAnimationFrame(update);
    };

    const active = () => desktop.matches && !motion.matches;

    const onScroll = () => {
      if (visible && active()) schedule();
    };

    const reset = () => {
      cancelAnimationFrame(frame);
      frame = 0;
      if (active()) schedule();
      else track.style.transform = "";
    };

    const observer = new IntersectionObserver(([entry]) => {
      visible = entry.isIntersecting;
      if (visible && active()) schedule();
    });
    observer.observe(band);

    reset();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", reset);
    desktop.addEventListener("change", reset);
    motion.addEventListener("change", reset);

    return () => {
      cancelAnimationFrame(frame);
      observer.disconnect();
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", reset);
      desktop.removeEventListener("change", reset);
      motion.removeEventListener("change", reset);
    };
  }, [bandRef, trackRef]);
}

/**
 * Full-bleed band of scattered placeholder tiles.
 * Desktop: absolutely positioned, wider than the viewport, drifting with scroll.
 * Mobile: a horizontal scroll-snap row.
 * Reduced motion on desktop: no drift; the band scrolls horizontally instead.
 */
export function WorkGallery({ className = "" }: { className?: string }) {
  const bandRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  useScrollDrift(bandRef, trackRef);

  return (
    <div
      ref={bandRef}
      className={`overflow-x-auto snap-x snap-mandatory scroll-px-gutter md:snap-none md:overflow-hidden md:motion-reduce:overflow-x-auto ${className}`}>
      <div
        ref={trackRef}
        className="flex w-max items-start gap-4 px-gutter will-change-transform md:relative md:block md:h-[45rem] md:w-(--track) md:px-0"
        style={{ "--track": `${TRACK_WIDTH}rem` } as CSSProperties}>
        {TILES.map((tile, i) => {
          const shape = SHAPES[tile.shape];
          return (
            <div
              key={i}
              className={`w-[70vw] shrink-0 snap-start md:absolute md:top-(--y) md:left-(--x) ${shape.width}`}
              style={
                { "--x": `${tile.x}rem`, "--y": `${tile.y}rem` } as CSSProperties
              }>
              <Figure
                image={i + 2}
                ratio={shape.ratio}
                sizes="(min-width: 48rem) 30vw, 70vw"
                objectPosition={tile.objectPosition}
              />
            </div>
          );
        })}
      </div>
    </div>
  );
}
