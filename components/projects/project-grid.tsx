import Link from "next/link";
import { Figure } from "@/components/ui/figure";
import type { Project } from "@/content/projects";

/**
 * Plain two-column list of every project: the small-screen stand-in for the
 * ring, which needs hover and room to read. Projects with a page come first
 * and are the only links.
 */
export function ProjectGrid({ projects }: { projects: Project[] }) {
  const ordered = [
    ...projects.filter((p) => p.hasPage),
    ...projects.filter((p) => !p.hasPage),
  ];

  return (
    <ul className="grid grid-cols-2 gap-x-3 gap-y-8">
      {ordered.map((project) => {
        const card = (
          <>
            <Figure image={project.cover} ratio="aspect-[4/3]" sizes="50vw" />
            <p className="mt-2 text-base leading-[1.2]">{project.title}</p>
            <p className="mt-1 text-small">{project.category}</p>
          </>
        );
        return (
          <li key={project.slug}>
            {project.hasPage ? (
              <Link href={`/projetos/${project.slug}`} className="block">
                {card}
              </Link>
            ) : (
              card
            )}
          </li>
        );
      })}
    </ul>
  );
}
