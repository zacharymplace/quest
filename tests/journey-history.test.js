import {
  describe,
  expect,
  test
} from "vitest";

import {
  getJourneyHistory
} from "../src/services/get-journey-history.js";

import {
  getJourneyHistoryView
} from "../src/web/journey-history-view.js";

describe(
  "journey history",
  () => {
    test(
      "shows completed growth milestones",
      () => {
        const history =
          getJourneyHistory({
            attempts: [
              {
                questId:
                  "music-foundation",

                status:
                  "completed"
              }
            ]
          });

        const view =
          getJourneyHistoryView({
            history
          });

        expect(
          view.totalCompleted
        ).toBe(1);

        expect(
          view.completed[0].title
        ).toBe(
          "Write 60 seconds of music"
        );

        expect(
          view.completed[0].skillsBuilt
        ).toContain(
          "composition"
        );
      }
    );
  }
);
