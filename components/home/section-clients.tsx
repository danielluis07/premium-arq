import { SectionLabel } from "@/components/ui/section-label";
import { Statement } from "@/components/ui/statement";
import { home } from "@/content/home";

export function SectionClients() {
  return (
    <section className="px-gutter mt-section">
      <SectionLabel index="06" title={home.clients.title} />
      <Statement className="mt-8">{home.clients.statement}</Statement>
    </section>
  );
}
