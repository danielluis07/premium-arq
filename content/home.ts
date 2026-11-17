export type HomeContent = {
  hero: { title: string; lead: string; secondaryLead: string };
  work: {
    title: string;
    statement: string;
    /** Two columns of body copy, two paragraphs each. */
    columns: [string[], string[]];
    cta: string;
  };
  definition: { statement: string };
  approach: { title: string; statement: string };
  services: {
    title: string;
    statement: string;
    /** Eight rows: an underlined title and a one-line description. Use "\n" in a title to wrap it. */
    items: { title: string; description: string }[];
  };
  offices: { title: string; statement: string };
  team: { title: string; statement: string };
  clients: { title: string; statement: string };
  awards: { title: string; statement: string };
};

export const home: HomeContent = {
  hero: {
    title: "Lorem ipsum dolor sit.",
    lead: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua, ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo.",
    secondaryLead:
      "Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa.",
  },
  work: {
    title: "Lorem ipsum",
    statement: "Lorem ipsum dolor sit.",
    columns: [
      [
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua, ut enim ad minim veniam, quis nostrud.",
        "Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur, excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum sed ut perspiciatis.",
      ],
      [
        "Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis.",
        "Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt, neque porro quisquam est, qui dolorem ipsum quia dolor sit amet, consectetur.",
      ],
    ],
    cta: "Lorem ipsum",
  },
  definition: { statement: "Lorem ipsum dolor sit amet" },
  approach: { title: "Lorem ipsum", statement: "Lorem ipsum dolor sit amet" },
  services: {
    title: "Lorem ipsum",
    statement: "Lorem ipsum dolor-sit amet.",
    items: [
      { title: "Lorem Ipsum", description: "dolor sit amet consectetur" },
      { title: "Dolor Sit", description: "adipiscing elit sed do eiusmod" },
      { title: "Amet", description: "tempor incididunt ut labore" },
      { title: "Consectetur", description: "et dolore magna aliqua" },
      { title: "Sed Do", description: "ut enim ad minim veniam" },
      { title: "Eiusmod Tempor", description: "quis nostrud exercitation" },
      { title: "Magna", description: "ullamco laboris nisi ut aliquip" },
      {
        title: "Lorem Ipsum and\nDolor",
        description: "tempor incididunt ut labore",
      },
    ],
  },
  offices: { title: "Lorem ipsum", statement: "Lorem ipsum dolor" },
  team: { title: "Lorem ipsum", statement: "Lorem ipsum dolor" },
  clients: { title: "Lorem ipsum", statement: "Lorem ipsum dolor" },
  awards: { title: "Lorem ipsum", statement: "Lorem ipsum dolor" },
};
