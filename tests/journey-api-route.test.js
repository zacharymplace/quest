import {
  describe,
  expect,
  test
} from "vitest";

import {
  registerJourneyApiRoute
} from "../src/web/api/journey-route.js";

describe(
  "journey API route",
  () => {
    test(
      "registers journey JSON endpoint",
      () => {
        const routes = [];

        const app = {
          get(
            path,
            handler
          ) {
            routes.push({
              path,
              handler
            });
          }
        };

        registerJourneyApiRoute({
          app,

          getState() {
            return {
              users: [
                {
                  id:
                    "user_z",

                  handle:
                    "z$"
                }
              ],

              experienceProfiles: [
                {
                  userId:
                    "user_z",

                  completedCount:
                    0,

                  disciplines: {},

                  milestones: []
                }
              ],

              achievements: [],

              quests: [],

              attempts: []
            };
          }
        });

        expect(
          routes[0].path
        ).toBe(
          "/api/journey"
        );
      }
    );
  }
);
