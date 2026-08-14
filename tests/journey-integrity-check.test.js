import {
  describe,
  expect,
  test
} from "vitest";

import {
  runJourneyIntegrityCheck
} from "../src/services/run-journey-integrity-check.js";

describe(
  "journey integrity check",
  () => {
    test(
      "confirms explainable journey state",
      () => {
        const result =
          runJourneyIntegrityCheck({
            events: [
              {
                type:
                  "QuestCompleted",

                payload: {}
              }
            ],

            profile: {
              completedCount:
                1,

              milestones: []
            }
          });

        expect(
          result.healthy
        ).toBe(
          true
        );

        expect(
          result.comparison.matches
        ).toBe(
          true
        );
      }
    );
  }
);
