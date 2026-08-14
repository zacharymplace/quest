import {
  awardCompletion
} from "./award-completion.js";

import {
  generateIdentityCard
} from "./generate-identity-card.js";

export function completeQuestCeremony({
  user,
  quest,
  reputation,
  profile
}) {
  const progression =
    awardCompletion({
      user,
      quest,
      reputation
    });

  const updatedProfile = {
    ...profile,
    completedCount:
      profile.completedCount + 1,
    disciplines: {
      ...profile.disciplines,
      [quest.category]:
        (
          profile.disciplines[
            quest.category
          ] ?? 0
        ) + 1
    },
    milestones: [
      ...profile.milestones,
      quest.title
    ]
  };

  const identityCard =
    generateIdentityCard({
      user,
      profile:
        updatedProfile
    });

  return {
    reputation:
      progression.reputation,

    achievement:
      progression.achievement,

    profile:
      updatedProfile,

    identityCard
  };
}
