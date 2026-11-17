import { SectionLabel } from "@/components/ui/section-label";
import { Statement } from "@/components/ui/statement";
import { home } from "@/content/home";

export function SectionServices() {
  return (
    <section className="px-gutter mt-section">
      <SectionLabel index="03" title={home.services.title} />
      <Statement className="mt-8">{home.services.statement}</Statement>
    </section>
  );
}
