import {
  replayJourney
} from "./replay-journey.js";

export function compareJourneyState({
  events = [],
  profile
}) {
  const replay =
    replayJourney({
      events
    });

  const stored = {
    completed:
      profile.completedCount ?? 0,

    milestones:
      profile.milestones ?? []
  };

  const differences = [];

  if (
    replay.journey.completed !==
    stored.completed
  ) {
    differences.push(
      "completed count mismatch"
    );
  }

  if (
    JSON.stringify(
      replay.journey.milestones
    ) !==
    JSON.stringify(
      stored.milestones
    )
  ) {
    differences.push(
      "milestones mismatch"
    );
  }

  return {
    matches:
      differences.length === 0,

    stored,

    replayed:
      replay.journey,

    differences
  };
}
