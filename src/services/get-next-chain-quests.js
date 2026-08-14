export function getNextChainQuests({
  completedQuestIds,
  templates
}) {
  const completed =
    new Set(
      completedQuestIds
    );

  const unlocked =
    templates.filter(
      (template) =>
        completed.has(
          template.id
        )
    );

  const nextIds =
    unlocked.flatMap(
      (template) =>
        template.next
    );

  return templates.filter(
    (template) =>
      nextIds.includes(
        template.id
      ) &&
      !completed.has(
        template.id
      )
  );
}
