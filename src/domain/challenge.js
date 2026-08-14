import { z } from "zod";
import { nanoid } from "nanoid";

export const ChallengeSchema = z.object({
  id: z.string().min(1),
  questId: z.string().min(1),
  challengerId: z.string().min(1),
  recipientId: z.string().min(1),
  status: z.enum([
    "pending",
    "accepted",
    "declined",
    "completed"
  ]),
  createdAt: z.string().datetime()
});

export function createChallenge({
  questId,
  challengerId,
  recipientId
}) {
  return ChallengeSchema.parse({
    id: `challenge_${nanoid(12)}`,
    questId,
    challengerId,
    recipientId,
    status: "pending",
    createdAt: new Date().toISOString()
  });
}
