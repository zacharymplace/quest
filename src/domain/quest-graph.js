import {
  z
} from "zod";

export const QuestNodeSchema =
  z.object({
    id:
      z.string().min(1),

    domain:
      z.string().min(1),

    title:
      z.string().min(1),

    difficulty:
      z.number(),

    next:
      z.array(
        z.string()
      )
  });

export const QuestGraphSchema =
  z.array(
    QuestNodeSchema
  );

export function createQuestGraph(
  nodes
) {
  return QuestGraphSchema.parse(
    nodes
  );
}
