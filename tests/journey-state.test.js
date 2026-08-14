import {
  describe,
  expect,
  test
} from "vitest";

import {
  getJourneyState
} from "../src/services/get-journey-state.js";

describe(
  "journey state resolver",
  () => {
    test(
      "detects new users",
      () => {
        const state =
          getJourneyState({
            history: {
              totalCompleted:
                0
            },

            activeJourney:
              null,

            nextQuest:
              null
          });

        expect(
          state.state
        ).toBe(
          "new"
        );

        expect(
          state.nextAction
        ).toContain(
          "first"
        );
      }
    );

    test(
      "detects active journeys",
      () => {
        const state =
          getJourneyState({
            history: {
              totalCompleted:
                1
            },

            activeJourney: {
              currentQuest: {
                title:
                  "Write 60 seconds of music"
              }
            },

            nextQuest: {
              title:
                "Build another musical idea"
            }
          });

        expect(
          state.state
        ).toBe(
          "active"
        );

        expect(
          state.nextAction
        ).toBe(
          "Build another musical idea"
        );
      }
    );

    test(
      "detects completed journeys",
      () => {
        const state =
          getJourneyState({
            history: {
              totalCompleted:
                1
            },

            activeJourney:
              null,

            nextQuest:
              null
          });

        expect(
          state.state
        ).toBe(
          "complete"
        );
      }
    );
  }
);
