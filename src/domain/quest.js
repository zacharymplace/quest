import { z } from "zod";
import { nanoid } from "nanoid";

export const QuestCategorySchema = z.enum([
  "explorer",
  "cook",
  "maker",
  "musician",
  "creator",
  "fitness",
  "social",
  "wildcard"
]);

export const QuestSchema = z.object({
  id: z.string().min(1),
  title: z.string().min(3),
  description: z.string().min(10),
  category: QuestCategorySchema,
  difficulty: z.number().min(1).max(10),
  proofRequirements: z.array(z.string().min(1)).min(1),
  createdBy: z.string().min(1),
  createdAt: z.string().datetime()
});

export function createQuest({
  title,
  description,
  category,
  difficulty,
  proofRequirements,
  createdBy
}) {
  return QuestSchema.parse({
    id: `quest_${nanoid(12)}`,
    title,
    description,
    category,
    difficulty,
    proofRequirements,
    createdBy,
    createdAt: new Date().toISOString()
  });
}
