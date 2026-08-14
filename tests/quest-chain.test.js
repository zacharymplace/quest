import {
  describe,
  expect,
  test
} from "vitest";

import {
  questTemplates
} from "../src/data/quest-templates.js";

import {
  getNextChainQuests
} from "../src/services/get-next-chain-quests.js";

describe(
  "Quest chains",
  () => {
    test(
      "completed quest unlocks next experience",
      () => {
        const next =
          getNextChainQuests({
            completedQuestIds: [
              "music-foundation"
            ],

            templates:
              questTemplates
          });

        expect(
          next[0].id
        ).toBe(
          "music-second-idea"
        );

        expect(
          next
        ).toHaveLength(2);
      }
    );

    test(
      "does not recommend completed quests",
      () => {
        const next =
          getNextChainQuests({
            completedQuestIds: [
              "music-foundation",
              "music-second-idea"
            ],

            templates:
              questTemplates
          });

        expect(
          next.some(
            (quest) =>
              quest.id ===
              "music-second-idea"
          )
        ).toBe(false);
      }
    );
  }
);
