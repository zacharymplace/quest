export function getUserJourney({
  user,
  profile,
  achievements = []
}) {
  if (!user) {
    throw new Error(
      "journey requires user"
    );
  }

  if (!profile) {
    throw new Error(
      "journey requires profile"
    );
  }

  const disciplines =
    Object.entries(
      profile.disciplines
    )
      .map(
        ([name, count]) => ({
          name,
          count
        })
      )
      .sort(
        (a, b) =>
          b.count - a.count
      );

  const latestMilestone =
    profile.milestones.at(-1) ??
    null;

  return {
    userId:
      user.id,

    displayName:
      user.displayName,

    completed:
      profile.completedCount,

    disciplines,

    latestMilestone,

    achievements:
      achievements.length
  };
}
