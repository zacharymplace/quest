import {
  awardQuestCompletion
} from "../domain/reputation.js";

import {
  createAchievement
} from "../domain/achievement.js";

export function awardCompletion({
  user,
  quest,
  reputation
}) {
  const updated =
    awardQuestCompletion({
      reputation,
      difficulty:
        quest.difficulty
    });

  const achievement =
    createAchievement({
      userId:
        user.id,

      questId:
        quest.id,

      title:
        quest.title
    });

  return {
    reputation:
      updated,

    achievement
  };
}
