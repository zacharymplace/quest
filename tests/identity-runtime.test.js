import {
  describe,
  expect,
  test
} from "vitest";

import {
  awardCompletion
} from "../src/services/award-completion.js";

import {
  createUser
} from "../src/domain/user.js";

import {
  createReputation
} from "../src/domain/reputation.js";

describe(
  "identity runtime contract",
  () => {
    test(
      "completed quest can award progression",
      () => {
        const user =
          createUser({
            handle:
              "z$",
            displayName:
              "Z$"
          });

        const reputation =
          createReputation({
            userId:
              user.id
          });

        const result =
          awardCompletion({
            user,
            reputation,
            quest: {
              id:
                "quest_1",
              title:
                "First Quest",
              difficulty:
                4
            }
          });

        expect(
          result.reputation.totalPoints
        ).toBe(40);

        expect(
          result.reputation.level
        ).toBe(1);

        expect(
          result.achievement.userId
        ).toBe(
          user.id
        );
      }
    );
  }
);
