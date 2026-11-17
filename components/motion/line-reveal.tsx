"use client";

import { useEffect, useRef, type ReactNode } from "react";
import { REDUCED_MOTION } from "@/lib/motion";

/**
 * Heading whose `RevealWords` rise into place line by line the first time it
 * enters the viewport (~700ms each, ~80ms stagger per line).
 *
 * Lines are measured at reveal time, from where each word actually sits, so
 * they're always right for the current width. Before that, and after it, the
 * markup is plain words and wraps freely on resize.
 *
 * The hidden state is pure CSS gated on <html data-js> and
 * `prefers-reduced-motion: no-preference`, so server HTML, no-JS and reduced
 * motion all show the text as-is.
 */
export function LineReveal({
  as: Tag = "h2",
  children,
  className = "",
}: {
  as?: "h1" | "h2";
  children: ReactNode;
  className?: string;
}) {
  const ref = useRef<HTMLHeadingElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const done = () => el.setAttribute("data-revealed", "");

    // The intro's highlight wipe stands in for the hero title's reveal.
    if (
      window.matchMedia(REDUCED_MOTION).matches ||
      (document.documentElement.hasAttribute("data-intro") &&
        el.querySelector(".intro-highlight"))
    ) {
      done();
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;
        observer.disconnect();

        let line = -1;
        let lastTop = -Infinity;
        for (const word of el.querySelectorAll<HTMLElement>(".reveal-word")) {
          const top = word.offsetTop;
          if (top > lastTop + 2) {
            line++;
            lastTop = top;
          }
          word.style.setProperty("--line", String(line));
        }
        done();
      },
      { rootMargin: "0px 0px -10% 0px" },
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <Tag ref={ref} data-reveal className={className}>
      {children}
    </Tag>
  );
}

/**
 * Splits text into masked words for `LineReveal`. Whitespace is kept as text,
 * so `white-space: pre-line` still honours "\n" breaks from the content.
 */
export function RevealWords({ text }: { text: string }) {
  return text.split(/(\s+)/).map((token, i) =>
    token === "" || /^\s+$/.test(token) ? (
      token
    ) : (
      <span key={i} className="reveal-word">
        <span>{token}</span>
      </span>
    ),
  );
}
