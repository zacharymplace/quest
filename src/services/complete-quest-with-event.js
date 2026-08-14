import {
  JourneyEventTypes
} from "../events/journey-event-types.js";

import {
  recordJourneyEvent
} from "./record-journey-event.js";

export function completeQuestWithEvent({
  completeQuest,
  eventStore,
  attemptId,
  userId,
  questId
}) {
  const result =
    completeQuest();

  recordJourneyEvent({
    store:
      eventStore,

    type:
      JourneyEventTypes.QuestCompleted,

    userId,

    payload: {
      attemptId,
      questId
    }
  });

  return result;
}
