import {
  describe,
  expect,
  test
} from "vitest";

import {
  getHomeFeed
} from "../src/services/get-home-feed.js";

describe(
  "home feed catalog integration",
  () => {
    test(
      "includes catalog quests in availability",
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

            quests: [],

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
          feed.nextQuest.quest.id
        ).toBe(
          "music-second-idea"
        );
      }
    );
  }
);
