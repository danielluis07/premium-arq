"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { RollText } from "@/components/motion/roll-text";

/** Underlined while the current route is `href` or below it. */
export function NavLink({
  href,
  children,
  className = "",
}: {
  href: string;
  children: string;
  className?: string;
}) {
  const pathname = usePathname();
  const active =
    href.startsWith("/") &&
    (pathname === href || pathname.startsWith(`${href}/`));
  return (
    <Link
      href={href}
      aria-current={active ? "page" : undefined}
      className={`inline-block text-base ${className}`}>
      <span
        className={`inline-block border-b pb-0.5 ${active ? "border-black" : "border-transparent"}`}>
        <RollText perChar>{children}</RollText>
      </span>
    </Link>
  );
}
