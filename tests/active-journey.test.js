import {
  describe,
  expect,
  test
} from "vitest";

import {
  getActiveJourney
} from "../src/services/get-active-journey.js";

import {
  getJourneyDashboardView
} from "../src/web/journey-dashboard-view.js";

describe(
  "active journey dashboard",
  () => {
    test(
      "shows current quest and next step",
      () => {
        const journey =
          getActiveJourney({
            attempts: [
              {
                questId:
                  "music-foundation",

                status:
                  "active"
              }
            ],

            profile: {
              completedCount:
                0
            }
          });

        const view =
          getJourneyDashboardView({
            journey
          });

        expect(
          view.questTitle
        ).toBe(
          "Write 60 seconds of music"
        );

        expect(
          view.status
        ).toBe(
          "active"
        );

        expect(
          view.builds
        ).toContain(
          "composition"
        );

        expect(
          view.nextStep
        ).toBe(
          "Build another musical idea"
        );
      }
    );
  }
);
