import {
  describe,
  expect,
  test
} from "vitest";

import {
  verifyJourneyProjection
} from "../src/services/verify-journey-projection.js";

describe(
  "journey projection verification",
  () => {
    test(
      "detects matching event and state history",
      () => {
        const result =
          verifyJourneyProjection({
            events: [
              {
                type:
                  "QuestCompleted",

                payload: {}
              },

              {
                type:
                  "AchievementEarned",

                payload: {
                  title:
                    "Write 60 seconds of music"
                }
              }
            ],

            profile: {
              completedCount:
                1,

              achievements:
                1,

              milestones: [
                "Write 60 seconds of music"
              ]
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
      "detects drift",
      () => {
        const result =
          verifyJourneyProjection({
            events: [
              {
                type:
                  "QuestCompleted",

                payload: {}
              }
            ],

            profile: {
              completedCount:
                2
            }
          });

        expect(
          result.matches
        ).toBe(
          false
        );
      }
    );
  }
);
