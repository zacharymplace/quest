import {
  z
} from "zod";

export const ReputationSchema =
  z.object({
    userId:
      z.string().min(1),

    completedQuests:
      z.number().int().min(0),

    totalPoints:
      z.number().int().min(0),

    level:
      z.number().int().min(1)
  });

export function createReputation({
  userId
}) {
  return ReputationSchema.parse({
    userId,
    completedQuests: 0,
    totalPoints: 0,
    level: 1
  });
}

export function awardQuestCompletion({
  reputation,
  difficulty
}) {
  const points =
    difficulty * 10;

  const totalPoints =
    reputation.totalPoints +
    points;

  return ReputationSchema.parse({
    ...reputation,

    completedQuests:
      reputation.completedQuests + 1,

    totalPoints,

    level:
      Math.floor(
        totalPoints / 100
      ) + 1
  });
}
