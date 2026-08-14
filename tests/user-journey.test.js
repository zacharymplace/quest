import {
  describe,
  expect,
  test
} from "vitest";

import {
  getUserJourney
} from "../src/services/get-user-journey.js";

describe(
  "user journey API model",
  () => {
    test(
      "creates unified journey response",
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
                0,

              disciplines: {},

              milestones: []
            },

            achievements: [],

            quests: [
              {
                id:
                  "music-foundation",

                title:
                  "Write 60 seconds of music"
              }
            ],

            attempts: [
              {
                questId:
                  "music-foundation",

                status:
                  "active"
              }
            ]
          });

        expect(
          journey.identity.name
        ).toBe(
          "Z$"
        );

        expect(
          journey.state
        ).toBe(
          "active"
        );

        expect(
          journey.current.title
        ).toBe(
          "Write 60 seconds of music"
        );
      }
    );
  }
);
