import {
  describe,
  expect,
  test
} from "vitest";

import {
  recommendNextQuests
} from "../src/services/recommend-next-quests.js";

describe(
  "quest recommendations",
  () => {
    test(
      "prefers quests matching journey",
      () => {
        const result =
          recommendNextQuests({
            availableQuests: [
              {
                id:
                  "explore",
                category:
                  "explorer"
              },
              {
                id:
                  "music",
                category:
                  "musician"
              }
            ],

            profile: {
              disciplines: {
                musician:
                  3
              }
            }
          });

        expect(
          result[0].id
        ).toBe(
          "music"
        );
      }
    );
  }
);
