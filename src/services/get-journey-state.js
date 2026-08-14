export function getJourneyState({
  history,
  activeJourney,
  nextQuest
}) {
  const hasHistory =
    history.totalCompleted > 0;

  const hasCurrentQuest =
    Boolean(
      activeJourney
    );

  if (
    !hasHistory &&
    !hasCurrentQuest
  ) {
    return {
      state:
        "new",

      hasHistory:
        false,

      hasCurrentQuest:
        false,

      nextAction:
        "Start your first journey"
    };
  }

  if (hasCurrentQuest) {
    return {
      state:
        "active",

      hasHistory,

      hasCurrentQuest:
        true,

      currentQuest:
        activeJourney.currentQuest,

      nextAction:
        nextQuest?.title ??
        null
    };
  }

  return {
    state:
      "complete",

    hasHistory,

    hasCurrentQuest:
      false,

    nextAction:
      nextQuest?.title ??
      "Choose your next Quest"
  };
}
