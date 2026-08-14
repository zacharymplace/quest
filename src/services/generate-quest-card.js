export function generateQuestCard({
  user,
  quest,
  reputation
}) {
  return {
    type:
      "quest-completion-card",

    headline:
      "QUEST COMPLETE",

    completedBy:
      user.displayName,

    handle:
      user.handle,

    quest:
      quest.title,

    category:
      quest.category,

    difficulty:
      quest.difficulty,

    level:
      reputation.level,

    points:
      reputation.totalPoints,

    callToAction:
      "Your turn. Accept the Quest."
  };
}
