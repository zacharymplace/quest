import {
  z
} from "zod";

export const QuestProposalSchema =
  z.object({
    quest: z.object({
      id:
        z.string().min(1),

      title:
        z.string().min(1),

      category:
        z.string().min(1),

      difficulty:
        z.number()
          .optional()
    }),

    source:
      z.enum([
        "chain",
        "journey",
        "discovery"
      ]),

    reason:
      z.string().min(1),

    progression:
      z.string().min(1),

    skillsBuilt:
      z.array(
        z.string()
      ).optional(),

    estimatedMinutes:
      z.number()
        .positive()
        .optional(),

    difficultyChange:
      z.number()
        .optional()
  });

export function createQuestProposal({
  quest,
  source,
  reason,
  progression
}) {
  return QuestProposalSchema.parse({
    quest,
    source,
    reason,
    progression
  });
}
