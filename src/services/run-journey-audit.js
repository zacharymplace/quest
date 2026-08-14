import {
  getJourneyHealth
} from "./get-journey-health.js";

import {
  JourneyEventTypes
} from "../events/journey-event-types.js";

export function runJourneyAudit({
  events = [],
  profile
}) {
  const knownTypes =
    events.every(
      (event) =>
        Object.values(
          JourneyEventTypes
        ).includes(
          event.type
        )
    );

  const health =
    getJourneyHealth({
      events,
      profile
    });

  const issues = [];

  if (!knownTypes) {
    issues.push(
      "unknown event type detected"
    );
  }

  if (
    health.drift
  ) {
    issues.push(
      "projection drift detected"
    );
  }

  return {
    healthy:
      issues.length === 0,

    eventCount:
      events.length,

    knownEventTypes:
      knownTypes,

    projectionMatches:
      health.projectionMatches,

    issues,

    health
  };
}
