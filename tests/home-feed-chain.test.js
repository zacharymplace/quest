import {
  describe,
  expect,
  test
} from "vitest";

import {
  getHomeFeed
} from "../src/services/get-home-feed.js";

describe(
  "home feed chain priority",
  () => {
    test(
      "prefers progression over generic recommendation",
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
                1,

              disciplines: {
                musician:
                  1
              },

              milestones: [
                "Write 60 seconds of music"
              ]
            },

            quests: [
              {
                id:
                  "music-second-idea",
                title:
                  "Build Another Musical Idea",
                category:
                  "musician",
                difficulty:
                  7
              }
            ],

            achievements: [],

            attempts: [
              {
                questId:
                  "music-foundation",
                status:
                  "completed"
              }
            ]
          });

        expect(
          feed.recommended[0].id
        ).toBe(
          "music-second-idea"
        );
      }
    );
  }
);
