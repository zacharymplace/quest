import {
  describe,
  expect,
  test
} from "vitest";

import {
  getUserJourney
} from "../src/services/get-user-journey.js";

describe(
  "Quest journey summary",
  () => {
    test(
      "builds identity summary from experiences",
      () => {
        const journey =
          getUserJourney({
            user: {
              id:
                "user_z",
              displayName:
                "Z$"
            },

            profile: {
              completedCount:
                4,

              disciplines: {
                cook:
                  3,

                musician:
                  1
              },

              milestones: [
                "Make Pasta",
                "Write Song"
              ]
            },

            achievements: [
              {},
              {}
            ]
          });

        expect(
          journey.displayName
        ).toBe(
          "Z$"
        );

        expect(
          journey.completed
        ).toBe(4);

        expect(
          journey.disciplines[0].name
        ).toBe(
          "cook"
        );

        expect(
          journey.latestMilestone
        ).toBe(
          "Write Song"
        );

        expect(
          journey.achievements
        ).toBe(2);
      }
    );
  }
);
