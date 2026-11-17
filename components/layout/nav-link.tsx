import Link from "next/link";
import { RollText } from "@/components/motion/roll-text";

export function NavLink({
  href,
  active,
  children,
  className = "",
}: {
  href: string;
  active?: boolean;
  children: string;
  className?: string;
}) {
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
