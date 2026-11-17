import { CountUp } from "@/components/ui/count-up";
import { Figure } from "@/components/ui/figure";
import { Grid } from "@/components/ui/grid";
import { SectionLabel } from "@/components/ui/section-label";
import { TextLink, TextLinkLabel } from "@/components/ui/text-link";
import { home } from "@/content/home";

/**
 * Card shapes against the 1536px reference: 917×520 and 540×520, i.e. a 5/8 + 3/8
 * split (15 + 9 of 24 cols) at one shared height (520px ≈ 29.8rem).
 */
const CARDS = [
  {
    span: "md:col-span-15",
    ratio: "aspect-[917/520]",
    objectPosition: "center 40%",
    sizes: "(min-width: 48rem) 60vw, 100vw",
  },
  {
    span: "md:col-span-9",
    ratio: "aspect-[540/520]",
    objectPosition: "75% center",
    sizes: "(min-width: 48rem) 36vw, 100vw",
  },
] as const;

export function SectionAwards() {
  const { lead, cta, stats, projectsTitle, projects } = home.awards;

  return (
    <section className="px-gutter mt-section">
      {/* 2px rule: section (06) above doesn't close itself. */}
      <SectionLabel index="07" className="border-t-2 border-ink pt-4" />

      <Grid className="mt-8">
        <div className="col-span-24 flex flex-col items-start gap-6 md:col-start-9 md:col-span-12">
          <h2 className="text-h2">{lead}</h2>
          <TextLink href="#">{cta}</TextLink>
        </div>
      </Grid>

      <Grid className="mt-16 md:mt-24">
        <CountUp className="col-span-24 md:col-start-2 md:col-span-20">
          <ul className="grid grid-cols-2 gap-x-6 gap-y-12 md:grid-cols-4">
            {stats.map((stat) => (
              <li key={stat.label} className="flex flex-col items-start">
                <h3 className="border-b border-ink text-base md:text-h3">
                  {stat.label}
                </h3>
                <p className="mt-3 text-h2 tabular-nums md:mt-4 md:text-display">
                  <span data-count-to={stat.value}>{stat.value}</span>
                </p>
                <p className="mt-2 max-w-[16rem] md:mt-3">{stat.description}</p>
                <TextLink href="#" className="mt-4">
                  {stat.cta}
                </TextLink>
              </li>
            ))}
          </ul>
        </CountUp>
      </Grid>

      <h2 className="mt-16 text-h2 md:mt-24">{projectsTitle}</h2>

      <Grid className="mt-8 gap-y-10 md:gap-x-6">
        {projects.map((project, i) => {
          const card = CARDS[i % CARDS.length];
          return (
            <a
              key={project.title}
              href="#"
              className={`col-span-24 block ${card.span}`}>
              <Figure
                ratio={`${card.ratio} md:aspect-auto md:h-[29.8rem]`}
                objectPosition={card.objectPosition}
                sizes={card.sizes}
              />
              <h3 className="mt-4 text-h2">{project.title}</h3>
              <TextLinkLabel className="mt-3">{project.cta}</TextLinkLabel>
            </a>
          );
        })}
      </Grid>
    </section>
  );
}
