import {
  describe,
  expect,
  test
} from "vitest";

import {
  getOnboardingView
} from "../src/web/onboarding-view.js";

describe(
  "onboarding view",
  () => {
    test(
      "creates first quest presentation",
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
          view.headline
        ).toBe(
          "Your first Quest"
        );

        expect(
          view.questTitle
        ).toBe(
          "Write 60 seconds of music"
        );

        expect(
          view.skillsBuilt
        ).toContain(
          "composition"
        );
      }
    );
  }
);
