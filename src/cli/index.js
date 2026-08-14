#!/usr/bin/env node

import {
  resolve
} from "node:path";

import {
  createLocalStore
} from "../storage/local-store.js";

import {
  createEventStore
} from "../storage/event-store.js";

import {
  createQuestRuntime
} from "../services/quest-runtime.js";

import {
  seedStore
} from "../services/seed-store.js";

import {
  getJourneyHealth
} from "../services/get-journey-health.js";

import {
  runJourneyIntegrityCheck
} from "../services/run-journey-integrity-check.js";

const store =
  createLocalStore({
    filePath:
      resolve(
        "data",
        "quest-state.json"
      )
  });

seedStore({
  store
});

const eventStore =
  createEventStore({
    filePath:
      resolve(
        "data",
        "events.json"
      )
  });

const runtime =
  createQuestRuntime({
    store,

    eventStore
  });

const [
  command,
  ...args
] =
  process.argv.slice(2);

function requireArg(
  index,
  name
) {
  const value =
    args[index];

  if (
    typeof value !== "string" ||
    value.trim() === ""
  ) {
    throw new Error(
      `missing argument: ${name}`
    );
  }

  return value;
}

function print(value) {
  console.log(
    JSON.stringify(
      value,
      null,
      2
    )
  );
}

switch (command) {
  case "verify": {
    const state =
      store.read();

    print(
      runJourneyIntegrityCheck({
        events:
          eventStore.list(),

        profile:
          (
            state.experienceProfiles ?? []
          )
            .find(
              (candidate) =>
                candidate.userId ===
                "user_z"
            ) ?? {}
      })
    );

    break;
  }

  case "health": {
    const state =
      store.read();

    const health =
      getJourneyHealth({
        events:
          eventStore.list(),

        profile:
          (
            state.experienceProfiles ?? []
          )
            .find(
              (candidate) =>
                candidate.userId ===
                "user_z"
            ) ?? {}
      });

    print(
      health
    );

    break;
  }

  case "quests":
    print(
      runtime.listQuests()
    );
    break;

  case "accept":
    print(
      runtime.acceptQuest({
        questId:
          requireArg(
            0,
            "questId"
          ),
        participantId:
          requireArg(
            1,
            "participantId"
          )
      })
    );
    break;

  case "proof":
    print(
      runtime.addProof({
        attemptId:
          requireArg(
            0,
            "attemptId"
          ),
        type:
          requireArg(
            1,
            "type"
          ),
        value:
          requireArg(
            2,
            "value"
          )
      })
    );
    break;

  case "submit":
    print(
      runtime.submit({
        attemptId:
          requireArg(
            0,
            "attemptId"
          )
      })
    );
    break;

  case "complete":
    print(
      runtime.complete({
        attemptId:
          requireArg(
            0,
            "attemptId"
          ),
        participantName:
          requireArg(
            1,
            "participantName"
          )
      })
    );
    break;

  case "challenge":
    print(
      runtime.challenge({
        attemptId:
          requireArg(
            0,
            "attemptId"
          ),
        recipientId:
          requireArg(
            1,
            "recipientId"
          )
      })
    );
    break;

  case "state":
    print(
      store.read()
    );
    break;

  default:
    console.log(`
Quest CLI

Commands:

  npm run quest -- quests

  npm run quest -- accept \
    <questId> \
    <participantId>

  npm run quest -- proof \
    <attemptId> \
    <photo|video|text|location|link> \
    <value>

  npm run quest -- submit \
    <attemptId>

  npm run quest -- complete \
    <attemptId> \
    <participantName>

  npm run quest -- challenge \
    <attemptId> \
    <recipientId>

  npm run quest -- state
`);
}
