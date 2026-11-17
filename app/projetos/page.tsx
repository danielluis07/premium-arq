import type { Metadata } from "next";
import { ProjectRing } from "@/components/projects/project-ring";
import { ProjectGrid } from "@/components/projects/project-grid";
import { projectCategories, projects, projectsPage } from "@/content/projects";

export const metadata: Metadata = {
  title: "Projetos — premium.arq",
};

export default function ProjetosPage() {
  return (
    <main className="flex-1 pt-[4.5rem]">
      <h1 className="sr-only">Projetos</h1>

      {/* Phones get a grid; the ring from sm up. Only one is displayed, so
          the other's lazy images never load. */}
      <section className="px-gutter pt-6 sm:hidden">
        <p className="text-h3">{projectsPage.statement}</p>
        <div className="mt-8">
          <ProjectGrid projects={projects} />
        </div>
      </section>

      <section className="hidden h-[calc(100svh-4.5rem)] min-h-[32rem] overflow-hidden sm:block">
        <ProjectRing
          projects={projects}
          categories={projectCategories}
          statement={projectsPage.statement}
        />
      </section>
    </main>
  );
}
