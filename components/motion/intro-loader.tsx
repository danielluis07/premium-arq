"use client";

import { useLayoutEffect, useRef } from "react";
import type { MotionWindow } from "@/lib/motion";

/** The second word of "Lorem ___." cycles through these. */
const WORDS = ["ipsum", "dolor", "amet", "elit", "magna"];
const WORD_MS = 250;
/** Hero highlight wipe + nav fade (see globals.css); a little slack before cleanup. */
const WIPE_MS = 700;

/**
 * First-visit intro: a paper overlay with a black "Lorem ___." box whose second
 * word cycles, then the overlay drops and the hero H1's black highlight wipes
 * away while the nav fades in (~2s total).
 *
 * The overlay is in the server HTML but hidden unless <html data-intro> is set
 * by the boot script, so no-JS visitors and crawlers never see it. The LCP
 * image keeps loading underneath.
 */
export function IntroLoader() {
  const wordRef = useRef<HTMLSpanElement>(null);

  // Layout effect: re-apply the boot attributes before paint (see lib/motion.ts).
  useLayoutEffect(() => {
    const root = document.documentElement;
    const w = window as MotionWindow;
    w.__motionReady = true;
    root.setAttribute("data-js", "");

    if (!w.__introPending) return;

    const word = wordRef.current;
    const timers: number[] = [];
    const at = (ms: number, fn: () => void) =>
      timers.push(window.setTimeout(fn, ms));

    root.setAttribute("data-intro", "words");
    WORDS.forEach((text, i) =>
      at(i * WORD_MS, () => {
        if (word) word.textContent = text;
      }),
    );
    const wipeAt = WORDS.length * WORD_MS;
    at(wipeAt, () => root.setAttribute("data-intro", "wipe"));
    at(wipeAt + WIPE_MS, () => {
      root.removeAttribute("data-intro");
      w.__introPending = false;
    });

    return () => timers.forEach(clearTimeout);
  }, []);

  return (
    <div
      aria-hidden
      className="intro-overlay fixed inset-0 z-40 items-center justify-center bg-paper px-gutter">
      <p className="bg-ink px-[0.25em] pb-[0.1em] text-h2 text-paper md:text-display">
        Lorem <span ref={wordRef}>{WORDS[0]}</span>.
      </p>
    </div>
  );
}
