"use client";

export function BackToTop({ className = "" }: { className?: string }) {
  function scrollTop() {
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    window.scrollTo({ top: 0, behavior: reduce ? "instant" : "smooth" });
  }

  return (
    <button
      type="button"
      onClick={scrollTop}
      className={`text-small font-medium ${className}`}>
      Back to top <span aria-hidden>↑</span>
    </button>
  );
}
