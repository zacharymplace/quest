import {
  describe,
  expect,
  test
} from "vitest";

import {
  createSeedQuests
} from "../src/data/seed-quests.js";

describe(
  "seed quest identity",
  () => {
    test(
      "uses stable progression identifiers",
      () => {
        const quests =
          createSeedQuests();

        expect(
          quests.map(
            (quest) =>
              quest.id
          )
        ).toEqual([
          "cook-foundation",
          "music-foundation",
          "explorer-foundation"
        ]);
      }
    );
  }
);
