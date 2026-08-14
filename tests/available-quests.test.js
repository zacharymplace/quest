import {
  describe,
  expect,
  test
} from "vitest";

import {
  getAvailableQuests
} from "../src/services/get-available-quests.js";

describe(
  "available quests",
  () => {
    test(
      "removes completed quests",
      () => {
        const quests = [
          {
            id:
              "quest_1"
          },
          {
            id:
              "quest_2"
          }
        ];

        const attempts = [
          {
            questId:
              "quest_1",
            status:
              "completed"
          }
        ];

        const result =
          getAvailableQuests({
            quests,
            attempts
          });

        expect(
          result
        ).toHaveLength(1);

        expect(
          result[0].id
        ).toBe(
          "quest_2"
        );
      }
    );
  }
);
