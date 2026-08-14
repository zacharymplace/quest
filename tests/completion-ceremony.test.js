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
  createExperienceProfile
} from "../src/domain/experience-profile.js";

import {
  completeQuestCeremony
} from "../src/services/complete-quest-ceremony.js";

describe(
  "Quest completion ceremony",
  () => {
    test(
      "completion changes identity",
      () => {
        const user =
          createUser({
            handle:
              "z$",
            displayName:
              "Z$"
          });

        const result =
          completeQuestCeremony({
            user,

            quest: {
              id:
                "quest_pasta",
              title:
                "Make Fresh Pasta",
              category:
                "cook",
              difficulty:
                5
            },

            reputation:
              createReputation({
                userId:
                  user.id
              }),

            profile:
              createExperienceProfile({
                userId:
                  user.id
              })
          });

        expect(
          result.profile.completedCount
        ).toBe(1);

        expect(
          result.profile.disciplines.cook
        ).toBe(1);

        expect(
          result.profile.milestones
        ).toContain(
          "Make Fresh Pasta"
        );

        expect(
          result.identityCard.title
        ).toContain(
          "Z$"
        );
      }
    );
  }
);
