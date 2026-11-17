/**
 * Projects shown on /projetos.
 *
 * For now there is a single real project, replicated to fill the ring: each
 * copy gets its own slug, a category (so the ring has groups to label) and a
 * cover from the placeholder photo pool (so neighbouring cards differ).
 */

export type Project = {
  slug: string;
  title: string;
  category: string;
  /** Index into the placeholder photo pool (`lib/placeholder.ts`). */
  cover: number;
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

export const projects: Project[] = projectCategories.flatMap((category, c) =>
  Array.from({ length: category.count }, (_, i) => ({
    ...baseProject,
    slug: `${baseProject.slug}-${c + 1}-${i + 1}`,
    category: category.name,
    // Step through the pool with a stride so neighbours rarely repeat.
    cover: c * 5 + i * 7,
  })),
);

export const projectsPage = {
  /** Centre of the ring while no project is hovered. */
  statement: "Somos premium.arq.",
};
