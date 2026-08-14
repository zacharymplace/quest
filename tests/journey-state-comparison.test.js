import {
  describe,
  expect,
  test
} from "vitest";

import {
  compareJourneyState
} from "../src/services/compare-journey-state.js";

describe(
  "journey state comparison",
  () => {
    test(
      "matches replayed events against stored state",
      () => {
        const result =
          compareJourneyState({
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
          result.matches
        ).toBe(
          true
        );
      }
    );

    test(
      "detects state drift",
      () => {
        const result =
          compareJourneyState({
            events: [
              {
                type:
                  "QuestCompleted",

                payload: {}
              }
            ],

            profile: {
              completedCount:
                4,

              milestones: []
            }
          });

        expect(
          result.matches
        ).toBe(
          false
        );

        expect(
          result.differences
        ).toContain(
          "completed count mismatch"
        );
      }
    );
  }
);
