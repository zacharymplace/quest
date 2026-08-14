import {
  projectJourney
} from "./project-journey.js";

export function getProjectedJourney({
  events = [],
  fallback = {}
}) {
  if (events.length > 0) {
    return {
      ...projectJourney({
        events
      }),

      source:
        "events"
    };
  }

  return {
    ...fallback,

    source:
      "state"
  };
}
