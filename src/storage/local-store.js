import {
  existsSync,
  mkdirSync,
  readFileSync,
  writeFileSync
} from "node:fs";

import {
  dirname
} from "node:path";

const EMPTY_STATE = {
  quests: [],
  attempts: [],
  proofs: [],
  challenges: [],
  users: [],
  reputations: [],
  achievements: []
};

function cloneEmptyState() {
  return JSON.parse(
    JSON.stringify(EMPTY_STATE)
  );
}

export function createLocalStore({
  filePath
}) {
  if (
    typeof filePath !== "string" ||
    filePath.trim() === ""
  ) {
    throw new Error(
      "local store requires file path"
    );
  }

  function ensureDirectory() {
    mkdirSync(
      dirname(filePath),
      {
        recursive: true
      }
    );
  }

  function read() {
    if (!existsSync(filePath)) {
      return cloneEmptyState();
    }

    const state =
      JSON.parse(
        readFileSync(
          filePath,
          "utf8"
        )
      );

    return {
      ...cloneEmptyState(),
      ...state
    };
  }

  function write(state) {
    ensureDirectory();

    writeFileSync(
      filePath,
      JSON.stringify(
        state,
        null,
        2
      ) + "\n"
    );

    return state;
  }

  function update(mutator) {
    const state = read();

    const nextState =
      mutator(state);

    if (
      !nextState ||
      typeof nextState !== "object"
    ) {
      throw new Error(
        "local store update must return state"
      );
    }

    return write(nextState);
  }

  return {
    read,
    write,
    update
  };
}
