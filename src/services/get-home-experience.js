import {
  getJourneyHistory
} from "./get-journey-history.js";

import {
  getActiveJourney
} from "./get-active-journey.js";

import {
  getJourneyState
} from "./get-journey-state.js";

export function getHomeExperience({
  user,
  profile,
  achievements = [],
  quests = [],
  attempts = []
}) {
  const history =
    getJourneyHistory({
      attempts
    });

  const active =
    getActiveJourney({
      attempts,
      profile
    });

  const next =
    quests.find(
      (quest) =>
        !attempts.some(
          (attempt) =>
            attempt.questId ===
            quest.id
        )
    ) ?? null;

  const state =
    getJourneyState({
      history,

      activeJourney:
        active,

      nextQuest:
        next
    });

  return {
    state:

      state.state,

    history,

    current:
      active
        ? {
            title:
              active.currentQuest.title,

            status:
              active.currentQuest.status,

            builds:
              active.builds,

            nextStep:
              active.nextStep
          }
        : null,

    next,

    profile,

    completed:
      profile.completedCount ??
      history.totalCompleted,

    displayName:
      user.displayName ??
      user.handle
  };
}
