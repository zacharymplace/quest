import {
  describe,
  expect,
  test
} from "vitest";

import {
  getHomeView
} from "../src/web/home-view.js";

describe(
  "home view adapter",
  () => {
    test(
      "creates display-ready home state",
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
                2,

              disciplines: {
                musician:
                  2
              },

              milestones: []
            },

            achievements: [],

            quests: [
              {
                id:
                  "q1",
                title:
                  "Make Music",
                category:
                  "musician",
                difficulty:
                  5
              }
            ],

            attempts: []
          });

        expect(
          view.headline
        ).toContain(
          "Z$"
        );

        expect(
          view.journeyLine
        ).toContain(
          "2"
        );

        expect(
          view.featuredQuest.title
        ).toBe(
          "Make Music"
        );
      }
    );
  }
);
