import { OfficesAccordion } from "@/components/home/offices-accordion";
import { SectionLabel } from "@/components/ui/section-label";
import { home } from "@/content/home";

export function SectionOffices() {
  return (
    <section className="px-gutter mt-section">
      <SectionLabel index="04" title={home.offices.title} />
      <OfficesAccordion items={home.offices.items} className="mt-8" />
    </section>
  );
}
