"use client";

import { useEffect, useRef, type ReactNode } from "react";

const DURATION = 1500;
const REDUCED_MOTION = "(prefers-reduced-motion: reduce)";

/** Cubic ease-out: fast start, gentle landing. */
const easeOut = (t: number) => 1 - (1 - t) ** 3;

/**
 * Counts every `[data-count-to]` element inside it up from 0 to its target,
 * once, the first time the group enters the viewport.
 *
 * Progressive enhancement: the server HTML (and any child rendered by a server
 * component) already holds the final numbers. Only after hydration, and only
 * without reduced motion, are they reset to 0 and animated. Text is written
 * straight to the DOM so the count doesn't re-render React on every frame.
 * The target element should hold only the number (no live region), so
 * assistive tech reads whatever is there without announcing each frame.
 */
export function CountUp({
  children,
  className = "",
}: {
  children: ReactNode;
  className?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const root = ref.current;
    if (!root || window.matchMedia(REDUCED_MOTION).matches) return;

    const targets = Array.from(
      root.querySelectorAll<HTMLElement>("[data-count-to]"),
      (el) => ({ el, to: Number(el.dataset.countTo) }),
    ).filter(({ to }) => Number.isFinite(to));
    if (!targets.length) return;

    const write = (progress: number) => {
      for (const { el, to } of targets) {
        el.textContent = String(Math.round(to * progress));
      }
    };

    let frame = 0;
    write(0);

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;
        observer.disconnect();

        const start = performance.now();
        const tick = (now: number) => {
          const t = Math.min(1, (now - start) / DURATION);
          write(easeOut(t));
          if (t < 1) frame = requestAnimationFrame(tick);
        };
        frame = requestAnimationFrame(tick);
      },
      { threshold: 0.4 },
    );
    observer.observe(root);

    return () => {
      observer.disconnect();
      cancelAnimationFrame(frame);
      // Never leave a number stuck mid-count (e.g. on unmount during Fast Refresh).
      write(1);
    };
  }, []);

  return (
    <div ref={ref} className={className}>
      {children}
    </div>
  );
}
