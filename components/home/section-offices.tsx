import { SectionLabel } from "@/components/ui/section-label";
import { Statement } from "@/components/ui/statement";
import { home } from "@/content/home";

export function SectionOffices() {
  return (
    <section className="px-gutter mt-section">
      <SectionLabel index="04" title={home.offices.title} />
      <Statement className="mt-8">{home.offices.statement}</Statement>
    </section>
  );
}
