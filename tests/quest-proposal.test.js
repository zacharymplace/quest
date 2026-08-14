import {
  describe,
  expect,
  test
} from "vitest";

import {
  generateQuestProposal
} from "../src/services/generate-quest-proposal.js";

describe(
  "Quest proposal engine",
  () => {
    test(
      "prefers chain progression",
      () => {
        const proposal =
          generateQuestProposal({
            attempts: [
              {
                questId:
                  "music-foundation",

                status:
                  "completed"
              }
            ],

            profile: {
              disciplines: {
                musician:
                  1
              }
            },

            availableQuests: []
          });

        expect(
          proposal.source
        ).toBe(
          "chain"
        );

        expect(
          proposal.quest.id
        ).toBe(
          "music-second-idea"
        );

        expect(
          proposal.reason
        ).toContain(
          "musician"
        );
      }
    );

    test(
      "falls back to discovery",
      () => {
        const proposal =
          generateQuestProposal({
            attempts: [],

            profile: {
              disciplines: {}
            },

            availableQuests: [
              {
                id:
                  "new",
                title:
                  "Try Something",
                category:
                  "explorer",
                difficulty:
                  3
              }
            ]
          });

        expect(
          proposal.source
        ).toBe(
          "discovery"
        );
      }
    );
  }
);
