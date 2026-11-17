"use client";

import { useEffect, useRef } from "react";

/** Same query gates the CSS (.cursor-dot in globals.css). */
const ENABLED =
  "(hover: hover) and (pointer: fine) and (prefers-reduced-motion: no-preference)";
/** Share of the remaining distance covered each frame. */
const LERP = 0.15;
const INTERACTIVE =
  'a, button, [role="button"], summary, label, select, input, textarea';

/**
 * A 14px dot that eases after the pointer, on top of everything. It's white
 * with `mix-blend-mode: difference`, so it reads black on paper and white over
 * black areas, and grows over interactive elements. The native cursor stays.
 * Desktop fine pointers only; off under reduced motion.
 */
export function Cursor() {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const dot = ref.current;
    const query = window.matchMedia(ENABLED);
    if (!dot) return;

    let frame = 0;
    let x = 0;
    let y = 0;
    let tx = 0;
    let ty = 0;
    let placed = false;

    const tick = () => {
      x += (tx - x) * LERP;
      y += (ty - y) * LERP;
      if (Math.abs(tx - x) < 0.1 && Math.abs(ty - y) < 0.1) {
        x = tx;
        y = ty;
        frame = 0;
      } else {
        frame = requestAnimationFrame(tick);
      }
      dot.style.transform = `translate3d(${x}px, ${y}px, 0)`;
    };

    const onMove = (e: PointerEvent) => {
      if (e.pointerType !== "mouse") return;
      tx = e.clientX;
      ty = e.clientY;
      // Appear where the pointer is instead of sliding in from the corner.
      if (!placed) {
        x = tx;
        y = ty;
        placed = true;
      }
      dot.dataset.visible = "";
      if (!frame) frame = requestAnimationFrame(tick);
    };

    const onOver = (e: PointerEvent) => {
      const hit = e.target instanceof Element && e.target.closest(INTERACTIVE);
      dot.toggleAttribute("data-hover", Boolean(hit));
    };

    const onLeave = () => {
      delete dot.dataset.visible;
      placed = false;
    };

    const attach = () => {
      window.addEventListener("pointermove", onMove, { passive: true });
      document.addEventListener("pointerover", onOver, { passive: true });
      document.documentElement.addEventListener("pointerleave", onLeave);
    };
    const detach = () => {
      window.removeEventListener("pointermove", onMove);
      document.removeEventListener("pointerover", onOver);
      document.documentElement.removeEventListener("pointerleave", onLeave);
      cancelAnimationFrame(frame);
      frame = 0;
      onLeave();
    };

    const onQueryChange = () => (query.matches ? attach() : detach());
    if (query.matches) attach();
    query.addEventListener("change", onQueryChange);

    return () => {
      detach();
      query.removeEventListener("change", onQueryChange);
    };
  }, []);

  return <div ref={ref} aria-hidden className="cursor-dot" />;
}
