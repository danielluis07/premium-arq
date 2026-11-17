import Link from "next/link";

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
      {/* Label in its own span so the motion issue can duplicate it for the letter roll. */}
      <span
        className={`inline-block border-b pb-0.5 ${active ? "border-black" : "border-transparent"}`}>
        {children}
      </span>
    </Link>
  );
}
