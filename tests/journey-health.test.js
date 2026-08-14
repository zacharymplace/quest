import {
  describe,
  expect,
  test
} from "vitest";

import {
  getJourneyHealth
} from "../src/services/get-journey-health.js";

describe(
  "journey health",
  () => {
    test(
      "reports healthy projection",
      () => {
        const health =
          getJourneyHealth({
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
          health.status
        ).toBe(
          "healthy"
        );

        expect(
          health.eventCount
        ).toBe(1);
      }
    );
  }
);
