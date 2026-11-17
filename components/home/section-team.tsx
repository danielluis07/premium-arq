import { Figure } from "@/components/ui/figure";
import { Grid } from "@/components/ui/grid";
import { SectionLabel } from "@/components/ui/section-label";
import { Statement } from "@/components/ui/statement";
import { TextLink } from "@/components/ui/text-link";
import { home } from "@/content/home";

export function SectionTeam() {
  const { title, statement, lead, paragraphs, ctas } = home.team;

  return (
    <section className="px-gutter mt-section">
      <SectionLabel index="05" title={title} />
      {/* The "\n" in the copy sets the desktop break; on mobile it collapses to a space and wraps naturally. */}
      <Statement className="mt-8 md:whitespace-pre-line">{statement}</Statement>

      {/* Mirror of the (03) pair: large image left (cols 1–16), small right (cols 17–24), equal heights
          (~980×540 / ~476×540 @1536). Row gap only on mobile so the 24-col grid never overflows. */}
      <Grid className="mt-12 gap-y-6 md:gap-x-6">
        <Figure
          ratio="aspect-[3/2] md:aspect-auto md:h-[33.75rem]"
          objectPosition="center 40%"
          sizes="(min-width: 48rem) 66vw, 100vw"
          className="col-span-24 md:col-span-16"
        />
        <Figure
          ratio="aspect-[476/540] md:aspect-auto md:h-[33.75rem]"
          objectPosition="75% center"
          sizes="(min-width: 48rem) 33vw, 100vw"
          className="col-span-24 md:col-span-8"
        />
      </Grid>

      <Grid className="mt-8 gap-y-10 md:gap-x-6">
        <div className="col-span-24 flex flex-col items-start gap-6 md:col-span-15">
          <p className="text-h2">{lead}</p>
          <TextLink href="#">{ctas[0]}</TextLink>
        </div>
        <div className="col-span-24 flex flex-col items-start gap-6 md:col-start-17 md:col-span-8">
          {paragraphs.map((paragraph) => (
            <p key={paragraph}>{paragraph}</p>
          ))}
          <TextLink href="#" className="mt-2">
            {ctas[1]}
          </TextLink>
        </div>
      </Grid>

      <Figure
        ratio="aspect-[1.65/1]"
        objectPosition="center 70%"
        className="mt-16"
      />
    </section>
  );
}
