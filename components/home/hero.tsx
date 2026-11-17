import { Figure } from "@/components/ui/figure";
import { home } from "@/content/home";

export function Hero() {
  return (
    <section className="px-gutter">
      <h1 className="text-jumbo">{home.hero.title}</h1>
      <Figure
        ratio="aspect-[16/7]"
        objectPosition="center 40%"
        priority
        className="mt-8"
      />
    </section>
  );
}
