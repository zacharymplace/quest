export function recommendNextQuests({
  availableQuests,
  profile
}) {
  if (
    !profile ||
    !profile.disciplines
  ) {
    return availableQuests.slice(
      0,
      3
    );
  }

  const categories =
    Object.entries(
      profile.disciplines
    )
      .sort(
        (a, b) =>
          b[1] - a[1]
      )
      .map(
        ([category]) =>
          category
      );

  const ranked =
    [...availableQuests]
      .sort(
        (a, b) => {
          const aScore =
            categories.includes(
              a.category
            )
              ? 10
              : 0;

          const bScore =
            categories.includes(
              b.category
            )
              ? 10
              : 0;

          return bScore - aScore;
        }
      );

  return ranked.slice(
    0,
    3
  );
}
