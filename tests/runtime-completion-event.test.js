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
  afterEach,
  describe,
  expect,
  test
} from "vitest";

import {
  createLocalStore
} from "../src/storage/local-store.js";

import {
  createEventStore
} from "../src/storage/event-store.js";

import {
  createQuestRuntime
} from "../src/services/quest-runtime.js";

import {
  seedStore
} from "../src/services/seed-store.js";

const directories = [];

function createHarness() {
  const directory =
    mkdtempSync(
      join(
        tmpdir(),
        "quest-event-"
      )
    );

  directories.push(
    directory
  );

  const store =
    createLocalStore({
      filePath:
        join(
          directory,
          "state.json"
        )
    });

  seedStore({
    store
  });

  store.update(
    (state) => ({
      ...state,

      users: [
        ...(state.users ?? []),

        {
          id:
            "user_z",

          handle:
            "z$"
        }
      ],

      experienceProfiles: [
        ...(state.experienceProfiles ?? []),

        {
          userId:
            "user_z",

          completedCount:
            0,

          disciplines: {},

          milestones: []
        }
      ]
    })
  );

  const eventStore =
    createEventStore({
      filePath:
        join(
          directory,
          "events.json"
        )
    });

  const runtime =
    createQuestRuntime({
      store,

      eventStore
    });

  return {
    runtime
  };
}

afterEach(() => {
  while (
    directories.length > 0
  ) {
    rmSync(
      directories.pop(),
      {
        recursive:
          true,

        force:
          true
      }
    );
  }
});

describe(
  "runtime completion events",
  () => {
    test(
      "completion emits QuestCompleted event",
      () => {
        const {
          runtime
        } =
          createHarness();

        const [quest] =
          runtime.listQuests();

        const attempt =
          runtime.acceptQuest({
            questId:
              quest.id,

            participantId:
              "user_z"
          });

        runtime.addProof({
          attemptId:
            attempt.id,

          type:
            "photo",

          value:
            "proof.jpg"
        });

        runtime.submit({
          attemptId:
            attempt.id
        });

        runtime.complete({
          attemptId:
            attempt.id,

          participantName:
            "Z$"
        });

        expect(
          runtime.listEvents()[0].type
        ).toBe(
          "QuestCompleted"
        );
      }
    );
  }
);
