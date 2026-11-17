import Link from "next/link";
import type { ComponentProps } from "react";

export function TextLink({
  children,
  className = "",
  ...props
}: ComponentProps<typeof Link>) {
  return (
    <Link
      className={`inline-block text-base font-medium ${className}`}
      {...props}>
      {/* Label lives in its own span so the motion issue can duplicate it for the hover roll. */}
      <span className="inline-block border-b border-black pb-0.5">
        <span>{children}</span>
        <span aria-hidden> +</span>
      </span>
    </Link>
  );
}
