import type { ReactNode } from "react";

export function Statement({
  children,
  className = "",
}: {
  children: ReactNode;
  className?: string;
}) {
  return <h2 className={`text-display text-left ${className}`}>{children}</h2>;
}
