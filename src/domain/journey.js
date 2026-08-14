import {
  z
} from "zod";

export const JourneySchema =
  z.object({
    userId:
      z.string().min(1),

    intent:
      z.object({
        domain:
          z.string(),

        goal:
          z.string()
      }),

    firstQuestId:
      z.string().min(1),

    reason:
      z.string().min(1)
  });

export function createJourney({
  userId,
  intent,
  firstQuestId,
  reason
}) {
  return JourneySchema.parse({
    userId,
    intent,
    firstQuestId,
    reason
  });
}
