import {
  describe,
  expect,
  test
} from "vitest";

import {
  createAttempt
} from "../src/domain/attempt.js";

import {
  createProof
} from "../src/domain/proof.js";

import {
  createChallenge
} from "../src/domain/challenge.js";

import {
  createSeedQuests
} from "../src/data/seed-quests.js";

import {
  submitAttempt
} from "../src/services/submit-attempt.js";

import {
  completeAttempt
} from "../src/services/complete-attempt.js";

import {
  createCompletionCard
} from "../src/services/create-completion-card.js";

describe("Playable Quest loop", () => {
  test(
    "user can accept, prove, complete and challenge forward",
    () => {
      const [quest] =
        createSeedQuests();

      const attempt =
        createAttempt({
          questId: quest.id,
          participantId: "user_z"
        });

      const proof =
        createProof({
          attemptId: attempt.id,
          type: "photo",
          value: "proof.jpg"
        });

      const submitted =
        submitAttempt({
          attempt
        });

      expect(
        submitted.status
      ).toBe("submitted");

      const completed =
        completeAttempt({
          attempt: submitted,
          proofs: [proof],
          quest
        });

      expect(
        completed.status
      ).toBe("completed");

      const card =
        createCompletionCard({
          quest,
          attempt: completed,
          participantName: "Z$"
        });

      expect(
        card.type
      ).toBe(
        "quest-completion-card"
      );

      expect(
        card.shareText
      ).toContain(
        quest.title
      );

      const challenge =
        createChallenge({
          questId: quest.id,
          challengerId:
            completed.participantId,
          recipientId: "friend_1"
        });

      expect(
        challenge.status
      ).toBe("pending");

      expect(
        challenge.questId
      ).toBe(quest.id);
    }
  );

  test(
    "completion card rejects unfinished attempt",
    () => {
      const [quest] =
        createSeedQuests();

      const attempt =
        createAttempt({
          questId: quest.id,
          participantId: "user_z"
        });

      expect(
        () =>
          createCompletionCard({
            quest,
            attempt,
            participantName: "Z$"
          })
      ).toThrow(
        "completion card requires completed attempt"
      );
    }
  );
});
