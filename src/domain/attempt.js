import { z } from "zod";
import { nanoid } from "nanoid";

export const AttemptStatusSchema = z.enum([
  "active",
  "submitted",
  "completed",
  "rejected",
  "abandoned"
]);

export const AttemptSchema = z.object({
  id: z.string().min(1),
  questId: z.string().min(1),
  participantId: z.string().min(1),
  status: AttemptStatusSchema,
  startedAt: z.string().datetime(),
  submittedAt: z.string().datetime().nullable(),
  completedAt: z.string().datetime().nullable()
});

export function createAttempt({
  questId,
  participantId
}) {
  return AttemptSchema.parse({
    id: `attempt_${nanoid(12)}`,
    questId,
    participantId,
    status: "active",
    startedAt: new Date().toISOString(),
    submittedAt: null,
    completedAt: null
  });
}
