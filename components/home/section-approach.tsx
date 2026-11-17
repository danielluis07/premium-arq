import { SectionLabel } from "@/components/ui/section-label";
import { Statement } from "@/components/ui/statement";
import { home } from "@/content/home";

export function SectionApproach() {
  return (
    <section className="px-gutter mt-section">
      <SectionLabel index="02" title={home.approach.title} />
      <Statement className="mt-8">{home.approach.statement}</Statement>
    </section>
  );
}
