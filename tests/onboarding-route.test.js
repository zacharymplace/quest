import {
  describe,
  expect,
  test
} from "vitest";

import {
  getOnboardingView
} from "../src/web/onboarding-view.js";

describe(
  "onboarding quest routing",
  () => {
    test(
      "exposes dynamic quest identity",
      () => {
        const view =
          getOnboardingView({
            userId:
              "user_z",

            intent: {
              domain:
                "music",

              goal:
                "Become a better musician",

              experienceLevel:
                "beginner",

              minutesPerDay:
                30
            }
          });

        expect(
          view.questId
        ).toBe(
          "music-foundation"
        );
      }
    );
  }
);
