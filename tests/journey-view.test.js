import {
  describe,
  expect,
  test
} from "vitest";

import {
  getCompletionJourneyView
} from "../src/web/journey-view.js";

describe(
  "web journey view",
  () => {
    test(
      "formats stored identity state",
      () => {
        const journey =
          getCompletionJourneyView({
            state: {
              users: [
                {
                  id:
                    "user_z",
                  displayName:
                    "Z$"
                }
              ],

              experienceProfiles: [
                {
                  userId:
                    "user_z",

                  completedCount:
                    3,

                  disciplines: {
                    cook:
                      2,
                    music:
                      1
                  },

                  milestones: [
                    "Make Pasta"
                  ]
                }
              ],

              achievements: [
                {
                  userId:
                    "user_z"
                }
              ]
            },

            userId:
              "user_z"
          });

        expect(
          journey.displayName
        ).toBe(
          "Z$"
        );

        expect(
          journey.completed
        ).toBe(3);

        expect(
          journey.latestMilestone
        ).toBe(
          "Make Pasta"
        );
      }
    );
  }
);
