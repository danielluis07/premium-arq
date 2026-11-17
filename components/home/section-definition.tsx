import { Statement } from "@/components/ui/statement";
import { home } from "@/content/home";

export function SectionDefinition() {
  return (
    <section className="px-gutter mt-section">
      <Statement>{home.definition.statement}</Statement>
    </section>
  );
}
