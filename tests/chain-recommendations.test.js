import {
  describe,
  expect,
  test
} from "vitest";

import {
  questTemplates
} from "../src/data/quest-templates.js";

import {
  getChainRecommendations
} from "../src/services/get-chain-recommendations.js";

describe(
  "chain recommendations",
  () => {
    test(
      "returns next step from completed journey",
      () => {
        const result =
          getChainRecommendations({
            attempts: [
              {
                questId:
                  "music-foundation",
                status:
                  "completed"
              }
            ],

            templates:
              questTemplates
          });

        expect(
          result[0].id
        ).toBe(
          "music-second-idea"
        );
      }
    );
  }
);
