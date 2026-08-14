export function generateIdentityCard({
  user,
  profile
}) {
  const experiences =
    Object.entries(
      profile.disciplines
    )
      .map(
        ([name, count]) =>
          `${name}: ${count}`
      )
      .join(" · ");

  return {
    type:
      "identity-card",

    title:
      `${user.displayName}'s Journey`,

    completed:
      profile.completedCount,

    experiences,

    message:
      "Built through things actually done."
  };
}
