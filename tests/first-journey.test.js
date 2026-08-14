import {
  describe,
  expect,
  test
} from "vitest";

import {
  createFirstJourney
} from "../src/services/create-first-journey.js";

describe(
  "first journey creation",
  () => {
    test(
      "creates initial path from intent",
      () => {
        const journey =
          createFirstJourney({
            userId:
              "user_z",

            intent: {
              domain:
                "music",

              goal:
                "Become a better musician"
            }
          });

        expect(
          journey.firstQuestId
        ).toBe(
          "music-foundation"
        );

        expect(
          journey.reason
        ).toContain(
          "music"
        );
      }
    );
  }
);
