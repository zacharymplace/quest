import {
  createQuestReasoning
} from "../domain/quest-reasoning.js";

export function reasonAboutQuest({
  quest,
  previousQuest = null
}) {
  const difficultyChange =
    previousQuest
      ? quest.difficulty -
        previousQuest.difficulty
      : 0;

  const journeyName =
    {
      music:
        "musician",

      cooking:
        "cooking",

      explorer:
        "explorer"
    }[quest.domain] ??
    quest.domain;

  return createQuestReasoning({
    questId:
      quest.id,

    reason:
      previousQuest
        ? `Continue your ${journeyName} journey from ${previousQuest.title}`
        : `Start your ${journeyName} journey`,

    skillsBuilt:
      quest.skillsBuilt,

    estimatedMinutes:
      quest.estimatedMinutes,

    difficultyChange
  });
}
