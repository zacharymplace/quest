import {
  describe,
  expect,
  test
} from "vitest";

import {
  runJourneyAudit
} from "../src/services/run-journey-audit.js";

describe(
  "journey audit",
  () => {
    test(
      "reports healthy audit",
      () => {
        const audit =
          runJourneyAudit({
            events: [
              {
                type:
                  "QuestCompleted",

                payload: {}
              }
            ],

            profile: {
              completedCount:
                1
            }
          });

        expect(
          audit.healthy
        ).toBe(
          true
        );

        expect(
          audit.knownEventTypes
        ).toBe(
          true
        );
      }
    );

    test(
      "reports invalid events",
      () => {
        const audit =
          runJourneyAudit({
            events: [
              {
                type:
                  "UnknownEvent",

                payload: {}
              }
            ],

            profile: {}
          });

        expect(
          audit.healthy
        ).toBe(
          false
        );

        expect(
          audit.issues
        ).toContain(
          "unknown event type detected"
        );
      }
    );
  }
);
