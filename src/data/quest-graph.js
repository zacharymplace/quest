export const questGraph = [
  {
    id:
      "music-foundation",

    domain:
      "music",

    title:
      "Write 60 seconds of music",

    difficulty:
      6,

    next: [
      "music-second-idea"
    ]
  },

  {
    id:
      "music-second-idea",

    domain:
      "music",

    title:
      "Build another musical idea",

    difficulty:
      7,

    next: [
      "music-basic-demo"
    ]
  },

  {
    id:
      "music-basic-demo",

    domain:
      "music",

    title:
      "Record a basic demo",

    difficulty:
      8,

    next: [
      "music-release"
    ]
  },

  {
    id:
      "music-release",

    domain:
      "music",

    title:
      "Release a finished song",

    difficulty:
      9,

    next: []
  },

  {
    id:
      "cook-foundation",

    domain:
      "cooking",

    title:
      "Make fresh pasta",

    difficulty:
      5,

    next: [
      "cook-sauce"
    ]
  },

  {
    id:
      "cook-sauce",

    domain:
      "cooking",

    title:
      "Create your own sauce",

    difficulty:
      6,

    next: []
  }
];
