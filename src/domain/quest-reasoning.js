import {
  z
} from "zod";

export const QuestReasoningSchema =
  z.object({
    questId:
      z.string().min(1),

    reason:
      z.string().min(1),

    skillsBuilt:
      z.array(
        z.string()
      ),

    estimatedMinutes:
      z.number()
        .positive(),

    difficultyChange:
      z.number()
  });

export function createQuestReasoning({
  questId,
  reason,
  skillsBuilt,
  estimatedMinutes,
  difficultyChange
}) {
  return QuestReasoningSchema.parse({
    questId,
    reason,
    skillsBuilt,
    estimatedMinutes,
    difficultyChange
  });
}
