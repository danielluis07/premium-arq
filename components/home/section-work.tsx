import { Grid } from "@/components/ui/grid";
import { SectionLabel } from "@/components/ui/section-label";
import { Statement } from "@/components/ui/statement";
import { TextLink } from "@/components/ui/text-link";
import { home } from "@/content/home";

export function SectionWork() {
  return (
    <section className="px-gutter mt-section">
      <SectionLabel index="01" title={home.work.title} />
      <Statement className="mt-8">{home.work.statement}</Statement>
      <Grid className="mt-8">
        <div className="col-span-24 md:col-start-9 md:col-span-7">
          <TextLink href="#">{home.work.cta}</TextLink>
        </div>
      </Grid>
    </section>
  );
}
