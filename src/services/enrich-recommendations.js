export function enrichRecommendations({
  quests,
  source = "discovery",
  reason = "Explore a new experience"
}) {
  return quests.map(
    (quest) => ({
      ...quest,

      quest,

      source,

      reason
    })
  );
}
