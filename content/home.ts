/** Typographic treatment of a placeholder client wordmark; see `ClientMark`. */
export type ClientTreatment =
  | "caps" // heavy uppercase
  | "serif" // serif italic
  | "wide" // light, wide-tracked uppercase
  | "stacked" // two lines, split on "\n"
  | "boxed" // uppercase inside a 1px frame
  | "lower" // lowercase with a full stop
  | "mark"; // simple geometric symbol + word

export type ClientLogo = {
  name: string;
  treatment: ClientTreatment;
  /** Symbol drawn beside the word; only used by the "mark" treatment. */
  mark?: "circle" | "square" | "triangle" | "half";
};

export type HomeContent = {
  hero: { title: string; lead: string; secondaryLead: string };
  work: {
    title: string;
    statement: string;
    /** Two columns of body copy, two paragraphs each. */
    columns: [string[], string[]];
    cta: string;
  };
  definition: {
    /** Dictionary-entry headword, shown huge. */
    word: string;
    phonetic: string;
    partOfSpeech: string;
    subtitle: string;
    /** Two short paragraphs (~35 and ~25 words). */
    paragraphs: string[];
  };
  approach: {
    title: string;
    statement: string;
    /** Left column: two paragraphs; right column: one. */
    columns: [string[], string[]];
  };
  services: {
    title: string;
    statement: string;
    /** Eight rows: an underlined title and a one-line description. Use "\n" in a title to wrap it. */
    items: { title: string; description: string }[];
  };
  offices: {
    title: string;
    /** Three accordion rows: an oversized name, ~20-word description and a few short contact lines. */
    items: { name: string; description: string; contact: string[] }[];
  };
  team: {
    title: string;
    /** Use "\n" to set the desktop line break (two lines). */
    statement: string;
    /** ~25-word lead set in h2 on the left. */
    lead: string;
    /** Two body paragraphs in the right column (~25 and ~35 words). */
    paragraphs: [string, string];
    /** Labels for the TextLinks under the lead and under the paragraphs. */
    ctas: [string, string];
  };
  clients: {
    title: string;
    /** Two lines; the "\n" is honoured from md up. */
    statement: string;
    lead: string;
    /** Sixteen placeholder wordmarks (invented Portuguese-sounding names, never real companies). */
    logos: ClientLogo[];
  };
  awards: {
    /** ~15-word lead (h2) at cols 9–20; the section shows its index only, no title. */
    lead: string;
    cta: string;
    /** Four counters: an underlined label ending in a colon, a target number, ~8 words and a link. */
    stats: { label: string; value: number; description: string; cta: string }[];
    projectsTitle: string;
    /** Two "recent project" cards (wide + narrow). */
    projects: { title: string; cta: string }[];
  };
};

