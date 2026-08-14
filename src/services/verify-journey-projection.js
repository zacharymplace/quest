import {
  projectJourney
} from "./project-journey.js";

export function verifyJourneyProjection({
  events,
  profile
}) {
  const projected =
    projectJourney({
      events
    });

  const stored = {
    completed:
      profile.completedCount ?? 0,

    achievements:
      profile.achievements ?? 0,

    milestones:
      profile.milestones ?? []
  };

  return {
    matches:
      projected.completed ===
        stored.completed &&
      projected.achievements ===
        stored.achievements &&
      JSON.stringify(
        projected.milestones
      ) ===
        JSON.stringify(
          stored.milestones
        ),

    projected,

    stored
  };
}
