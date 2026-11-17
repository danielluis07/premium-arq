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
    /** Sixteen placeholder wordmarks (Lipsum words, never real companies). */
    logos: ClientLogo[];
  };
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
  definition: {
    word: "Lorem",
    phonetic: "/lo:rem/",
    partOfSpeech: "noun",
    subtitle: "Lorem ipsum dolor sit",
    paragraphs: [
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat duis aute.",
      "Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum. Sed ut perspiciatis unde omnis iste natus error sit voluptatem.",
    ],
  },
  approach: {
    title: "Lorem ipsum",
    statement: "Lorem ipsum dolor.",
    columns: [
      [
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat, duis aute irure dolor.",
        "Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo. Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia.",
      ],
      [
        "Neque porro quisquam est, qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit, sed quia non numquam eius modi tempora incidunt ut labore et dolore magnam aliquam quaerat voluptatem ut enim.",
      ],
    ],
  },
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
  offices: {
    title: "Lorem ipsum",
    items: [
      {
        name: "Lorem",
        description:
          "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
        contact: ["Lorem ipsum 123, Dolor — 00000-000", "+00 00 0000-0000"],
      },
      {
        name: "Ipsum",
        description:
          "Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat duis aute irure.",
        contact: ["Ipsum dolor 456, Amet — 11111-111", "+00 00 1111-1111"],
      },
      {
        name: "Dolor Sit",
        description:
          "Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur, excepteur sint occaecat.",
        contact: ["Dolor sit 789, Consectetur — 22222-222", "+00 00 2222-2222"],
      },
    ],
  },
  team: {
    title: "Lorem ipsum",
    statement: "Lorem ipsum dolor sit amet\nconsectetur.",
    lead: "Lorem ipsum dolor sit amet consectetur adipiscing elit sed do eiusmod tempor incididunt ut labore et dolore magna aliqua, ut enim ad minim veniam quis.",
    paragraphs: [
      "Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur, excepteur sint occaecat cupidatat non proident sunt in culpa qui officia.",
      "Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo nemo enim ipsam voluptatem.",
    ],
    ctas: ["Lorem ipsum", "Dolor sit"],
  },
  clients: {
    title: "Lorem ipsum",
    statement: "Lorem ipsum dolor\nconsectetur adipiscing.",
    lead: "Lorem ipsum dolor sit amet consectetur adipiscing elit sed do eiusmod tempor incididunt ut labore et dolore.",
    logos: [
      { name: "LOREM", treatment: "caps" },
      { name: "Ipsum", treatment: "serif" },
      { name: "Dolor Sit", treatment: "wide" },
      { name: "amet", treatment: "mark", mark: "circle" },
      { name: "Sint\nOccaecat", treatment: "stacked" },
      { name: "Veniam", treatment: "mark", mark: "triangle" },
      { name: "aliqua", treatment: "lower" },
      { name: "Nostrud", treatment: "boxed" },
      { name: "Tempor", treatment: "serif" },
      { name: "ELIT", treatment: "caps" },
      { name: "Labore", treatment: "mark", mark: "square" },
      { name: "Fugiat", treatment: "wide" },
      { name: "Quis\nNostrum", treatment: "stacked" },
      { name: "cillum", treatment: "lower" },
      { name: "Ullamco", treatment: "mark", mark: "half" },
      { name: "Eiusmod", treatment: "boxed" },
    ],
  },
  awards: { title: "Lorem ipsum", statement: "Lorem ipsum dolor" },
};
