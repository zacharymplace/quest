import {
  AttemptSchema
} from "../domain/attempt.js";

export function submitAttempt({
  attempt
}) {
  AttemptSchema.parse(attempt);

  if (attempt.status !== "active") {
    throw new Error(
      "only active attempts can be submitted"
    );
  }

  return AttemptSchema.parse({
    ...attempt,
    status: "submitted",
    submittedAt:
      new Date().toISOString()
  });
}
