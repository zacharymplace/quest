import {
  describe,
  expect,
  test
} from "vitest";

import {
  getHomeView
} from "../src/web/home-view.js";

describe(
  "home view next quest proposal",
  () => {
    test(
      "exposes proposal explanation",
      () => {
        const view =
          getHomeView({
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
                  "Build another musical idea",
                category:
                  "musician",
                difficulty:
                  7
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
          view.nextQuest.title
        ).toBe(
          "Build another musical idea"
        );

        expect(
          view.nextQuest.reason
        ).toContain(
          "journey"
        );
      }
    );
  }
);
