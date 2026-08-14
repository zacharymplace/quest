import {
  describe,
  expect,
  test
} from "vitest";

import {
  getHomeFeed
} from "../src/services/get-home-feed.js";

describe(
  "Quest home feed",
  () => {
    test(
      "builds personalized home experience",
      () => {
        const feed =
          getHomeFeed({
            user: {
              id:
                "user_z",
              displayName:
                "Z$"
            },

            profile: {
              completedCount:
                2,

              disciplines: {
                musician:
                  2
              },

              milestones: [
                "Write First Song"
              ]
            },

            achievements: [
              {}
            ],

            quests: [
              {
                id:
                  "music_next",
                title:
                  "Build Another Song Idea",
                category:
                  "musician"
              },

              {
                id:
                  "cook_next",
                title:
                  "Make Pasta",
                category:
                  "cook"
              }
            ],

            attempts: []
          });

        expect(
          feed.greeting
        ).toContain(
          "Z$"
        );

        expect(
          feed.journey.completed
        ).toBe(2);

        expect(
          feed.recommended[0].id
        ).toBe(
          "music_next"
        );

        expect(
          feed.availableCount
        ).toBe(2);
      }
    );
  }
);
