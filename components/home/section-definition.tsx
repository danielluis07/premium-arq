import { Figure } from "@/components/ui/figure";
import { Grid } from "@/components/ui/grid";
import { home } from "@/content/home";

export function SectionDefinition() {
  const { word, phonetic, partOfSpeech, subtitle, paragraphs } = home.definition;

  return (
    <section className="px-gutter mt-section">
      {/* Dictionary-entry row: word, phonetic and part of speech share one baseline. */}
      <div className="flex flex-wrap items-baseline gap-x-3 border-b md:gap-x-6 border-black pb-2">
        <h2 className="text-h2 md:text-display">
          <dfn className="not-italic">{word}</dfn>
        </h2>
        <span className="text-base md:text-h3">{phonetic}</span>
        <span className="ml-auto text-base md:text-h3">{partOfSpeech}</span>
      </div>

      <p className="mt-6 text-h2">{subtitle}</p>

      <Grid className="mt-16 gap-y-10">
        <div className="col-span-24 flex flex-col gap-6 md:col-span-6">
          {paragraphs.map((paragraph) => (
            <p key={paragraph}>{paragraph}</p>
          ))}
        </div>
        <Figure
          image={3}
          ratio="aspect-[6/7]"
          objectPosition="30% center"
          sizes="(min-width: 48rem) 33vw, 100vw"
          className="col-span-24 self-start md:col-start-17 md:col-span-8"
        />
      </Grid>

      <Figure
        image={9}
        ratio="aspect-[1.65/1]"
        objectPosition="center 30%"
        parallax
        className="mt-16 md:mt-24"
      />
    </section>
  );
}
