import Link from "next/link";
import type { ComponentProps } from "react";
import { RollText } from "@/components/motion/roll-text";

/**
 * The underlined "Label +" look of a TextLink, without the anchor.
 * Use it inside a larger link (e.g. a whole card) where nesting a second <a> would be invalid;
 * hovering that link still rolls the label.
 */
export function TextLinkLabel({
  children,
  className = "",
}: {
  children: string;
  className?: string;
}) {
  return (
    <span className={`inline-block text-base font-medium ${className}`}>
      <span className="inline-block border-b border-black pb-0.5">
        <RollText suffix=" +">{children}</RollText>
      </span>
    </span>
  );
}

export function TextLink({
  children,
  className = "",
  ...props
}: Omit<ComponentProps<typeof Link>, "children"> & { children: string }) {
  return (
    <Link className={`inline-block ${className}`} {...props}>
      <TextLinkLabel>{children}</TextLinkLabel>
    </Link>
  );
}
