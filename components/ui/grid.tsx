import type { ComponentProps } from "react";

/** 24-column grid. Place children with `col-start-*` / `col-span-*`. */
export function Grid({ className = "", ...props }: ComponentProps<"div">) {
  return <div className={`grid grid-cols-24 ${className}`} {...props} />;
}
