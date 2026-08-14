import { z } from "zod";
import { nanoid } from "nanoid";

export const ProofSchema = z.object({
  id: z.string().min(1),
  attemptId: z.string().min(1),
  type: z.enum([
    "photo",
    "video",
    "text",
    "location",
    "link"
  ]),
  value: z.string().min(1),
  submittedAt: z.string().datetime()
});

export function createProof({
  attemptId,
  type,
  value
}) {
  return ProofSchema.parse({
    id: `proof_${nanoid(12)}`,
    attemptId,
    type,
    value,
    submittedAt: new Date().toISOString()
  });
}
