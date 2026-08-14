export function createJourneyEventStore({
  initialEvents = []
} = {}) {
  const events = [
    ...initialEvents
  ];

  return {
    append(event) {
      events.push(event);

      return event;
    },

    list() {
      return [
        ...events
      ];
    }
  };
}
