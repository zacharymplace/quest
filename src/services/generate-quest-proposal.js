import {
  getChainRecommendations
} from "./get-chain-recommendations.js";

import {
  createQuestProposal
} from "../domain/quest-proposal.js";

import {
  questTemplates
} from "../data/quest-templates.js";

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

    return createQuestProposal({
      quest,

      source:
        "chain",

      reason:
        `Continue your ${quest.category} journey`,

      progression:
        "Next step in your current path"
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
