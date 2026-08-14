import {
  describe,
  expect,
  test
} from "vitest";

import {
  createUserIntent
} from "../src/domain/user-intent.js";

import {
  resolveStartingQuest
} from "../src/services/resolve-starting-quest.js";

describe(
  "Quest onboarding intent",
  () => {
    test(
      "creates a user growth intent",
      () => {
        const intent =
          createUserIntent({
            userId:
              "user_z",

            domain:
              "music",

            goal:
              "Become a better musician",

            experienceLevel:
              "beginner",

            minutesPerDay:
              30
          });

        expect(
          intent.domain
        ).toBe(
          "music"
        );

        expect(
          intent.minutesPerDay
        ).toBe(30);
      }
    );

    test(
      "resolves first quest path",
      () => {
        const quest =
          resolveStartingQuest({
            intent: {
              domain:
                "music"
            }
          });

        expect(
          quest.id
        ).toBe(
          "music-foundation"
        );
      }
    );
  }
);
