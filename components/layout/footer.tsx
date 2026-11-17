import Link from "next/link";
import { Grid } from "@/components/ui/grid";
import { BackToTop } from "./back-to-top";
import { Wordmark } from "./wordmark";

const groups = [
  {
    label: "Lorem",
    links: [
      "Lorem ipsum",
      "Dolor",
      "Amet",
      "Consectetur",
      "Sit",
      "Lorem",
      "Elit",
    ],
  },
  {
    label: "Ipsum",
    links: ["Lorem ipsum", "Dolor sit", "Amet elit", "Sed do", "Tempor", "Magna"],
  },
] as const;

const underlined = "border-b border-ink pb-0.5";

export function Footer() {
  return (
    <footer className="px-gutter mt-section md:mt-32 pb-4">
      <div className="flex justify-end">
        <BackToTop />
      </div>

      <Grid className="mt-8 gap-y-12 md:gap-x-6">
        <div className="col-span-24 md:col-span-6">
          <Wordmark className="!text-[2.25rem]" />
        </div>
        {groups.map((group, i) => (
          <nav
            key={group.label}
            aria-label={group.label}
            className={`col-span-24 md:col-span-8 ${i === 0 ? "md:col-start-7" : "md:col-start-17"}`}>
            <p className="text-small">{group.label}</p>
            <ul className="mt-4 grid grid-cols-2 gap-x-6 gap-y-4">
              {group.links.map((label) => (
                <li key={label}>
                  <Link href="#" className="text-h3">
                    <span className={`inline-block ${underlined}`}>{label}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
        ))}
      </Grid>

      <Grid className="mt-24 gap-y-4 text-small md:gap-x-6">
        <div className="col-span-24 flex flex-wrap items-center gap-x-4 gap-y-2 md:col-span-16">
          <span>Lorem ipsum | Lorem ipsum ©2026</span>
          <Link href="#" className={underlined}>
            Lorem Ipsum
          </Link>
          <Link href="#" className={underlined}>
            Dolor &amp; Sit
          </Link>
        </div>
        <div className="col-span-24 md:col-span-8 md:col-start-17">
          <Link href="#" className={underlined}>
            Lorem ipsum dolor
          </Link>
        </div>
      </Grid>
    </footer>
  );
}
