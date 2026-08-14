import {
  getJourneyHistory
} from "./get-journey-history.js";

import {
  getActiveJourney
} from "./get-active-journey.js";

import {
  getJourneyState
} from "./get-journey-state.js";

import {
  getHomeView
} from "../web/home-view.js";

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

  const home =
    getHomeView({
      user,
      profile,
      achievements,
      quests,
      attempts
    });

  const state =
    getJourneyState({
      history,

      activeJourney:
        active,

      nextQuest:
        home.nextQuest
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

    next:
      home.nextQuest,

    profile
  };
}
