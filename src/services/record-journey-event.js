import {
  createJourneyEvent
} from "../events/journey-event.js";

export function recordJourneyEvent({
  store,
  type,
  userId,
  payload = {}
}) {
  return store.append(
    createJourneyEvent({
      id:
        `event_${Date.now()}`,

      type,

      userId,

      occurredAt:
        new Date().toISOString(),

      payload
    })
  );
}
