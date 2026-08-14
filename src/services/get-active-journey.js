import {
  questGraph
} from "../data/quest-graph.js";

export function getActiveJourney({
  attempts,
  profile
}) {
  const activeAttempt =
    attempts.find(
      (attempt) =>
        attempt.status ===
        "active"
    );

  if (!activeAttempt) {
    return null;
  }

  const quest =
    questGraph.find(
      (node) =>
        node.id ===
        activeAttempt.questId
    );

  if (!quest) {
    return null;
  }

  const nextId =
    quest.next[0];

  const nextQuest =
    questGraph.find(
      (node) =>
        node.id ===
        nextId
    );

  return {
    currentQuest: {
      id:
        quest.id,

      title:
        quest.title,

      status:
        activeAttempt.status
    },

    builds:
      quest.skillsBuilt,

    estimatedMinutes:
      quest.estimatedMinutes,

    difficulty:
      quest.difficulty,

    nextStep:
      nextQuest
        ? nextQuest.title
        : null,

    completedCount:
      profile.completedCount
  };
}
