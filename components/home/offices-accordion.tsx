"use client";

import { useId, useState } from "react";
import { Figure } from "@/components/ui/figure";
import { Grid } from "@/components/ui/grid";

type Office = { name: string; description: string; contact: string[] };

/** Single-open accordion of offices. A row inverts to black on hover and stays black while open. */
export function OfficesAccordion({
  items,
  className = "",
}: {
  items: Office[];
  className?: string;
}) {
  const baseId = useId();
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <ul className={`border-t border-ink ${className}`}>
      {items.map((office, index) => {
        const open = openIndex === index;
        const buttonId = `${baseId}-button-${index}`;
        const panelId = `${baseId}-panel-${index}`;

        return (
          <li
            key={office.name}
            className={`border-b border-ink transition-colors duration-200 motion-reduce:transition-none ${
              open ? "bg-ink text-paper" : "hover:bg-ink hover:text-paper"
            }`}>
            <h3>
              <button
                type="button"
                id={buttonId}
                aria-expanded={open}
                aria-controls={panelId}
                onClick={() => setOpenIndex(open ? null : index)}
                className="flex w-full cursor-pointer items-center justify-between gap-4 px-4 py-6 text-left text-h2 focus-visible:outline-2 focus-visible:-outline-offset-4 focus-visible:outline-current md:py-8 md:text-display">
                <span>{office.name}</span>
                <span
                  aria-hidden
                  className={`inline-block font-light transition-transform duration-200 motion-reduce:transition-none ${
                    open ? "rotate-45" : ""
                  }`}>
                  +
                </span>
              </button>
            </h3>

            {/* 0fr → 1fr animates to the content's natural height without measuring it. */}
            <div
              id={panelId}
              role="region"
              aria-labelledby={buttonId}
              inert={!open}
              className={`grid transition-[grid-template-rows] duration-500 ease-in-out motion-reduce:transition-none ${
                open ? "grid-rows-[1fr]" : "grid-rows-[0fr]"
              }`}>
              <div className="min-h-0 overflow-hidden">
                <Grid className="gap-y-6 px-4 pb-6 md:gap-x-6 md:pr-6">
                  <div className="col-span-24 flex flex-col justify-between gap-8 md:col-span-12">
                    <p className="text-h3">{office.description}</p>
                    <address className="flex flex-col gap-1 text-small not-italic">
                      {office.contact.map((line) => (
                        <span key={line}>{line}</span>
                      ))}
                    </address>
                  </div>
                  <Figure
                    image={index}
                    ratio="aspect-[700/470]"
                    sizes="(min-width: 48rem) 50vw, 100vw"
                    className="col-span-24 md:col-span-12"
                  />
                </Grid>
              </div>
            </div>
          </li>
        );
      })}
    </ul>
  );
}
