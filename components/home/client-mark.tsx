import type { ClientLogo } from "@/content/home";

/** Simple geometric symbols for the "mark" treatment, drawn in currentColor. */
function MarkSymbol({ shape }: { shape: NonNullable<ClientLogo["mark"]> }) {
  return (
    <svg viewBox="0 0 24 24" aria-hidden className="size-[1.6rem] shrink-0 fill-current">
      {shape === "circle" && <circle cx="12" cy="12" r="11" />}
      {shape === "square" && <rect x="2" y="2" width="20" height="20" />}
      {shape === "triangle" && <polygon points="12,1 23,23 1,23" />}
      {shape === "half" && (
        <>
          <path d="M12 1a11 11 0 0 0 0 22Z" />
          <circle cx="12" cy="12" r="10.25" fill="none" stroke="currentColor" strokeWidth="1.5" />
        </>
      )}
    </svg>
  );
}

/**
 * Placeholder client wordmark: Invented names set in one of a few deliberately different
 * treatments, so a grid of them reads like a logo wall. Fits within ~140×80px (8×4.6rem).
 */
export function ClientMark({ logo }: { logo: ClientLogo }) {
  const { name, treatment, mark } = logo;

  switch (treatment) {
    case "caps":
      return <span className="text-[1.75rem] font-black uppercase tracking-[-0.04em]">{name}</span>;
    case "serif":
      return <span className="font-serif text-[1.9rem] italic tracking-[-0.02em]">{name}</span>;
    case "wide":
      return <span className="text-[0.85rem] font-light uppercase tracking-[0.4em]">{name}</span>;
    case "lower":
      return <span className="text-[1.6rem] font-semibold lowercase tracking-[-0.05em]">{name}.</span>;
    case "boxed":
      return (
        <span className="border border-current px-2 py-1 text-[0.8rem] font-bold uppercase tracking-[0.2em]">
          {name}
        </span>
      );
    case "stacked":
      return (
        <span className="whitespace-pre-line text-center text-[1.05rem] font-bold uppercase leading-[0.95] tracking-[-0.02em]">
          {name}
        </span>
      );
    case "mark":
      return (
        <span className="flex items-center gap-2 text-[1.3rem] font-medium tracking-[-0.03em]">
          <MarkSymbol shape={mark ?? "circle"} />
          {name}
        </span>
      );
  }
}
