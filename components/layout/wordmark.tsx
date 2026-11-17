import Link from "next/link";

export function Wordmark({ className = "" }: { className?: string }) {
  return (
    <Link
      href="/"
      aria-label="Premium Arq — início"
      className={`text-[1.5rem] font-bold leading-none tracking-[-0.06em] ${className}`}>
      premium<span aria-hidden>.</span>arq
    </Link>
  );
}
