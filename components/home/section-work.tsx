import { SectionLabel } from "@/components/ui/section-label";
import { Statement } from "@/components/ui/statement";
import { TextLink } from "@/components/ui/text-link";
import { TwoColumnCopy } from "@/components/ui/two-column-copy";
import { WorkGallery } from "@/components/home/work-gallery";
import { home } from "@/content/home";

export function SectionWork() {
  return (
    <section className="px-gutter mt-section">
      <SectionLabel index="01" title={home.work.title} />
      <Statement className="mt-8 md:whitespace-nowrap">
        {home.work.statement}
      </Statement>

      <TwoColumnCopy
        columns={home.work.columns}
        className="mt-16"
        rightFooter={
          <TextLink href="#" className="mt-2 self-start">
            {home.work.cta}
          </TextLink>
        }
      />

      <WorkGallery className="-mx-gutter mt-16 md:mt-24" />
    </section>
  );
}
