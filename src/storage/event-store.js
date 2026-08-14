import {
  existsSync,
  mkdirSync,
  readFileSync,
  writeFileSync
} from "node:fs";

import {
  dirname
} from "node:path";

function ensureDirectory(
  filePath
) {
  mkdirSync(
    dirname(filePath),
    {
      recursive: true
    }
  );
}

function emptyEvents() {
  return [];
}

export function createEventStore({
  filePath
}) {
  if (
    typeof filePath !== "string" ||
    filePath.trim() === ""
  ) {
    throw new Error(
      "event store requires file path"
    );
  }

  function read() {
    if (!existsSync(filePath)) {
      return emptyEvents();
    }

    return JSON.parse(
      readFileSync(
        filePath,
        "utf8"
      )
    );
  }

  function write(events) {
    ensureDirectory(
      filePath
    );

    writeFileSync(
      filePath,
      JSON.stringify(
        events,
        null,
        2
      ) + "\n"
    );

    return events;
  }

  function append(event) {
    const events =
      read();

    events.push(
      event
    );

    return write(
      events
    );
  }

  function list() {
    return [
      ...read()
    ];
  }

  return {
    append,
    list
  };
}
