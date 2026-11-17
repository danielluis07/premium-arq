import { LineReveal, RevealWords } from "@/components/motion/line-reveal";

/** Display-size section statement; reveals line by line on scroll. */
export function Statement({
  children,
  className = "",
}: {
  children: string;
  className?: string;
}) {
  return (
    <LineReveal className={`text-display text-left ${className}`}>
      <RevealWords text={children} />
    </LineReveal>
  );
}
