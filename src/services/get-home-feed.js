import {
  getUserJourney
} from "./get-user-journey.js";

import {
  getAvailableQuests
} from "./get-available-quests.js";

import {
  recommendNextQuests
} from "./recommend-next-quests.js";

import {
  getChainRecommendations
} from "./get-chain-recommendations.js";

import {
  questTemplates
} from "../data/quest-templates.js";

export function getHomeFeed({
  user,
  profile,
  achievements = [],
  quests,
  attempts
}) {
  if (!user) {
    throw new Error(
      "home feed requires user"
    );
  }

  if (!profile) {
    throw new Error(
      "home feed requires profile"
    );
  }

  const journey =
    getUserJourney({
      user,
      profile,
      achievements
    });

  const available =
    getAvailableQuests({
      quests,
      attempts
    });

  const chainRecommendations =
    getChainRecommendations({
      attempts,
      templates:
        questTemplates
    });

  const recommended =
    chainRecommendations.length > 0
      ? chainRecommendations
      : recommendNextQuests({
          availableQuests:
            available,
          profile
        });

  return {
    greeting:
      `Welcome back, ${user.displayName}`,

    journey: {
      completed:
        journey.completed,

      disciplines:
        journey.disciplines,

      latestMilestone:
        journey.latestMilestone
    },

    recommended,

    availableCount:
      available.length
  };
}
