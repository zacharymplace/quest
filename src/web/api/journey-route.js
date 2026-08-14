import {
  getUserJourney
} from "../../services/get-user-journey.js";

export function registerJourneyApiRoute({
  app,
  getState
}) {
  app.get(
    "/api/journey",
    (_request, response) => {
      const state =
        getState();

      const user =
        (state.users ?? [])
          .find(
            (candidate) =>
              candidate.handle ===
              "z$"
          );

      if (!user) {
        response
          .status(404)
          .json({
            error:
              "user not found"
          });

        return;
      }

      const profile =
        (
          state.experienceProfiles ?? []
        )
          .find(
            (candidate) =>
              candidate.userId ===
              user.id
          );

      if (!profile) {
        response
          .status(404)
          .json({
            error:
              "profile not found"
          });

        return;
      }

      response.json(
        getUserJourney({
          user,

          profile,

          achievements:
            state.achievements ?? [],

          quests:
            state.quests ?? [],

          attempts:
            state.attempts ?? []
        })
      );
    }
  );
}
