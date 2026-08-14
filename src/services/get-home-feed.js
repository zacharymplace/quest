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
  enrichRecommendations
} from "./enrich-recommendations.js";

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
      ? enrichRecommendations({
          quests:
            chainRecommendations,
          source:
            "chain",
          reason:
            "Continue your current journey"
        })
      : enrichRecommendations({
          quests:
            recommendNextQuests({
              availableQuests:
                available,
              profile
            }),
          source:
            "discovery",
          reason:
            "Explore a new experience"
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
