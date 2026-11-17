import { Hero } from "@/components/home/hero";
import { SectionWork } from "@/components/home/section-work";
import { SectionDefinition } from "@/components/home/section-definition";
import { SectionApproach } from "@/components/home/section-approach";
import { SectionServices } from "@/components/home/section-services";
import { SectionOffices } from "@/components/home/section-offices";
import { SectionTeam } from "@/components/home/section-team";
import { SectionClients } from "@/components/home/section-clients";
import { SectionAwards } from "@/components/home/section-awards";

export default function Home() {
  return (
    <main className="flex-1">
      <Hero />
      <SectionWork />
      <SectionDefinition />
      <SectionApproach />
      <SectionServices />
      <SectionOffices />
      <SectionTeam />
      <SectionClients />
      <SectionAwards />
    </main>
  );
}
