import {
  describe,
  expect,
  test
} from "vitest";

import {
  createQuest
} from "../src/domain/quest.js";

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
  completeAttempt
} from "../src/services/complete-attempt.js";

describe("Quest core loop", () => {
  test(
    "quest can progress from creation to completion and challenge",
    () => {
      const quest = createQuest({
        title: "Make fresh pasta",
        description:
          "Make fresh pasta from scratch and document the finished dish.",
        category: "cook",
        difficulty: 5,
        proofRequirements: [
          "finished dish photo"
        ],
        createdBy: "user_z"
      });

      const attempt = createAttempt({
        questId: quest.id,
        participantId: "user_a"
      });

      const proof = createProof({
        attemptId: attempt.id,
        type: "photo",
        value: "pasta.jpg"
      });

      const submittedAttempt = {
        ...attempt,
        status: "submitted",
        submittedAt:
          new Date().toISOString()
      };

      const completed =
        completeAttempt({
          attempt: submittedAttempt,
          proofs: [proof],
          quest
        });

      expect(
        completed.status
      ).toBe("completed");

      const challenge =
        createChallenge({
          questId: quest.id,
          challengerId:
            attempt.participantId,
          recipientId: "user_b"
        });

      expect(
        challenge.status
      ).toBe("pending");
    }
  );
});
