import {
  describe,
  expect,
  test
} from "vitest";

import {
  enrichRecommendations
} from "../src/services/enrich-recommendations.js";

describe(
  "recommendation explanations",
  () => {
    test(
      "adds context to recommended quests",
      () => {
        const result =
          enrichRecommendations({
            quests: [
              {
                id:
                  "music-next"
              }
            ],

            source:
              "chain",

            reason:
              "Continue your musician journey"
          });

        expect(
          result[0].source
        ).toBe(
          "chain"
        );

        expect(
          result[0].reason
        ).toContain(
          "musician"
        );

        expect(
          result[0].quest.id
        ).toBe(
          "music-next"
        );
      }
    );
  }
);
