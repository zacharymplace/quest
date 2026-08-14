import {
  describe,
  expect,
  test
} from "vitest";

import {
  projectJourney
} from "../src/services/project-journey.js";

describe(
  "journey projection",
  () => {
    test(
      "rebuilds journey from events",
      () => {
        const journey =
          projectJourney({
            events: [
              {
                type:
                  "QuestCompleted",

                payload: {
                  questId:
                    "music-foundation"
                }
              },

              {
                type:
                  "AchievementEarned",

                payload: {
                  title:
                    "Write 60 seconds of music"
                }
              }
            ]
          });

        expect(
          journey.completed
        ).toBe(1);

        expect(
          journey.achievements
        ).toBe(1);

        expect(
          journey.milestones
        ).toContain(
          "Write 60 seconds of music"
        );
      }
    );
  }
);
