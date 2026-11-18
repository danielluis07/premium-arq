/**
 * Projects shown on /projetos.
 *
 * The ring is filled with copies of one placeholder project: each copy gets
 * its own slug, a category (so the ring has groups to label) and a cover from
 * the placeholder photo pool (so neighbouring cards differ).
 *
 * One slot is the featured project, the only one with a page of its own
 * (`content/project-pages.ts`); every other card is a preview only.
 */

export type Project = {
  slug: string;
  title: string;
  category: string;
  /** Index into the placeholder photo pool (`lib/placeholder.ts`). */
  cover: number;
  /** Has a page at /projetos/[slug]. Cards without one aren't links. */
  hasPage: boolean;
};

export type ProjectCategory = { name: string; count: number };

/** Ring order, clockwise from the top. Counts are how many copies each gets. */
export const projectCategories: ProjectCategory[] = [
  { name: "Residencial", count: 18 },
  { name: "Corporativo", count: 12 },
  { name: "Varejo", count: 8 },
  { name: "Hotelaria", count: 10 },
  { name: "Interiores", count: 14 },
  { name: "Educacional", count: 6 },
  { name: "Cultural", count: 9 },
  { name: "Saúde", count: 7 },
  { name: "Esportes", count: 8 },
  { name: "Uso Misto", count: 13 },
  { name: "Urbanismo", count: 11 },
  { name: "Restauro", count: 9 },
];

const baseProject = {
  slug: "residencia-lorem",
  title: "Residência Lorem Ipsum",
};

/**
 * The project with a page. It takes the slot at `index` in the ring: a
 * Hotelaria card near the side of the ring, where cards face the viewer and
 * are easy to hover.
 */
export const featuredProject = {
  index: 40,
  slug: "pousada-mirante",
  title: "Pousada Mirante",
  cover: 12,
} as const;

export const projects: Project[] = projectCategories
  .flatMap((category, c) =>
    Array.from({ length: category.count }, (_, i) => ({
      ...baseProject,
      slug: `${baseProject.slug}-${c + 1}-${i + 1}`,
      category: category.name,
      // Step through the pool with a stride so neighbours rarely repeat.
      cover: c * 5 + i * 7,
      hasPage: false,
    })),
  )
  .map((project, i) =>
    i === featuredProject.index
      ? {
          ...project,
          slug: featuredProject.slug,
          title: featuredProject.title,
          cover: featuredProject.cover,
          hasPage: true,
        }
      : project,
  );

export const projectsPage = {
  /** Centre of the ring while no project is hovered. */
  statement: "Somos premium.arq.",
};
