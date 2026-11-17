export type HomeContent = {
  hero: { title: string };
  work: { title: string; statement: string; cta: string };
  definition: { statement: string };
  approach: { title: string; statement: string };
  services: { title: string; statement: string };
  offices: { title: string; statement: string };
  team: { title: string; statement: string };
  clients: { title: string; statement: string };
  awards: { title: string; statement: string };
};

export const home: HomeContent = {
  hero: { title: "Lorem ipsum" },
  work: {
    title: "Lorem ipsum",
    statement: "Lorem ipsum dolor sit amet",
    cta: "Lorem ipsum",
  },
  definition: { statement: "Lorem ipsum dolor sit amet" },
  approach: { title: "Lorem ipsum", statement: "Lorem ipsum dolor sit amet" },
  services: { title: "Lorem ipsum", statement: "Lorem ipsum dolor" },
  offices: { title: "Lorem ipsum", statement: "Lorem ipsum dolor" },
  team: { title: "Lorem ipsum", statement: "Lorem ipsum dolor" },
  clients: { title: "Lorem ipsum", statement: "Lorem ipsum dolor" },
  awards: { title: "Lorem ipsum", statement: "Lorem ipsum dolor" },
};
