import {
  runJourneyAudit
} from "./run-journey-audit.js";

import {
  replayJourney
} from "./replay-journey.js";

import {
  compareJourneyState
} from "./compare-journey-state.js";

export function runJourneyIntegrityCheck({
  events = [],
  profile
}) {
  const audit =
    runJourneyAudit({
      events,
      profile
    });

  const replay =
    replayJourney({
      events
    });

  const comparison =
    compareJourneyState({
      events,
      profile
    });

  return {
    healthy:
      audit.healthy &&
      comparison.matches,

    eventCount:
      events.length,

    audit,

    replay,

    comparison
  };
}
