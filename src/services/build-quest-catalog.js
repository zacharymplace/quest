import {
  questTemplates
} from "../data/quest-templates.js";

export function buildQuestCatalog({
  seedQuests = []
}) {
  const catalog =
    new Map();

  for (const quest of seedQuests) {
    catalog.set(
      quest.id,
      quest
    );
  }

  for (const template of questTemplates) {
    catalog.set(
      template.id,
      template
    );
  }

  return [
    ...catalog.values()
  ];
}
