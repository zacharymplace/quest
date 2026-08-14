import {
  describe,
  expect,
  test
} from "vitest";

import {
  getHomeView
} from "../src/web/home-view.js";

describe(
  "home view reasoning metadata",
  () => {
    test(
      "exposes coaching context",
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
          view.nextQuest.skillsBuilt
        ).toContain(
          "composition"
        );

        expect(
          view.nextQuest.estimatedMinutes
        ).toBe(60);

        expect(
          view.nextQuest.difficultyChange
        ).toBe(1);
      }
    );
  }
);
