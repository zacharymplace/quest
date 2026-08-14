import {
  verifyJourneyProjection
} from "./verify-journey-projection.js";

export function getJourneyHealth({
  events = [],
  profile
}) {
  const verification =
    verifyJourneyProjection({
      events,

      profile
    });

  return {
    status:
      verification.matches
        ? "healthy"
        : "drifted",

    eventCount:
      events.length,

    projectionMatches:
      verification.matches,

    drift:
      !verification.matches,

    projected:
      verification.projected,

    stored:
      verification.stored
  };
}
