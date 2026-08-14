import {
  describe,
  expect,
  test
} from "vitest";

import {
  createJourneyEvent
} from "../src/events/journey-event.js";

import {
  JourneyEventTypes
} from "../src/events/journey-event-types.js";

describe(
  "journey event types",
  () => {
    test(
      "accepts registered event types",
      () => {
        const event =
          createJourneyEvent({
            id:
              "event_1",

            type:
              JourneyEventTypes.QuestAccepted,

            userId:
              "user_z",

            occurredAt:
              "2026-08-07T00:00:00.000Z",

            payload: {}
          });

        expect(
          event.type
        ).toBe(
          "QuestAccepted"
        );
      }
    );

    test(
      "rejects unknown event types",
      () => {
        expect(
          () =>
            createJourneyEvent({
              id:
                "event_2",

              type:
                "UnknownEvent",

              userId:
                "user_z",

              occurredAt:
                "2026-08-07T00:00:00.000Z",

              payload: {}
            })
        ).toThrow();
      }
    );
  }
);
