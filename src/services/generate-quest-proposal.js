import {
  getChainRecommendations
} from "./get-chain-recommendations.js";

import {
  createQuestProposal
} from "../domain/quest-proposal.js";

import {
  questTemplates
} from "../data/quest-templates.js";

import {
  questGraph
} from "../data/quest-graph.js";

import {
  reasonAboutQuest
} from "./reason-about-quest.js";

export function generateQuestProposal({
  attempts,
  profile,
  availableQuests = []
}) {
  const chain =
    getChainRecommendations({
      attempts,
      templates:
        questTemplates
    });

  if (
    chain.length > 0
  ) {
    const quest =
      chain[0];

    const previousQuest =
      questGraph.find(
        (node) =>
          attempts.some(
            (attempt) =>
              attempt.questId ===
              node.id &&
              attempt.status ===
              "completed"
          )
      );

    const graphQuest =
      questGraph.find(
        (node) =>
          node.id ===
          quest.id
      );

    const reasoningQuest =
      graphQuest ?? quest;

    const reasoning =
      reasoningQuest.skillsBuilt &&
      reasoningQuest.estimatedMinutes
        ? reasonAboutQuest({
            quest:
              reasoningQuest,

            previousQuest
          })
        : null;

    return createQuestProposal({
      quest,

      source:
        "chain",

      reason:
        reasoning
          ? reasoning.reason
          : `Continue your ${quest.category} journey`,

      progression:
        "Next step in your current path",

      skillsBuilt:
        reasoning?.skillsBuilt,

      estimatedMinutes:
        reasoning?.estimatedMinutes,

      difficultyChange:
        reasoning?.difficultyChange
    });
  }

  const journeyCategory =
    Object.keys(
      profile?.disciplines ?? {}
    )[0];

  const journeyQuest =
    availableQuests.find(
      (quest) =>
        quest.category ===
        journeyCategory
    );

  if (
    journeyQuest
  ) {
    return createQuestProposal({
      quest:
        journeyQuest,

      source:
        "journey",

      reason:
        `Build on your ${journeyCategory} experience`,

      progression:
        "Expand your skills"
    });
  }

  const discovery =
    availableQuests[0];

  if (
    discovery
  ) {
    return createQuestProposal({
      quest:
        discovery,

      source:
        "discovery",

      reason:
        "Explore something new",

      progression:
        "Start a new path"
    });
  }

  return null;
}
