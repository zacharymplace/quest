import {
  z
} from "zod";

import {
  nanoid
} from "nanoid";

export const AchievementSchema =
  z.object({
    id:
      z.string().min(1),

    userId:
      z.string().min(1),

    questId:
      z.string().min(1),

    title:
      z.string().min(1),

    awardedAt:
      z.string().datetime()
  });

export function createAchievement({
  userId,
  questId,
  title
}) {
  return AchievementSchema.parse({
    id:
      `achievement_${nanoid(12)}`,

    userId,

    questId,

    title,

    awardedAt:
      new Date().toISOString()
  });
}
