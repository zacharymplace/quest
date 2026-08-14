import {
  describe,
  expect,
  test
} from "vitest";

import {
  createJourneyEventStore
} from "../src/services/journey-event-store.js";

import {
  completeQuestWithEvent
} from "../src/services/complete-quest-with-event.js";

describe(
  "quest completion events",
  () => {
    test(
      "emits completion event after completion",
      () => {
        const store =
          createJourneyEventStore();

        completeQuestWithEvent({
          completeQuest() {
            return {
              status:
                "completed"
            };
          },

          eventStore:
            store,

          attemptId:
            "attempt_1",

          userId:
            "user_z",

          questId:
            "music-foundation"
        });

        expect(
          store.list()[0].type
        ).toBe(
          "QuestCompleted"
        );
      }
    );
  }
);
