import { Figure } from "@/components/ui/figure";
import { ImageRing } from "@/components/home/image-ring";
import { home } from "@/content/home";

export function Hero() {
  return (
    <section className="px-gutter">
      <h1 className="text-display text-center min-[84rem]:text-jumbo min-[84rem]:whitespace-nowrap">
        {home.hero.title}
      </h1>

      <Figure
        ratio="aspect-[1.82/1]"
        objectPosition="center 40%"
        eager
        className="mt-12"
      />

      {/* Intro row: text sits over the ring on desktop, stacks on mobile. */}
      <div className="relative mt-12 flex flex-col gap-8 [--cx:50%] [--r:38vw] md:block md:h-[52rem] md:[--cx:72%] md:[--r:23vw]">
        <p className="relative z-10 text-h3 md:w-[calc(15/24*100%)] md:text-h2">
          {home.hero.lead}
        </p>

        <ImageRing className="relative h-[18rem] md:absolute md:inset-0 md:h-auto" />

        <p className="relative z-10 text-h3 md:absolute md:bottom-0 md:left-0 md:w-[calc(6/24*100%)] md:text-[1.75rem] md:leading-[1.2]">
          {home.hero.secondaryLead}
        </p>
      </div>

      <Figure
        ratio="aspect-[1.82/1]"
        objectPosition="center 70%"
        className="mt-12"
      />
    </section>
  );
}
