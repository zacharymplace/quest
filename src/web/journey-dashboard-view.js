export function getJourneyDashboardView({
  journey
}) {
  if (!journey) {
    return null;
  }

  return {
    title:
      "Current Journey",

    questTitle:
      journey.currentQuest.title,

    status:
      journey.currentQuest.status,

    builds:
      journey.builds,

    nextStep:
      journey.nextStep,

    completed:
      journey.completedCount
  };
}
