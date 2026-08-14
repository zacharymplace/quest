import {
  describe,
  expect,
  test
} from "vitest";

import {
  createUser
} from "../src/domain/user.js";

import {
  createReputation
} from "../src/domain/reputation.js";

import {
  awardCompletion
} from "../src/services/award-completion.js";

import {
  generateQuestCard
} from "../src/services/generate-quest-card.js";

describe(
  "Quest identity layer",
  () => {
    test(
      "completion creates reputation and achievement",
      () => {
        const user =
          createUser({
            handle:
              "z$",
            displayName:
              "Z$"
          });

        const reputation =
          createReputation({
            userId:
              user.id
          });

        const quest = {
          id:
            "quest_test",
          title:
            "Explore Somewhere New",
          category:
            "explorer",
          difficulty:
            5
        };

        const result =
          awardCompletion({
            user,
            quest,
            reputation
          });

        expect(
          result.reputation.completedQuests
        ).toBe(1);

        expect(
          result.reputation.totalPoints
        ).toBe(50);

        expect(
          result.achievement.title
        ).toBe(
          quest.title
        );
      }
    );

    test(
      "completion card contains identity",
      () => {
        const card =
          generateQuestCard({
            user: {
              displayName:
                "Z$",
              handle:
                "z$"
            },

            quest: {
              title:
                "Make Fresh Pasta",
              category:
                "cook",
              difficulty:
                5
            },

            reputation: {
              level:
                2,
              totalPoints:
                150
            }
          });

        expect(
          card.completedBy
        ).toBe("Z$");

        expect(
          card.callToAction
        ).toContain(
          "Accept"
        );
      }
    );
  }
);
