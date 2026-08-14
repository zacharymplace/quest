import {
  AttemptSchema
} from "../domain/attempt.js";

export function completeAttempt({
  attempt,
  proofs,
  quest
}) {
  AttemptSchema.parse(attempt);

  if (attempt.status !== "submitted") {
    throw new Error(
      "attempt must be submitted before completion"
    );
  }

  if (!Array.isArray(proofs) || proofs.length === 0) {
    throw new Error(
      "attempt requires proof"
    );
  }

  if (
    proofs.length <
    quest.proofRequirements.length
  ) {
    throw new Error(
      "proof requirements not satisfied"
    );
  }

  return AttemptSchema.parse({
    ...attempt,
    status: "completed",
    completedAt: new Date().toISOString()
  });
}
