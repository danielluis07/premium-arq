import { ClientMark } from "@/components/home/client-mark";
import { Grid } from "@/components/ui/grid";
import { SectionLabel } from "@/components/ui/section-label";
import { Statement } from "@/components/ui/statement";
import { home } from "@/content/home";

export function SectionClients() {
  return (
    <section className="px-gutter mt-section">
      <SectionLabel index="06" title={home.clients.title} />
      {/* Below md the display size is fluid so "adipiscing." doesn't overflow narrow screens. */}
      <Statement className="mt-8 max-md:text-[length:clamp(3rem,15vw,6.5rem)] md:whitespace-pre-line">
        {home.clients.statement}
      </Statement>

      <Grid className="mt-16">
        <p className="col-span-24 text-h3 md:col-start-9 md:col-span-12 md:text-h2">
          {home.clients.lead}
        </p>
      </Grid>

      {/* ~1000px block (cols 5–20); rows of ~220px with each mark centred in its cell. */}
      <Grid className="mt-8 md:mt-10">
        <ul className="col-span-24 grid grid-cols-2 auto-rows-[8rem] md:col-start-5 md:col-span-16 md:grid-cols-4 md:auto-rows-[12.6rem]">
          {home.clients.logos.map((logo) => (
            <li
              key={logo.name}
              className="flex items-center justify-center text-ink">
              <ClientMark logo={logo} />
            </li>
          ))}
        </ul>
      </Grid>

      <hr className="mt-8 border-ink md:mt-10" />
    </section>
  );
}
