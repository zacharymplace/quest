import {
  createAttempt
} from "../domain/attempt.js";

import {
  createProof
} from "../domain/proof.js";

import {
  createChallenge
} from "../domain/challenge.js";

import {
  createSeedQuests
} from "../data/seed-quests.js";

import {
  submitAttempt
} from "../services/submit-attempt.js";

import {
  completeAttempt
} from "../services/complete-attempt.js";

import {
  createCompletionCard
} from "../services/create-completion-card.js";

const quests =
  createSeedQuests();

const quest =
  quests[0];

const attempt =
  createAttempt({
    questId: quest.id,
    participantId: "user_z"
  });

const proof =
  createProof({
    attemptId: attempt.id,
    type: "photo",
    value: "fresh-pasta.jpg"
  });

const submitted =
  submitAttempt({
    attempt
  });

const completed =
  completeAttempt({
    attempt: submitted,
    proofs: [proof],
    quest
  });

const card =
  createCompletionCard({
    quest,
    attempt: completed,
    participantName: "Z$"
  });

const challenge =
  createChallenge({
    questId: quest.id,
    challengerId:
      completed.participantId,
    recipientId: "friend_1"
  });

console.log(
  JSON.stringify(
    {
      quest,
      attempt: completed,
      proof,
      completionCard: card,
      challenge
    },
    null,
    2
  )
);
