export const questTemplates = [
  {
    id:
      "music-foundation",

    category:
      "musician",

    title:
      "Write 60 seconds of music",

    description:
      "Create and record at least sixty seconds of original music.",

    difficulty:
      6,

    next: [
      "music-second-idea",
      "music-basic-demo"
    ]
  },

  {
    id:
      "music-second-idea",

    category:
      "musician",

    title:
      "Build another musical idea",

    description:
      "Create a second musical idea that develops your sound.",

    difficulty:
      7,

    next: [
      "music-basic-demo"
    ]
  },

  {
    id:
      "music-basic-demo",

    category:
      "musician",

    title:
      "Record a basic demo",

    description:
      "Turn a musical idea into a rough recorded demo.",

    difficulty:
      8,

    next: []
  },

  {
    id:
      "cook-foundation",

    category:
      "cook",

    title:
      "Make fresh pasta",

    description:
      "Make fresh pasta from scratch.",

    difficulty:
      5,

    next: [
      "cook-sauce"
    ]
  },

  {
    id:
      "cook-sauce",

    category:
      "cook",

    title:
      "Create your own pasta sauce",

    description:
      "Develop a personal sauce recipe.",

    difficulty:
      6,

    next: []
  }
];
