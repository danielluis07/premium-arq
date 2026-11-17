import { SectionLabel } from "@/components/ui/section-label";
import { Statement } from "@/components/ui/statement";
import { home } from "@/content/home";

export function SectionTeam() {
  return (
    <section className="px-gutter mt-section">
      <SectionLabel index="05" title={home.team.title} />
      <Statement className="mt-8">{home.team.statement}</Statement>
    </section>
  );
}
