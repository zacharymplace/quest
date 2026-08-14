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
        "quest-runtime-"
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

  const runtime =
    createQuestRuntime({
      store
    });

  return {
    store,
    runtime
  };
}

afterEach(() => {
  while (
    directories.length > 0
  ) {
    const directory =
      directories.pop();

    rmSync(
      directory,
      {
        recursive: true,
        force: true
      }
    );
  }
});

describe(
  "Quest persistent runtime",
  () => {
    test(
      "completion survives through stored state",
      () => {
        const {
          store,
          runtime
        } =
          createHarness();

        const [quest] =
          runtime.listQuests();

        const attempt =
          runtime.acceptQuest({
            questId: quest.id,
            participantId:
              "user_z"
          });

        runtime.addProof({
          attemptId:
            attempt.id,
          type: "photo",
          value:
            "fresh-pasta.jpg"
        });

        runtime.submit({
          attemptId:
            attempt.id
        });

        const result =
          runtime.complete({
            attemptId:
              attempt.id,
            participantName:
              "Z$"
          });

        expect(
          result.attempt.status
        ).toBe(
          "completed"
        );

        expect(
          result.card.title
        ).toBe(
          quest.title
        );

        runtime.challenge({
          attemptId:
            attempt.id,
          recipientId:
            "friend_1"
        });

        const persisted =
          store.read();

        expect(
          persisted.attempts
        ).toHaveLength(1);

        expect(
          persisted.proofs
        ).toHaveLength(1);

        expect(
          persisted.challenges
        ).toHaveLength(1);

        expect(
          persisted.attempts[0]
            .status
        ).toBe(
          "completed"
        );
      }
    );

    test(
      "cannot challenge forward before completion",
      () => {
        const {
          runtime
        } =
          createHarness();

        const [quest] =
          runtime.listQuests();

        const attempt =
          runtime.acceptQuest({
            questId: quest.id,
            participantId:
              "user_z"
          });

        expect(
          () =>
            runtime.challenge({
              attemptId:
                attempt.id,
              recipientId:
                "friend_1"
            })
        ).toThrow(
          "challenge requires completed attempt"
        );
      }
    );
  }
);

test(
  "completed attempt can challenge forward",
  () => {
    const {
      store,
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
      type: "text",
      value:
        "Completed the challenge."
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

    const challenge =
      runtime.challenge({
        attemptId:
          attempt.id,
        recipientId:
          "friend_2"
      });

    expect(
      challenge.questId
    ).toBe(
      quest.id
    );

    expect(
      challenge.challengerId
    ).toBe(
      "user_z"
    );

    expect(
      challenge.recipientId
    ).toBe(
      "friend_2"
    );

    expect(
      store.read()
        .challenges
    ).toHaveLength(1);
  }
);
