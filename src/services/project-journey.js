export function projectJourney({
  events
}) {
  const projection = {
    completed:
      0,

    achievements:
      0,

    milestones:
      []
  };

  for (const event of events) {
    if (
      event.type ===
      "QuestCompleted"
    ) {
      projection.completed += 1;
    }

    if (
      event.type ===
      "AchievementEarned"
    ) {
      projection.achievements += 1;

      if (
        event.payload.title
      ) {
        projection.milestones.push(
          event.payload.title
        );
      }
    }
  }

  return projection;
}
