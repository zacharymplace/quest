import {
  QuestSchema
} from "../domain/quest.js";

import {
  AttemptSchema
} from "../domain/attempt.js";

export function createCompletionCard({
  quest,
  attempt,
  participantName
}) {
  QuestSchema.parse(quest);
  AttemptSchema.parse(attempt);

  if (
    attempt.status !== "completed"
  ) {
    throw new Error(
      "completion card requires completed attempt"
    );
  }

  if (
    typeof participantName !== "string" ||
    participantName.trim() === ""
  ) {
    throw new Error(
      "participant name is required"
    );
  }

  return {
    type: "quest-completion-card",
    questId: quest.id,
    attemptId: attempt.id,
    participantName:
      participantName.trim(),
    title: quest.title,
    category: quest.category,
    difficulty: quest.difficulty,
    callToAction: "Can you complete this quest?",
    shareText:
      `${participantName.trim()} completed "${quest.title}". ` +
      "Can you complete it?"
  };
}
