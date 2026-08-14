import {
  getHomeFeed
} from "../services/get-home-feed.js";

export function getHomeView({
  user,
  profile,
  achievements,
  quests,
  attempts
}) {
  const feed =
    getHomeFeed({
      user,
      profile,
      achievements,
      quests,
      attempts
    });

  const featured =
    feed.recommended[0] ?? null;

  return {
    headline:
      feed.greeting,

    journeyLine:
      `${feed.journey.completed} experiences completed`,

    disciplines:
      feed.journey.disciplines,

    featuredQuest:
      featured
        ? {
            title:
              featured.title,

            category:
              featured.category,

            difficulty:
              featured.difficulty ?? null
          }
        : null,

    availableCount:
      feed.availableCount
  };
}
