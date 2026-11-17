import { Figure } from "@/components/ui/figure";
import { Grid } from "@/components/ui/grid";
import { SectionLabel } from "@/components/ui/section-label";
import { Statement } from "@/components/ui/statement";
import { home } from "@/content/home";

export function SectionServices() {
  return (
    <section className="px-gutter mt-section">
      <SectionLabel index="03" title={home.services.title} />
      <Statement className="mt-8 md:w-[calc(16/24*100%)]">
        {home.services.statement}
      </Statement>

      <Grid className="mt-16">
        <ul className="col-span-24 flex flex-col gap-1 md:col-start-11 md:col-span-14">
          {home.services.items.map((item) => (
            <li
              key={item.title}
              className="flex flex-col items-start gap-1 md:flex-row md:items-baseline md:gap-3">
              {/* Border on the box, not the text, so a two-line title gets one underline under its last line.
                  Line breaks come from the content (pre-line): a forced break lets the box shrink to its
                  widest line, whereas a natural wrap would leave the box (and underline) at full width. */}
              <h3 className="text-h3 whitespace-pre-line border-b border-ink">
                <a href="#">{item.title}</a>
              </h3>
              <p className="text-small">{item.description}</p>
            </li>
          ))}
        </ul>
      </Grid>

      <Grid className="mt-16 gap-y-6 md:mt-24 md:gap-x-6">
        <Figure
          image={1}
          ratio="aspect-[476/640] md:aspect-auto md:h-[36.75rem]"
          objectPosition="30% center"
          sizes="(min-width: 48rem) 33vw, 100vw"
          className="col-span-24 md:col-span-8"
        />
        <Figure
          image={4}
          ratio="aspect-[3/2] md:aspect-auto md:h-[36.75rem]"
          objectPosition="center 65%"
          sizes="(min-width: 48rem) 66vw, 100vw"
          className="col-span-24 md:col-span-16"
        />
      </Grid>
    </section>
  );
}
