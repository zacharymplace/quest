import {
  projectJourney
} from "./project-journey.js";

export function replayJourney({
  events = []
}) {
  return {
    source:
      "events",

    eventCount:
      events.length,

    journey:
      projectJourney({
        events
      })
  };
}
