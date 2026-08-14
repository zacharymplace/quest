import {
  questGraph
} from "../data/quest-graph.js";

export function resolveStartingQuest({
  intent
}) {
  return questGraph.find(
    (quest) =>
      quest.domain ===
      intent.domain
  ) ?? null;
}
