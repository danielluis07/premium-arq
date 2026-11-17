import { Figure } from "@/components/ui/figure";
import { SectionLabel } from "@/components/ui/section-label";
import { Statement } from "@/components/ui/statement";
import { TwoColumnCopy } from "@/components/ui/two-column-copy";
import { home } from "@/content/home";

export function SectionApproach() {
  return (
    <section className="px-gutter mt-section">
      <SectionLabel index="02" title={home.approach.title} />
      <Statement className="mt-8 md:whitespace-nowrap">
        {home.approach.statement}
      </Statement>

      <TwoColumnCopy columns={home.approach.columns} className="mt-16" />

      <Figure
        ratio="aspect-[1.65/1]"
        objectPosition="center 60%"
        parallax
        className="mt-16 md:mt-24"
      />
    </section>
  );
}
