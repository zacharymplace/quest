import {
  describe,
  expect,
  test
} from "vitest";

import {
  createJourneyEventStore
} from "../src/services/journey-event-store.js";

import {
  recordJourneyEvent
} from "../src/services/record-journey-event.js";

describe(
  "journey event stream",
  () => {
    test(
      "records immutable journey events",
      () => {
        const store =
          createJourneyEventStore();

        const event =
          recordJourneyEvent({
            store,

            type:
              "QuestAccepted",

            userId:
              "user_z",

            payload: {
              questId:
                "music-foundation"
            }
          });

        expect(
          event.type
        ).toBe(
          "QuestAccepted"
        );

        expect(
          store.list()
        ).toHaveLength(
          1
        );

        expect(
          store.list()[0].payload.questId
        ).toBe(
          "music-foundation"
        );
      }
    );
  }
);
