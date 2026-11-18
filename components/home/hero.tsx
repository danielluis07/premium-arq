import { Figure } from "@/components/ui/figure";
import { ImageRing } from "@/components/home/image-ring";
import { LineReveal, RevealWords } from "@/components/motion/line-reveal";
import { home } from "@/content/home";

/** Pexels 7031408 — contemporary wooden house, stone accents, large windows. Free under the Pexels license. */
const HERO_IMAGE = "https://images.pexels.com/photos/7031408/pexels-photo-7031408.jpeg";

export function Hero() {
  return (
    <section className="px-gutter">
      <LineReveal
        as="h1"
        className="text-display text-center min-[84rem]:text-[length:min(var(--text-jumbo),9.2vw)] min-[84rem]:whitespace-nowrap">
        <span className="relative inline-block">
          <RevealWords text={home.hero.title} />
          {/* Intro handoff: a black box with white text over the title, wiped away by
              IntroLoader (see .intro-highlight in globals.css). Hidden otherwise. */}
          <span aria-hidden className="intro-highlight absolute inset-0 bg-ink text-paper">
            {home.hero.title}
          </span>
        </span>
      </LineReveal>

      <Figure
        src={HERO_IMAGE}
        ratio="aspect-[1.82/1]"
        objectPosition="center 40%"
        eager
        parallax
        className="mt-12"
      />

      {/* Intro row: text sits over the ring on desktop, stacks on mobile. */}
      <div className="relative mt-12 flex flex-col gap-8 [--cx:50%] [--r:38vw] md:block md:h-[52rem] md:[--cx:86%] md:[--r:40vw]">
        <p className="relative z-10 text-h3 md:w-[calc(15/24*100%)] md:text-h2">
          {home.hero.lead}
        </p>

        <ImageRing className="relative h-[18rem] md:absolute md:inset-y-0 md:left-0 md:-right-gutter md:h-auto" />

        <p className="relative z-10 text-h3 md:absolute md:bottom-0 md:left-0 md:w-[calc(6/24*100%)] md:text-[1.75rem] md:leading-[1.2]">
          {home.hero.secondaryLead}
        </p>
      </div>

      <Figure
        image={5}
        ratio="aspect-[1.82/1]"
        objectPosition="center 70%"
        parallax
        className="mt-12"
      />
    </section>
  );
}
