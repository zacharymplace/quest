import {
  describe,
  expect,
  test
} from "vitest";

import {
  buildQuestCatalog
} from "../src/services/build-quest-catalog.js";

describe(
  "Quest catalog",
  () => {
    test(
      "merges seed quests and templates",
      () => {
        const catalog =
          buildQuestCatalog({
            seedQuests: [
              {
                id:
                  "custom",
                title:
                  "Custom Quest"
              }
            ]
          });

        expect(
          catalog.some(
            (quest) =>
              quest.id ===
              "custom"
          )
        ).toBe(true);

        expect(
          catalog.some(
            (quest) =>
              quest.id ===
              "music-second-idea"
          )
        ).toBe(true);
      }
    );
  }
);
