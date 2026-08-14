export function getAvailableQuests({
  quests,
  attempts
}) {
  const completedQuestIds =
    attempts
      .filter(
        (attempt) =>
          attempt.status ===
          "completed"
      )
      .map(
        (attempt) =>
          attempt.questId
      );

  return quests.filter(
    (quest) =>
      !completedQuestIds.includes(
        quest.id
      )
  );
}
