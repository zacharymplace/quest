import {
  describe,
  expect,
  test
} from "vitest";

import {
  getHomeFeed
} from "../src/services/get-home-feed.js";

describe(
  "explained home recommendations",
  () => {
    test(
      "includes recommendation context",
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

              milestones: []
            },

            achievements: [],

            quests: [
              {
                id:
                  "music-next",
                title:
                  "Build Another Idea",
                category:
                  "musician"
              }
            ],

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
          feed.recommended[0].source
        ).toBe(
          "chain"
        );

        expect(
          feed.recommended[0].reason
        ).toContain(
          "journey"
        );
      }
    );
  }
);
