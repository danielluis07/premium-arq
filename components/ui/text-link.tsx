import Link from "next/link";
import type { ComponentProps, ReactNode } from "react";

/**
 * The underlined "Label +" look of a TextLink, without the anchor.
 * Use it inside a larger link (e.g. a whole card) where nesting a second <a> would be invalid.
 */
export function TextLinkLabel({
  children,
  className = "",
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <span className={`inline-block text-base font-medium ${className}`}>
      {/* Label lives in its own span so the motion issue can duplicate it for the hover roll. */}
      <span className="inline-block border-b border-black pb-0.5">
        <span>{children}</span>
        <span aria-hidden> +</span>
      </span>
    </span>
  );
}

export function TextLink({
  children,
  className = "",
  ...props
}: ComponentProps<typeof Link>) {
  return (
    <Link className={`inline-block ${className}`} {...props}>
      <TextLinkLabel>{children}</TextLinkLabel>
    </Link>
  );
}
