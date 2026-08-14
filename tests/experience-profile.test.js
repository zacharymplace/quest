import {
  describe,
  expect,
  test
} from "vitest";

import {
  createExperienceProfile,
  recordExperience
} from "../src/domain/experience-profile.js";

import {
  generateIdentityCard
} from "../src/services/generate-identity-card.js";

describe(
  "Quest experience identity",
  () => {
    test(
      "completed experiences build identity",
      () => {
        const profile =
          createExperienceProfile({
            userId:
              "user_z"
          });

        const updated =
          recordExperience({
            profile,

            category:
              "cook",

            title:
              "Make Fresh Pasta"
          });

        expect(
          updated.completedCount
        ).toBe(1);

        expect(
          updated.disciplines.cook
        ).toBe(1);

        expect(
          updated.milestones
        ).toContain(
          "Make Fresh Pasta"
        );
      }
    );

    test(
      "identity card describes a journey",
      () => {
        const card =
          generateIdentityCard({
            user: {
              displayName:
                "Z$"
            },

            profile: {
              completedCount:
                12,

              disciplines: {
                cook:
                  5,
                musician:
                  7
              }
            }
          });

        expect(
          card.title
        ).toContain(
          "Z$"
        );

        expect(
          card.message
        ).toContain(
          "done"
        );
      }
    );
  }
);
