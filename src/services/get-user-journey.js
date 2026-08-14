import {
  getHomeExperience
} from "./get-home-experience.js";

export function getUserJourney({
  user,
  profile,
  achievements = [],
  quests = [],
  attempts = []
}) {
  const experience =
    getHomeExperience({
      user,
      profile,
      achievements,
      quests,
      attempts
    });

  return {
    identity: {
      id:
        user.id,

      name:
        user.displayName ??
        user.handle
    },

    displayName:
      user.displayName ??
      user.handle,

    completed:
      experience.completed,

    latestMilestone:
      profile.milestones?.[
        profile.milestones.length - 1
      ] ?? null,

    disciplines:
      Object.entries(
        profile.disciplines ?? {}
      ).map(
        ([name, count]) => ({
          name,
          count
        })
      ),

    achievements:
      achievements.length,

    journey: {
      completed:
        experience.completed,

      state:
        experience.state
    },

    state:
      experience.state,

    history:
      experience.history,

    current:
      experience.current,

    next:
      experience.next,

    profile:
      experience.profile
  };
}
