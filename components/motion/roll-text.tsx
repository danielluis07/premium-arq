import type { CSSProperties } from "react";

/**
 * Hover "roll" for link labels: the label is drawn twice in a clipped line box;
 * when the nearest link is hovered or focused, the first copy slides up out of
 * view and the second slides in from below (see .roll-* in globals.css).
 *
 * `perChar` moves each character separately with a ~15ms stagger; otherwise
 * the whole line moves at once. Pure CSS: put it inside the element that
 * should carry any underline, so the underline stays put.
 *
 * Screen readers get the label once, from a visually hidden copy.
 */
export function RollText({
  children,
  suffix = "",
  perChar = false,
}: {
  children: string;
  /** Decorative text appended to both visual copies only (e.g. " +"). */
  suffix?: string;
  perChar?: boolean;
}) {
  const visual = children + suffix;
  const copy = perChar ? (
    Array.from(visual, (char, i) => (
      <span
        key={i}
        className="roll-unit"
        style={{ "--i": i } as CSSProperties}>
        {char}
      </span>
    ))
  ) : (
    <span className="roll-unit">{visual}</span>
  );

  return (
    <>
      <span className="sr-only">{children}</span>
      <span aria-hidden className="roll">
        <span className="block">{copy}</span>
        <span className="roll-clone">{copy}</span>
      </span>
    </>
  );
}
