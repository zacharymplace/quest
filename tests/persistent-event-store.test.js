import {
  mkdtempSync,
  rmSync
} from "node:fs";

import {
  tmpdir
} from "node:os";

import {
  join
} from "node:path";

import {
  describe,
  expect,
  test
} from "vitest";

import {
  createEventStore
} from "../src/storage/event-store.js";

describe(
  "persistent event store",
  () => {
    test(
      "persists events across instances",
      () => {
        const directory =
          mkdtempSync(
            join(
              tmpdir(),
              "quest-events-"
            )
          );

        const filePath =
          join(
            directory,
            "events.json"
          );

        const first =
          createEventStore({
            filePath
          });

        first.append({
          id:
            "event_1",

          type:
            "QuestCompleted"
        });

        const second =
          createEventStore({
            filePath
          });

        expect(
          second.list()
        ).toHaveLength(
          1
        );

        expect(
          second.list()[0].type
        ).toBe(
          "QuestCompleted"
        );

        rmSync(
          directory,
          {
            recursive:
              true,

            force:
              true
          }
        );
      }
    );
  }
);
