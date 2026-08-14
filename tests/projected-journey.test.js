import {
  describe,
  expect,
  test
} from "vitest";

import {
  getProjectedJourney
} from "../src/services/get-projected-journey.js";

describe(
  "projected journey",
  () => {
    test(
      "prefers events when available",
      () => {
        const journey =
          getProjectedJourney({
            events: [
              {
                type:
                  "QuestCompleted",

                payload: {}
              }
            ],

            fallback: {
              completed:
                0
            }
          });

        expect(
          journey.completed
        ).toBe(1);

        expect(
          journey.source
        ).toBe(
          "events"
        );
      }
    );

    test(
      "falls back to state",
      () => {
        const journey =
          getProjectedJourney({
            events: [],

            fallback: {
              completed:
                2
            }
          });

        expect(
          journey.completed
        ).toBe(2);

        expect(
          journey.source
        ).toBe(
          "state"
        );
      }
    );
  }
);
