import {
  createFirstJourney
} from "./create-first-journey.js";

import {
  questGraph
} from "../data/quest-graph.js";

import {
  reasonAboutQuest
} from "./reason-about-quest.js";

export function createFirstQuestProposal({
  userId,
  intent
}) {
  const journey =
    createFirstJourney({
      userId,
      intent
    });

  const quest =
    questGraph.find(
      (node) =>
        node.id ===
        journey.firstQuestId
    );

  const reasoning =
    reasonAboutQuest({
      quest
    });

  return {
    journey,

    proposal: {
      quest,

      reason:
        reasoning.reason,

      skillsBuilt:
        reasoning.skillsBuilt,

      estimatedMinutes:
        reasoning.estimatedMinutes,

      difficultyChange:
        reasoning.difficultyChange
    }
  };
}
