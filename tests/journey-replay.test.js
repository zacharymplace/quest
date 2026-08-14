import {
  describe,
  expect,
  test
} from "vitest";

import {
  replayJourney
} from "../src/services/replay-journey.js";

describe(
  "journey replay",
  () => {
    test(
      "rebuilds journey from events",
      () => {
        const replay =
          replayJourney({
            events: [
              {
                type:
                  "QuestCompleted",

                payload: {}
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
          replay.source
        ).toBe(
          "events"
        );

        expect(
          replay.eventCount
        ).toBe(2);

        expect(
          replay.journey.completed
        ).toBe(1);

        expect(
          replay.journey.milestones
        ).toContain(
          "Write 60 seconds of music"
        );
      }
    );
  }
);
