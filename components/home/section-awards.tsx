import { SectionLabel } from "@/components/ui/section-label";
import { Statement } from "@/components/ui/statement";
import { home } from "@/content/home";

export function SectionAwards() {
  return (
    <section className="px-gutter mt-section">
      <SectionLabel index="07" title={home.awards.title} />
      <Statement className="mt-8">{home.awards.statement}</Statement>
    </section>
  );
}
