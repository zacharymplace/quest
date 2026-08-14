import {
  z
} from "zod";

import {
  JourneyEventTypes
} from "./journey-event-types.js";

const JourneyEventSchema =
  z.object({
    id:
      z.string().min(1),

    type:
      z.enum(
        Object.values(
          JourneyEventTypes
        )
      ),

    userId:
      z.string().min(1),

    occurredAt:
      z.string().min(1),

    payload:
      z.record(
        z.string(),
        z.unknown()
      )
  });

export function createJourneyEvent({
  id,
  type,
  userId,
  occurredAt,
  payload
}) {
  return JourneyEventSchema.parse({
    id,
    type,
    userId,
    occurredAt,
    payload
  });
}
