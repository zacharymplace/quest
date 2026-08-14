import {
  describe,
  expect,
  test
} from "vitest";

import {
  getHomeExperience
} from "../src/services/get-home-experience.js";

describe(
  "home experience",
  () => {
    test(
      "combines lifecycle context",
      () => {
        const experience =
          getHomeExperience({
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
          experience.state
        ).toBe(
          "active"
        );

        expect(
          experience.current.title
        ).toBe(
          "Write 60 seconds of music"
        );
      }
    );
  }
);
