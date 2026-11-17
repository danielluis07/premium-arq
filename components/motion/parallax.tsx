"use client";

import { useEffect, useRef, type ReactNode } from "react";
import { REDUCED_MOTION } from "@/lib/motion";

/** Max shift, as a fraction of the frame height, each way. */
const RANGE = 0.05;

/**
 * Oversized (110%) layer inside an overflow-hidden frame that drifts up to ±5%
 * of the frame's height as the frame crosses the viewport: offset up while the
 * frame is below centre, down once it's above, so the image lags the page.
 *
 * Static and centred under reduced motion or before hydration.
 */
export function Parallax({ children }: { children: ReactNode }) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const layer = ref.current;
    const frameEl = layer?.parentElement;
    if (!layer || !frameEl) return;

    const motion = window.matchMedia(REDUCED_MOTION);
    let frame = 0;
    let visible = false;

    const update = () => {
      frame = 0;
      const rect = frameEl.getBoundingClientRect();
      const vh = window.innerHeight;
      // -1 when the frame's centre is a half-frame above the viewport, +1 below it.
      const progress = Math.max(
        -1,
        Math.min(
          1,
          (rect.top + rect.height / 2 - vh / 2) / ((vh + rect.height) / 2),
        ),
      );
      layer.style.transform = `translate3d(0, ${-progress * RANGE * rect.height}px, 0)`;
    };

    const schedule = () => {
      if (!frame && visible && !motion.matches) {
        frame = requestAnimationFrame(update);
      }
    };

    const reset = () => {
      cancelAnimationFrame(frame);
      frame = 0;
      if (motion.matches) layer.style.transform = "";
      else schedule();
    };

    const observer = new IntersectionObserver(([entry]) => {
      visible = entry.isIntersecting;
      schedule();
    });
    observer.observe(frameEl);
    window.addEventListener("scroll", schedule, { passive: true });
    window.addEventListener("resize", schedule);
    motion.addEventListener("change", reset);

    return () => {
      cancelAnimationFrame(frame);
      observer.disconnect();
      window.removeEventListener("scroll", schedule);
      window.removeEventListener("resize", schedule);
      motion.removeEventListener("change", reset);
    };
  }, []);

  return (
    <div
      ref={ref}
      className="absolute inset-x-0 -top-[5%] h-[110%] will-change-transform motion-reduce:will-change-auto">
      {children}
    </div>
  );
}
