import {
  questGraph
} from "../data/quest-graph.js";

export function getJourneyHistory({
  attempts
}) {
  const completed =
    attempts.filter(
      (attempt) =>
        attempt.status ===
        "completed"
    );

  return {
    completed:
      completed
        .map(
          (attempt) => {
            const quest =
              questGraph.find(
                (node) =>
                  node.id ===
                  attempt.questId
              );

            if (!quest) {
              return null;
            }

            return {
              id:
                quest.id,

              title:
                quest.title,

              domain:
                quest.domain,

              skillsBuilt:
                quest.skillsBuilt
            };
          }
        )
        .filter(Boolean),

    totalCompleted:
      completed.length
  };
}
