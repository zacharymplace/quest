import {
  createQuest
} from "../domain/quest.js";

export function createSeedQuests() {
  return [
    createQuest({
      id:
        "cook-foundation",

      title: "Make fresh pasta",
      description:
        "Make fresh pasta from scratch and document the finished dish.",
      category: "cook",
      difficulty: 5,
      proofRequirements: [
        "finished dish photo"
      ],
      createdBy: "quest"
    }),

    createQuest({
      id:
        "music-foundation",

      title: "Write 60 seconds of music",
      description:
        "Create and record at least sixty seconds of original music.",
      category: "musician",
      difficulty: 6,
      proofRequirements: [
        "audio or video proof"
      ],
      createdBy: "quest"
    }),

    createQuest({
      id:
        "explorer-foundation",

      title: "Explore somewhere new",
      description:
        "Visit a place you have never intentionally explored before.",
      category: "explorer",
      difficulty: 3,
      proofRequirements: [
        "location or photo proof"
      ],
      createdBy: "quest"
    })
  ];
}
