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
  submitAttempt
} from "./submit-attempt.js";

import {
  completeAttempt
} from "./complete-attempt.js";

import {
  createCompletionCard
} from "./create-completion-card.js";

import {
  createExperienceProfile
} from "../domain/experience-profile.js";

import {
  createReputation
} from "../domain/reputation.js";

import {
  completeQuestCeremony
} from "./complete-quest-ceremony.js";

export function createQuestRuntime({
  store
}) {
  function listQuests() {
    return store
      .read()
      .quests;
  }

  function getQuest(
    questId
  ) {
    return listQuests()
      .find(
        (quest) =>
          quest.id === questId
      ) ?? null;
  }

  function acceptQuest({
    questId,
    participantId
  }) {
    const quest =
      getQuest(questId);

    if (!quest) {
      throw new Error(
        `quest not found: ${questId}`
      );
    }

    const attempt =
      createAttempt({
        questId,
        participantId
      });

    store.update(
      (state) => ({
        ...state,
        attempts: [
          ...state.attempts,
          attempt
        ]
      })
    );

    return attempt;
  }

  function addProof({
    attemptId,
    type,
    value
  }) {
    const state =
      store.read();

    const attempt =
      state.attempts.find(
        (candidate) =>
          candidate.id === attemptId
      );

    if (!attempt) {
      throw new Error(
        `attempt not found: ${attemptId}`
      );
    }

    if (
      attempt.status !== "active"
    ) {
      throw new Error(
        "proof can only be added to active attempt"
      );
    }

    const proof =
      createProof({
        attemptId,
        type,
        value
      });

    store.write({
      ...state,
      proofs: [
        ...state.proofs,
        proof
      ]
    });

    return proof;
  }

  function submit({
    attemptId
  }) {
    const state =
      store.read();

    const index =
      state.attempts.findIndex(
        (attempt) =>
          attempt.id === attemptId
      );

    if (index === -1) {
      throw new Error(
        `attempt not found: ${attemptId}`
      );
    }

    const submitted =
      submitAttempt({
        attempt:
          state.attempts[index]
      });

    const attempts = [
      ...state.attempts
    ];

    attempts[index] =
      submitted;

    store.write({
      ...state,
      attempts
    });

    return submitted;
  }

  function complete({
    attemptId,
    participantName
  }) {
    const state =
      store.read();

    const index =
      state.attempts.findIndex(
        (attempt) =>
          attempt.id === attemptId
      );

    if (index === -1) {
      throw new Error(
        `attempt not found: ${attemptId}`
      );
    }

    const attempt =
      state.attempts[index];

    const quest =
      state.quests.find(
        (candidate) =>
          candidate.id ===
          attempt.questId
      );

    if (!quest) {
      throw new Error(
        `quest not found: ${attempt.questId}`
      );
    }

    const proofs =
      state.proofs.filter(
        (proof) =>
          proof.attemptId ===
          attemptId
      );

    const completed =
      completeAttempt({
        attempt,
        proofs,
        quest
      });

    const user =
      (state.users ?? []).find(
        (candidate) =>
          candidate.handle === "z$"
      ) ?? null;

    const reputation =
      user
        ? (
            (state.reputations ?? []).find(
              (candidate) =>
                candidate.userId ===
                user.id
            ) ??
            createReputation({
              userId:
                user.id
            })
          )
        : null;

    const profile =
      user
        ? (
            (state.experienceProfiles ?? [])
              .find(
                (candidate) =>
                  candidate.userId ===
                  user.id
              ) ??
            createExperienceProfile({
              userId:
                user.id
            })
          )
        : null;

    const ceremony =
      user
        ? completeQuestCeremony({
            user,
            quest,
            reputation,
            profile
          })
        : null;

    const attempts = [
      ...state.attempts
    ];

    attempts[index] =
      completed;

    const nextState = {
      ...state,
      attempts
    };

    if (
      user &&
      ceremony
    ) {
      nextState.reputations = [
        ...(state.reputations ?? [])
          .filter(
            (candidate) =>
              candidate.userId !==
              user.id
          ),
        ceremony.reputation
      ];

      nextState.experienceProfiles = [
        ...(state.experienceProfiles ?? [])
          .filter(
            (candidate) =>
              candidate.userId !==
              user.id
          ),
        ceremony.profile
      ];

      nextState.achievements = [
        ...(state.achievements ?? []),
        ceremony.achievement
      ];
    }

    store.write(
      nextState
    );

    return {
      attempt:
        completed,

      card:
        createCompletionCard({
          quest,
          attempt: completed,
          participantName
        }),

      ceremony
    };
  }

  function challenge({
    attemptId,
    recipientId
  }) {
    const state =
      store.read();

    const attempt =
      state.attempts.find(
        (candidate) =>
          candidate.id ===
          attemptId
      );

    if (!attempt) {
      throw new Error(
        `attempt not found: ${attemptId}`
      );
    }

    if (
      attempt.status !==
      "completed"
    ) {
      throw new Error(
        "challenge requires completed attempt"
      );
    }

    const challenge =
      createChallenge({
        questId:
          attempt.questId,
        challengerId:
          attempt.participantId,
        recipientId
      });

    store.write({
      ...state,
      challenges: [
        ...state.challenges,
        challenge
      ]
    });

    return challenge;
  }

  return {
    listQuests,
    getQuest,
    acceptQuest,
    addProof,
    submit,
    complete,
    challenge
  };
}
