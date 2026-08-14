import {
  getNextChainQuests
} from "./get-next-chain-quests.js";

export function getChainRecommendations({
  attempts,
  templates
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

  return getNextChainQuests({
    completedQuestIds,
    templates
  });
}
