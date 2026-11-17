"use client";

import { useRef, useState } from "react";
import { navLinks } from "./nav-data";
import { NavLink } from "./nav-link";

export function MobileMenu() {
  const dialogRef = useRef<HTMLDialogElement>(null);
  const [open, setOpen] = useState(false);

  // Native modal <dialog> provides the focus trap, Esc to close and inert background.
  function show() {
    dialogRef.current?.showModal();
    setOpen(true);
  }

  return (
    <div data-intro-nav className="sm:hidden">
      <button
        type="button"
        aria-expanded={open}
        aria-haspopup="dialog"
        onClick={show}
        className="text-base">
        Menu
      </button>
      <dialog
        ref={dialogRef}
        aria-label="Menu"
        onClose={() => setOpen(false)}
        className="fixed inset-0 m-0 h-dvh max-h-none w-screen max-w-none bg-paper p-gutter text-ink backdrop:bg-transparent">
        <div className="flex h-[3rem] items-center justify-end">
          <button
            type="button"
            onClick={() => dialogRef.current?.close()}
            className="text-base">
            Close
          </button>
        </div>
        <nav aria-label="Principal" className="mt-8 flex flex-col gap-4">
          {navLinks.map((l) => (
            <NavLink
              key={l.label}
              href={l.href}
              active={l.active}
              className="text-h3">
              {l.label}
            </NavLink>
          ))}
        </nav>
      </dialog>
    </div>
  );
}
