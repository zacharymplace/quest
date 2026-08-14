import {
  describe,
  expect,
  test
} from "vitest";

import {
  getUserJourney
} from "../src/services/get-user-journey.js";

describe(
  "journey API contract",
  () => {
    test(
      "returns stable journey payload shape",
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
                1,

              disciplines: {
                music:
                  1
              },

              milestones: [
                "Write 60 seconds of music"
              ]
            },

            achievements: [
              {
                id:
                  "achievement_1"
              }
            ],

            quests: [],

            attempts: []
          });

        expect(
          journey
        ).toMatchObject({
          identity: {
            name:
              "Z$"
          },

          state:
            expect.any(String),

          history:
            expect.any(Object),

          profile:
            expect.any(Object)
        });

        expect(
          journey
        ).toHaveProperty(
          "current"
        );

        expect(
          journey
        ).toHaveProperty(
          "next"
        );
      }
    );
  }
);
