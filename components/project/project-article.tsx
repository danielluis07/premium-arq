import Link from "next/link";
import { LineReveal, RevealWords } from "@/components/motion/line-reveal";
import { RollText } from "@/components/motion/roll-text";
import { Figure } from "@/components/ui/figure";
import { Grid } from "@/components/ui/grid";
import { ExplodedDiagram, StrategiesDiagram } from "./diagrams";
import type { ProjectMedia, ProjectPage } from "@/content/project-pages";

/** Right-hand column: cols 10–24 of 24 on wide screens. */
const CONTENT_SIZES = "(min-width: 48rem) 62vw, 100vw";

/** `className` must set the display (e.g. `inline-block`), so it can be hidden per breakpoint. */
function AllProjectsLink({ className }: { className: string }) {
  return (
    <Link href="/projetos" className={`text-h3 ${className}`}>
      <span className="inline-block border-b border-ink pb-0.5">
        <RollText suffix=" +">Todos os projetos</RollText>
      </span>
    </Link>
  );
}

function Media({ media }: { media: ProjectMedia }) {
  if (media.kind === "photo") {
    return (
      <Figure
        image={media.image}
        ratio={media.ratio}
        objectPosition={media.objectPosition}
        sizes={CONTENT_SIZES}
        alt={media.alt}
      />
    );
  }

  return (
    <div className="border border-ink px-4 py-8 md:px-10 md:py-14">
      {media.diagram === "exploded" ? (
        <ExplodedDiagram label={media.alt} />
      ) : (
        <StrategiesDiagram label={media.alt} />
      )}
    </div>
  );
}

/**
 * A project's page: the title stays pinned on the left (with the way back to
 * the index under it) while the story scrolls on the right: tagline, hero,
 * fact sheet, then sections of heading, copy and a photo or diagram.
 * On small screens it's one column and the title scrolls away.
 */
export function ProjectArticle({ page }: { page: ProjectPage }) {
  const { title, tagline, hero, facts, sections } = page;

  return (
    <main className="flex-1 px-gutter pt-[4.5rem]">
      <Grid className="md:gap-x-6">
        <div className="col-span-24 flex flex-col justify-between pt-6 md:sticky md:top-[4.5rem] md:col-span-8 md:h-[calc(100svh-4.5rem)] md:self-start md:pb-6">
          <LineReveal
            as="h1"
            className="text-h2 md:text-[4.25rem] md:leading-[1.05]">
            <RevealWords text={title} />
          </LineReveal>
          <AllProjectsLink className="hidden self-start md:inline-block" />
        </div>

        <article className="col-span-24 pt-6 md:col-start-10 md:col-span-15">
          <p className="text-[1.35rem] leading-[1.3] tracking-[-0.02em]">
            {tagline}
          </p>

          <Figure
            image={hero.image}
            ratio={hero.ratio}
            objectPosition={hero.objectPosition}
            sizes={CONTENT_SIZES}
            alt={hero.alt}
            eager
            parallax
            className="mt-6"
          />

          <dl className="mt-10 grid grid-cols-2 gap-x-6 gap-y-6 md:grid-cols-3">
            {facts.map(({ label, value }) => (
              <div key={label}>
                <dt className="text-small">{label}</dt>
                <dd className="mt-1.5 text-[1.2rem] leading-[1.25] tracking-[-0.02em]">
                  {value}
                </dd>
              </div>
            ))}
          </dl>

          {sections.map(({ heading, body, media }) => (
            <section key={heading} className="mt-section md:mt-32">
              <LineReveal className="text-h3">
                <RevealWords text={heading} />
              </LineReveal>
              <div className="mt-6 flex max-w-[40rem] flex-col gap-4">
                {body.map((paragraph) => (
                  <p key={paragraph}>{paragraph}</p>
                ))}
              </div>
              {media && (
                <div className="mt-10">
                  <Media media={media} />
                </div>
              )}
            </section>
          ))}
        </article>
      </Grid>

      <AllProjectsLink className="mt-section inline-block md:hidden" />
    </main>
  );
}
