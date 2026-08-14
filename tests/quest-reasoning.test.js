import {
  describe,
  expect,
  test
} from "vitest";

import {
  questGraph
} from "../src/data/quest-graph.js";

import {
  reasonAboutQuest
} from "../src/services/reason-about-quest.js";

describe(
  "Quest reasoning engine",
  () => {
    test(
      "explains progression from previous quest",
      () => {
        const previous =
          questGraph.find(
            (quest) =>
              quest.id ===
              "music-foundation"
          );

        const next =
          questGraph.find(
            (quest) =>
              quest.id ===
              "music-second-idea"
          );

        const reasoning =
          reasonAboutQuest({
            quest:
              next,

            previousQuest:
              previous
          });

        expect(
          reasoning.questId
        ).toBe(
          "music-second-idea"
        );

        expect(
          reasoning.reason
        ).toContain(
          "musician"
        );

        expect(
          reasoning.skillsBuilt
        ).toContain(
          "composition"
        );

        expect(
          reasoning.difficultyChange
        ).toBe(1);
      }
    );

    test(
      "explains starting paths",
      () => {
        const reasoning =
          reasonAboutQuest({
            quest:
              questGraph[0]
          });

        expect(
          reasoning.difficultyChange
        ).toBe(0);

        expect(
          reasoning.estimatedMinutes
        ).toBeGreaterThan(0);
      }
    );
  }
);
