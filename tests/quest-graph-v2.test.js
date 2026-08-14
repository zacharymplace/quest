import {
  describe,
  expect,
  test
} from "vitest";

import {
  questGraph
} from "../src/data/quest-graph.js";

import {
  createQuestGraph
} from "../src/domain/quest-graph.js";

describe(
  "Quest Graph v2 metadata",
  () => {
    test(
      "requires growth metadata",
      () => {
        const graph =
          createQuestGraph(
            questGraph
          );

        const music =
          graph.find(
            (quest) =>
              quest.id ===
              "music-second-idea"
          );

        expect(
          music.skillsBuilt
        ).toContain(
          "composition"
        );

        expect(
          music.estimatedMinutes
        ).toBe(60);

        expect(
          music.difficultyDelta
        ).toBe(1);

        expect(
          music.prerequisites
        ).toContain(
          "music-foundation"
        );
      }
    );

    test(
      "contains multiple domains",
      () => {
        const graph =
          createQuestGraph(
            questGraph
          );

        expect(
          new Set(
            graph.map(
              (quest) =>
                quest.domain
            )
          ).size
        ).toBeGreaterThan(1);
      }
    );
  }
);
