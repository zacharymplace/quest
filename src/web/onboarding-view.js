import {
  createFirstQuestProposal
} from "../services/create-first-quest-proposal.js";

export function getOnboardingView({
  userId,
  intent
}) {
  const result =
    createFirstQuestProposal({
      userId,
      intent
    });

  return {
    headline:
      "Your first Quest",

    goal:
      intent.goal,

    questId:
      result.proposal.quest.id,

    questTitle:
      result.proposal.quest.title,

    reason:
      result.proposal.reason,

    skillsBuilt:
      result.proposal.skillsBuilt,

    estimatedMinutes:
      result.proposal.estimatedMinutes
  };
}
