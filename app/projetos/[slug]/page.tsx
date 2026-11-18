import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { ProjectArticle } from "@/components/project/project-article";
import { getProjectPage, projectPages } from "@/content/project-pages";

/** Every project with a page is prerendered; any other slug is a 404. */
export function generateStaticParams() {
  return projectPages.map(({ slug }) => ({ slug }));
}

export async function generateMetadata({
  params,
}: PageProps<"/projetos/[slug]">): Promise<Metadata> {
  const page = getProjectPage((await params).slug);
  return page
    ? { title: `${page.title} — premium.arq`, description: page.tagline }
    : {};
}

export default async function ProjetoPage({
  params,
}: PageProps<"/projetos/[slug]">) {
  const page = getProjectPage((await params).slug);
  if (!page) notFound();
  return <ProjectArticle page={page} />;
}
