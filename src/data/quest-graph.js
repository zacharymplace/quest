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

    skillsBuilt: [
      "composition",
      "creative practice"
    ],

    estimatedMinutes:
      60,

    difficultyDelta:
      0,

    prerequisites: [],

    alternatives: [],

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

    skillsBuilt: [
      "composition",
      "development"
    ],

    estimatedMinutes:
      60,

    difficultyDelta:
      1,

    prerequisites: [
      "music-foundation"
    ],

    alternatives: [],

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

    skillsBuilt: [
      "recording",
      "arrangement"
    ],

    estimatedMinutes:
      120,

    difficultyDelta:
      1,

    prerequisites: [
      "music-second-idea"
    ],

    alternatives: [],

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

    skillsBuilt: [
      "publishing",
      "completion"
    ],

    estimatedMinutes:
      240,

    difficultyDelta:
      1,

    prerequisites: [
      "music-basic-demo"
    ],

    alternatives: [],

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

    skillsBuilt: [
      "technique",
      "ingredient handling"
    ],

    estimatedMinutes:
      90,

    difficultyDelta:
      0,

    prerequisites: [],

    alternatives: [],

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

    skillsBuilt: [
      "flavor design"
    ],

    estimatedMinutes:
      60,

    difficultyDelta:
      1,

    prerequisites: [
      "cook-foundation"
    ],

    alternatives: [],

    next: []
  }
];
