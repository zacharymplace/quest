import {
  describe,
  expect,
  test
} from "vitest";

import {
  createFirstQuestProposal
} from "../src/services/create-first-quest-proposal.js";

describe(
  "first quest proposal",
  () => {
    test(
      "creates first coaching experience",
      () => {
        const result =
          createFirstQuestProposal({
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
          result.journey.firstQuestId
        ).toBe(
          "music-foundation"
        );

        expect(
          result.proposal.quest.id
        ).toBe(
          "music-foundation"
        );

        expect(
          result.proposal.skillsBuilt
        ).toContain(
          "composition"
        );
      }
    );
  }
);
