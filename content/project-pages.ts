/**
 * Full pages for projects at /projetos/[slug]. Only the featured project
 * (`featuredProject` in `content/projects.ts`) has one for now.
 *
 * Photos are indices into the placeholder pool (`lib/placeholder.ts`) until
 * the project gets its own images; diagrams are drawn in SVG
 * (`components/project/diagrams.tsx`), so they never need image files.
 */

import { featuredProject } from "./projects";

export type ProjectMedia =
  | {
      kind: "photo";
      /** Index into the placeholder photo pool. */
      image: number;
      /** Tailwind aspect class for the frame. */
      ratio?: string;
      objectPosition?: string;
      alt: string;
    }
  | {
      kind: "diagram";
      /** `exploded`: site, building and roof pulled apart. `strategies`: three design moves side by side. */
      diagram: "exploded" | "strategies";
      alt: string;
    };

export type ProjectSection = {
  heading: string;
  /** One or more paragraphs. */
  body: string[];
  media?: ProjectMedia;
};

export type ProjectPage = {
  slug: string;
  title: string;
  /** One line under the title, above the hero. */
  tagline: string;
  hero: Extract<ProjectMedia, { kind: "photo" }>;
  /** Fact sheet: label and value, shown three to a row on wide screens. */
  facts: { label: string; value: string }[];
  sections: ProjectSection[];
};

const pousadaMirante: ProjectPage = {
  slug: featuredProject.slug,
  title: featuredProject.title,
  tagline: "Um refúgio na serra para descansar, receber e contemplar.",
  hero: {
    kind: "photo",
    image: featuredProject.cover,
    ratio: "aspect-[2.2/1]",
    objectPosition: "center 60%",
    alt: "Fachada da Pousada Mirante com a piscina em primeiro plano",
  },
  facts: [
    { label: "Cliente", value: "Grupo Altavista" },
    { label: "Setor", value: "Hotelaria" },
    { label: "Status", value: "Em construção" },
    { label: "Localização", value: "Cunha, SP" },
    { label: "Escopo", value: "Arquitetura, interiores e paisagismo" },
    { label: "Área", value: "4.800 m²" },
  ],
  sections: [
    {
      heading: "Onde a serra encontra a hospitalidade",
      body: [
        "Implantada numa encosta voltada para o vale do Paraitinga, a pousada reúne hospedagem, gastronomia e bem-estar num só conjunto. Os 32 quartos se distribuem em dois pavimentos acima de um embasamento de pedra que acompanha o terreno, para que a paisagem esteja presente em cada ambiente.",
      ],
      media: {
        kind: "diagram",
        diagram: "exploded",
        alt: "Diagrama explodido: terreno, embasamento de pedra, volume dos quartos e cobertura verde",
      },
    },
    {
      heading: "Caráter de pousada, além do luxo",
      body: [
        "Em vez do luxo tradicional, o projeto aposta numa experiência íntima: percursos que se revelam aos poucos, materiais locais e janelas que enquadram a mata. Spa, piscina aquecida, restaurante e espaços para crianças ficam nos níveis intermediários, ao alcance de hóspedes de todas as idades.",
      ],
      media: {
        kind: "photo",
        image: 1,
        ratio: "aspect-[3/2]",
        alt: "Volume branco da pousada com a piscina e o deck",
      },
    },
    {
      heading: "Três estratégias para o terreno",
      body: [
        "Os quartos ocupam as faces externas do volume e se voltam para a paisagem, garantindo vista a todos. Voltado para a rua, o térreo recebe café, empório e ateliê, em contato direto com a vila. No centro, um pátio protegido organiza a circulação e traz luz e ventilação natural para o coração do edifício.",
      ],
      media: {
        kind: "diagram",
        diagram: "strategies",
        alt: "Três diagramas do volume: vistas para o vale, térreo comercial voltado à rua e pátio central",
      },
    },
    {
      heading: "Térreo aberto à vila",
      body: [
        "Um programa compacto de comércio ativa o nível da rua e se abre para uma pequena praça. A sobreposição de usos públicos e privados aproxima a pousada da comunidade, sem abrir mão da tranquilidade que define o refúgio.",
      ],
      media: {
        kind: "photo",
        image: 15,
        ratio: "aspect-[3/2]",
        alt: "Acesso da pousada pela praça, com fachada de concreto e madeira",
      },
    },
    {
      heading: "Materiais da região",
      body: [
        "Pedra extraída no próprio terreno, madeira certificada e concreto aparente compõem uma paleta sóbria, pensada para envelhecer bem. A cobertura verde devolve à encosta a área ocupada pelo edifício e ajuda no conforto térmico dos quartos do último pavimento.",
      ],
      media: {
        kind: "photo",
        image: 6,
        ratio: "aspect-[4/3]",
        objectPosition: "40% center",
        alt: "Detalhe da fachada em concreto aparente",
      },
    },
  ],
};

export const projectPages: ProjectPage[] = [pousadaMirante];

export function getProjectPage(slug: string): ProjectPage | undefined {
  return projectPages.find((page) => page.slug === slug);
}