export const home: HomeContent = {
  hero: {
    title: "Arquitetura bem pensada.",
    lead: "Projetamos casas, pousadas e escritórios a partir do que já existe no terreno: a inclinação do chão, a direção do sol, a pedra que está ali. O resto a gente desenha depois.",
    secondaryLead:
      "Um estúdio paulistano com obras da serra ao litoral e uma equipe que vai ao canteiro toda semana.",
  },
  work: {
    title: "Projetos",
    statement: "Obras que ficam.",
    columns: [
      [
        "Começamos pela visita. Antes de qualquer desenho, passamos um dia no terreno para ver onde bate o sol da tarde, por onde o vento entra e que vista vale a pena guardar.",
        "Dessa visita saem as primeiras decisões: onde fica a sala, quanta sombra a casa precisa, o que dá para manter de pé. Só depois vêm a planta, o corte e a maquete.",
      ],
      [
        "Usamos poucos materiais e escolhemos bem: pedra, madeira, concreto aparente. Eles envelhecem sem pedir reforma e deixam a obra mais barata de manter.",
        "Cada projeto é acompanhado até a entrega. Quem desenhou também vai ao canteiro, conversa com o mestre de obras e ajusta o que o papel não previu.",
      ],
    ],
    cta: "Ver projetos",
  },
  definition: {
    word: "Premium",
    phonetic: "/ˈpɾe.mi.ũ/",
    partOfSpeech: "adjetivo",
    subtitle: "O que sobra quando se tira o excesso",
    paragraphs: [
      "Para nós, premium não quer dizer mais caro. Quer dizer pensado até o fim: a porta que abre para o lado certo, a janela que enquadra a árvore, a escada que não cansa. Tudo o que está na obra tem um motivo.",
      "O excesso fica de fora. O que sobra é uma casa fácil de morar, de manter e de gostar.",
    ],
  },
  approach: {
    title: "Abordagem",
    statement: "Primeiro, o terreno.",
    columns: [
      [
        "Nosso processo tem quatro etapas e nenhuma pula a conversa. Ouvimos o cliente, estudamos o terreno, desenhamos e acompanhamos a obra. Em cada etapa mostramos o que está pronto e o que ainda está em dúvida.",
        "Gostamos de croquis à mão e maquetes de papel já na primeira reunião, porque mudam rápido e todo mundo entende. O desenho técnico vem quando a ideia já se sustenta sozinha.",
      ],
      [
        "Prazo e orçamento entram na conversa desde o começo. Um projeto bonito que o cliente não consegue construir não serve a ninguém, e é bem mais fácil ajustar uma linha no papel do que uma parede na obra.",
      ],
    ],
  },
  services: {
    title: "Serviços",
    statement: "Do traço à obra.",
    items: [
      { title: "Arquitetura", description: "casas, edifícios e conjuntos" },
      { title: "Interiores", description: "ambientes pensados com o projeto" },
      { title: "Paisagismo", description: "jardins que dialogam com a obra" },
      { title: "Urbanismo", description: "praças, bairros e loteamentos" },
      { title: "Restauro", description: "casas antigas que merecem continuar" },
      { title: "Estudo de terreno", description: "o que dá para construir e onde" },
      { title: "Projeto executivo", description: "detalhamento para a obra" },
      {
        title: "Acompanhamento\nde obra",
        description: "visitas e decisões no canteiro",
      },
    ],
  },
  offices: {
    title: "Escritórios",
    items: [
      {
        name: "São Paulo",
        description:
          "Nossa sede, numa casa dos anos 50 na Vila Madalena. Aqui ficam o ateliê de maquetes e a maior parte da equipe.",
        contact: ["Rua Harmonia, 412, São Paulo — 05435-000", "+55 11 3000-4120"],
      },
      {
        name: "Curitiba",
        description:
          "Atende as obras do Sul do país, de Santa Catarina ao Paraná, com foco em residências e projetos corporativos.",
        contact: ["Rua das Araucárias, 88, Curitiba — 80420-000", "+55 41 3000-8800"],
      },
      {
        name: "Cunha",
        description:
          "Escritório de obra na serra, montado durante a construção da Pousada Mirante e aberto aos projetos da região.",
        contact: ["Rua do Rosário, 30, Cunha — 12530-000", "+55 12 3000-3030"],
      },
    ],
  },
  team: {
    title: "Equipe",
    statement: "Gente que desenha\ne vai à obra.",
    lead: "Somos 42 pessoas entre arquitetos, paisagistas, designers e engenheiros, trabalhando numa mesa comprida porque projeto bom se resolve conversando.",
    paragraphs: [
      "Cada projeto tem um arquiteto responsável, do primeiro croqui à entrega das chaves. O cliente sempre sabe com quem falar.",
      "Acreditamos que arquitetura se aprende fazendo. Estagiários acompanham obras desde o primeiro ano e sócios ainda desenham à mão. Quem entra no estúdio costuma ficar, e isso aparece nos projetos.",
    ],
    ctas: ["Conhecer a equipe", "Trabalhe conosco"],
  },
  clients: {
    title: "Clientes",
    statement: "Quem confia\nno nosso traço.",
    lead: "Famílias, hotéis, escolas e empresas que voltam para o segundo projeto e indicam o estúdio a quem vem depois.",
    logos: [
      { name: "ALTAVISTA", treatment: "caps" },
      { name: "Serrana", treatment: "serif" },
      { name: "Vale Verde", treatment: "wide" },
      { name: "Ágata", treatment: "mark", mark: "circle" },
      { name: "Casa\nRuiva", treatment: "stacked" },
      { name: "Norte", treatment: "mark", mark: "triangle" },
      { name: "pedra viva", treatment: "lower" },
      { name: "Brisa", treatment: "boxed" },
      { name: "Lume", treatment: "serif" },
      { name: "TERRA", treatment: "caps" },
      { name: "Cais", treatment: "mark", mark: "square" },
      { name: "Ouro Fino", treatment: "wide" },
      { name: "Praça\nNova", treatment: "stacked" },
      { name: "ipê", treatment: "lower" },
      { name: "Solar", treatment: "mark", mark: "half" },
      { name: "Barro", treatment: "boxed" },
    ],
  },
  awards: {
    lead: "O reconhecimento veio como consequência: nosso trabalho já foi premiado no Brasil e no exterior.",
    cta: "Ver todos os prêmios",
    stats: [
      {
        label: "Obras entregues:",
        value: 103,
        description: "Casas, hotéis e escritórios construídos desde 2008.",
        cta: "Ver obras",
      },
      {
        label: "Prêmios:",
        value: 24,
        description: "De institutos e bienais de arquitetura.",
        cta: "Ver prêmios",
      },
      {
        label: "Anos de estúdio:",
        value: 18,
        description: "Fundado em São Paulo, hoje com três escritórios.",
        cta: "Conhecer o estúdio",
      },
      {
        label: "Mil m² projetados:",
        value: 450,
        description: "Entre residências, hotéis e projetos urbanos.",
        cta: "Ver projetos",
      },
    ],
    projectsTitle: "Projetos recentes",
    projects: [
      { title: "Pousada Mirante", cta: "Ver projeto" },
      { title: "Casa da Encosta", cta: "Ver projeto" },
    ],
  },
};
