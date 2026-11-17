import Link from "next/link";
import { Figure } from "@/components/ui/figure";
import type { Project } from "@/content/projects";

/**
 * Plain two-column list of every project: the small-screen stand-in for the
 * ring, which needs hover and room to read.
 */
export function ProjectGrid({ projects }: { projects: Project[] }) {
  return (
    <ul className="grid grid-cols-2 gap-x-3 gap-y-8">
      {projects.map((project) => (
        <li key={project.slug}>
          <Link
            href={`/projetos/${project.slug}`}
            prefetch={false}
            className="block">
            <Figure image={project.cover} ratio="aspect-[4/3]" sizes="50vw" />
            <p className="mt-2 text-base leading-[1.2]">{project.title}</p>
            <p className="mt-1 text-small">{project.category}</p>
          </Link>
        </li>
      ))}
    </ul>
  );
}
