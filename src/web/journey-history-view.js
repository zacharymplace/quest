export function getJourneyHistoryView({
  history
}) {
  return {
    title:
      "Your Journey",

    completed:
      history.completed,

    totalCompleted:
      history.totalCompleted
  };
}
