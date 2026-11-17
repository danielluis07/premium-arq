import { Grid } from "@/components/ui/grid";
import { SectionLabel } from "@/components/ui/section-label";
import { Statement } from "@/components/ui/statement";
import { TextLink } from "@/components/ui/text-link";
import { WorkGallery } from "@/components/home/work-gallery";
import { home } from "@/content/home";

export function SectionWork() {
  const [left, right] = home.work.columns;

  return (
    <section className="px-gutter mt-section">
      <SectionLabel index="01" title={home.work.title} />
      <Statement className="mt-8 md:whitespace-nowrap">
        {home.work.statement}
      </Statement>

      <Grid className="mt-16 gap-y-6">
        <div className="col-span-24 flex flex-col gap-6 md:col-start-9 md:col-span-7">
          {left.map((paragraph) => (
            <p key={paragraph}>{paragraph}</p>
          ))}
        </div>
        <div className="col-span-24 flex flex-col gap-6 md:col-start-17 md:col-span-7">
          {right.map((paragraph) => (
            <p key={paragraph}>{paragraph}</p>
          ))}
          <TextLink href="#" className="mt-2 self-start">
            {home.work.cta}
          </TextLink>
        </div>
      </Grid>

      <WorkGallery className="-mx-gutter mt-16 md:mt-24" />
    </section>
  );
}
