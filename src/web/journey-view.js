import {
  getUserJourney
} from "../services/get-user-journey.js";

export function getCompletionJourneyView({
  state,
  userId
}) {
  const user =
    (state.users ?? [])
      .find(
        (candidate) =>
          candidate.id === userId
      );

  const profile =
    (state.experienceProfiles ?? [])
      .find(
        (candidate) =>
          candidate.userId === userId
      );

  const achievements =
    (state.achievements ?? [])
      .filter(
        (achievement) =>
          achievement.userId === userId
      );

  if (!user || !profile) {
    return null;
  }

  return getUserJourney({
    user,
    profile,
    achievements
  });
}
