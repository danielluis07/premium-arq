"use client";

import { useEffect, useRef } from "react";
import { Figure } from "@/components/ui/figure";

const TILE_COUNT = 24;
const STEP = 360 / TILE_COUNT;
/** Resting spin, in degrees per second. */
const BASE_SPEED = 5;
/** Extra degrees per second for each px/s of scroll velocity. */
const SCROLL_GAIN = 0.03;
const MAX_BOOST = 60;
/** Static pose used for SSR and reduced motion. */
const INITIAL_ANGLE = STEP / 2;

/**
 * A band of image tiles wrapped around an invisible vertical cylinder,
 * built with CSS 3D transforms. Spins slowly; scrolling nudges the speed.
 *
 * Sizing comes from CSS variables on the stage so the breakpoints live in
 * markup: `--cx` (axis position), `--r` (cylinder radius).
 * Tile width is the chord between neighbours minus a small gap.
 */
export function ImageRing({ className = "" }: { className?: string }) {
  const stageRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const stage = stageRef.current;
    const ring = ringRef.current;
    if (!stage || !ring) return;

    const motion = window.matchMedia("(prefers-reduced-motion: reduce)");
    let angle = INITIAL_ANGLE;
    let boost = 0;
    let frame = 0;
    let last = 0;
    let lastScroll = window.scrollY;
    let visible = false;

    const tick = (now: number) => {
      const dt = last ? Math.min((now - last) / 1000, 0.1) : 0;
      last = now;

      if (dt > 0) {
        const scroll = window.scrollY;
        const velocity = (scroll - lastScroll) / dt;
        lastScroll = scroll;
        const target = Math.max(
          -MAX_BOOST,
          Math.min(MAX_BOOST, velocity * SCROLL_GAIN),
        );
        // Ease toward the scroll-driven target so the nudge decays smoothly.
        boost += (target - boost) * Math.min(1, dt * 4);
      }

      angle = (angle + (BASE_SPEED + boost) * dt) % 360;
      ring.style.transform = `rotateY(${-angle}deg)`;
      frame = requestAnimationFrame(tick);
    };

    const start = () => {
      if (frame || motion.matches || !visible) return;
      last = 0;
      lastScroll = window.scrollY;
      frame = requestAnimationFrame(tick);
    };
    const stop = () => {
      cancelAnimationFrame(frame);
      frame = 0;
    };

    const onMotionChange = () => {
      if (motion.matches) {
        stop();
        angle = INITIAL_ANGLE;
        boost = 0;
        ring.style.transform = `rotateY(${-angle}deg)`;
      } else {
        start();
      }
    };

    const observer = new IntersectionObserver(([entry]) => {
      visible = entry.isIntersecting;
      if (visible) start();
      else stop();
    });
    observer.observe(stage);
    motion.addEventListener("change", onMotionChange);

    return () => {
      stop();
      observer.disconnect();
      motion.removeEventListener("change", onMotionChange);
    };
  }, []);

  return (
    <div
      ref={stageRef}
      aria-hidden
      className={`pointer-events-none overflow-hidden [perspective:calc(var(--r)*5)] [perspective-origin:var(--cx)_50%] ${className}`}>
      {/* Tilt: seen from above, so the far arc shows over the near one. */}
      <div className="absolute top-1/2 left-(--cx) transform-3d [transform:rotateX(-11deg)]">
        <div
          ref={ringRef}
          className="transform-3d"
          style={{ transform: `rotateY(${-INITIAL_ANGLE}deg)` }}>
          {Array.from({ length: TILE_COUNT }, (_, i) => (
            <div
              key={i}
              className="absolute top-0 left-0 h-[calc(var(--r)*0.3)] w-[calc(var(--r)*0.25)]"
              style={{
                transform: `translate(-50%, -50%) rotateY(${i * STEP}deg) translateZ(var(--r))`,
              }}>
              <Figure
                ratio="h-full"
                sizes="(min-width: 48rem) 12vw, 15vw"
                objectPosition={`${(i * 37) % 100}% ${30 + ((i * 23) % 50)}%`}
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
