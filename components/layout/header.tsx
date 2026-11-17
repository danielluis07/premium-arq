import { navLinks } from "./nav-data";
import { NavLink } from "./nav-link";
import { MobileMenu } from "./mobile-menu";
import { Wordmark } from "./wordmark";

export function Header() {
  return (
    <header className="fixed inset-x-0 top-0 z-50 flex h-[4.5rem] items-center justify-between bg-paper px-gutter">
      <div className="flex items-center gap-8">
        <Wordmark />
        <nav aria-label="Principal" className="hidden gap-4 sm:flex">
          {navLinks.map((l) => (
            <NavLink key={l.label} href={l.href} active={l.active}>
              {l.label}
            </NavLink>
          ))}
        </nav>
      </div>
      <MobileMenu />
    </header>
  );
}
