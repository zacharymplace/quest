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

import {
  getQuestPath
} from "../src/services/get-quest-path.js";

describe(
  "Quest graph",
  () => {
    test(
      "creates structured progression paths",
      () => {
        const graph =
          createQuestGraph(
            questGraph
          );

        const path =
          getQuestPath({
            startId:
              "music-foundation",

            graph
          });

        expect(
          path
        ).toHaveLength(4);

        expect(
          path[0].domain
        ).toBe(
          "music"
        );

        expect(
          path[3].id
        ).toBe(
          "music-release"
        );
      }
    );

    test(
      "supports different life domains",
      () => {
        const graph =
          createQuestGraph(
            questGraph
          );

        expect(
          graph.some(
            (node) =>
              node.domain ===
              "cooking"
          )
        ).toBe(true);
      }
    );
  }
);
