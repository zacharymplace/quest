import {
  createJourney
} from "../domain/journey.js";

import {
  resolveStartingQuest
} from "./resolve-starting-quest.js";

export function createFirstJourney({
  userId,
  intent
}) {
  const quest =
    resolveStartingQuest({
      intent
    });

  if (!quest) {
    throw new Error(
      "no starting quest found"
    );
  }

  return createJourney({
    userId,

    intent,

    firstQuestId:
      quest.id,

    reason:
      `Start your ${intent.domain} journey`
  });
}
