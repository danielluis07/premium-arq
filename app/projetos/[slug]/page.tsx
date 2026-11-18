import { Suspense } from "react";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { ProjectArticle } from "@/components/project/project-article";
import { getProjectPage, projectPages } from "@/content/project-pages";

type Params = PageProps<"/projetos/[slug]">["params"];

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

/**
 * The App Shell is shared by every slug, so `params` is only read inside
 * the Suspense boundary. The empty `<main>` holds the footer down while
 * the article streams in.
 */
export default function ProjetoPage({ params }: PageProps<"/projetos/[slug]">) {
  return (
    <Suspense fallback={<main className="min-h-svh flex-1" />}>
      <Projeto params={params} />
    </Suspense>
  );
}

async function Projeto({ params }: { params: Params }) {
  const page = getProjectPage((await params).slug);
  if (!page) notFound();
  return <ProjectArticle page={page} />;
}
