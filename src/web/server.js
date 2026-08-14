import express from "express";

import {
  getCompletionJourneyView
} from "./journey-view.js";

import {
  resolve
} from "node:path";

import {
  createLocalStore
} from "../storage/local-store.js";

import {
  createEventStore
} from "../storage/event-store.js";

import {
  createQuestRuntime
} from "../services/quest-runtime.js";

import {
  seedStore
} from "../services/seed-store.js";

import {
  seedIdentity
} from "../services/seed-identity.js";

import {
  getHomeExperience
} from "../services/get-home-experience.js";

import {
  registerJourneyApiRoute
} from "./api/journey-route.js";

const app =
  express();

const port =
  Number(
    process.env.PORT ?? 3000
  );

app.use(
  express.urlencoded({
    extended: false
  })
);

const store =
  createLocalStore({
    filePath:
      resolve(
        "data",
        "quest-state.json"
      )
  });

seedStore({
  store
});

seedIdentity({
  store
});

const eventStore =
  createEventStore({
    filePath:
      resolve(
        "data",
        "events.json"
      )
  });

const runtime =
  createQuestRuntime({
    store,

    eventStore
  });

function escapeHtml(
  value
) {
  return String(value)
    .replaceAll(
      "&",
      "&amp;"
    )
    .replaceAll(
      "<",
      "&lt;"
    )
    .replaceAll(
      ">",
      "&gt;"
    )
    .replaceAll(
      '"',
      "&quot;"
    )
    .replaceAll(
      "'",
      "&#039;"
    );
}

function page({
  title,
  body
}) {
  return `<!doctype html>
<html lang="en">
<head>
  <meta charset="utf-8">

  <meta
    name="viewport"
    content="width=device-width, initial-scale=1"
  >

  <title>${escapeHtml(title)} · Quest</title>

  <style>
    :root {
      font-family:
        Inter,
        ui-sans-serif,
        system-ui,
        sans-serif;
      color: #111;
      background: #f5f5f3;
    }

    * {
      box-sizing: border-box;
    }

    body {
      margin: 0;
    }

    main {
      width: min(
        900px,
        calc(100% - 32px)
      );
      margin: 0 auto;
      padding:
        64px 0
        96px;
    }

    header {
      display: flex;
      align-items: center;
      justify-content:
        space-between;
      margin-bottom: 48px;
    }

    a {
      color: inherit;
    }

    .brand {
      font-size: 22px;
      font-weight: 800;
      text-decoration: none;
      letter-spacing: -0.04em;
    }

    .eyebrow {
      margin: 0 0 12px;
      font-size: 13px;
      font-weight: 700;
      text-transform: uppercase;
      letter-spacing: 0.08em;
      opacity: 0.55;
    }

    h1 {
      margin: 0;
      max-width: 720px;
      font-size:
        clamp(
          42px,
          8vw,
          80px
        );
      line-height: 0.95;
      letter-spacing: -0.06em;
    }

    .lede {
      max-width: 620px;
      margin:
        24px 0
        48px;
      font-size: 20px;
      line-height: 1.45;
      opacity: 0.7;
    }

    .grid {
      display: grid;
      gap: 16px;
    }

    .card {
      display: block;
      padding: 24px;
      border: 1px solid #ddd;
      border-radius: 20px;
      background: white;
      text-decoration: none;
    }

    .card:hover {
      border-color: #999;
    }

    .meta {
      display: flex;
      flex-wrap: wrap;
      gap: 12px;
      margin-bottom: 12px;
      font-size: 13px;
      text-transform: uppercase;
      letter-spacing: 0.05em;
      opacity: 0.55;
    }

    .status {
      font-weight: 800;
      opacity: 1;
    }

    .card h2 {
      margin: 0 0 8px;
      font-size: 28px;
      letter-spacing: -0.04em;
    }

    .card p {
      margin: 0;
      max-width: 650px;
      line-height: 1.5;
      opacity: 0.7;
    }

    .panel {
      padding: 32px;
      border-radius: 24px;
      background: white;
      border: 1px solid #ddd;
    }

    .panel h1 {
      font-size:
        clamp(
          40px,
          7vw,
          68px
        );
    }

    .section {
      margin-top: 32px;
      padding-top: 24px;
      border-top: 1px solid #eee;
    }

    .section h2 {
      margin-top: 0;
      font-size: 16px;
    }

    form {
      display: grid;
      gap: 12px;
      margin-top: 24px;
    }

    label {
      font-size: 13px;
      font-weight: 700;
    }

    input,
    textarea {
      width: 100%;
      padding: 14px 16px;
      border: 1px solid #ccc;
      border-radius: 12px;
      background: white;
      font: inherit;
    }

    textarea {
      min-height: 120px;
      resize: vertical;
    }

    button,
    .cta {
      width: fit-content;
      border: 0;
      padding:
        14px 20px;
      border-radius: 999px;
      background: #111;
      color: white;
      font: inherit;
      font-weight: 700;
      text-decoration: none;
      cursor: pointer;
    }

    .secondary {
      background: #ececea;
      color: #111;
    }

    .stack {
      display: flex;
      flex-wrap: wrap;
      gap: 10px;
      margin-top: 24px;
    }

    .proof {
      padding: 16px;
      border-radius: 14px;
      background: #f4f4f1;
      overflow-wrap: anywhere;
    }
  </style>
</head>

<body>
  <main>
    <header>
      <a
        class="brand"
        href="/"
      >
        Quest
      </a>
    </header>

    ${body}
  </main>
</body>
</html>`;
}

function getState() {
  return store.read();
}

function getAttempt(
  attemptId
) {
  return getState()
    .attempts
    .find(
      (attempt) =>
        attempt.id ===
        attemptId
    ) ?? null;
}

function getAttemptForQuest(
  questId
) {
  return getState()
    .attempts
    .find(
      (attempt) =>
        attempt.questId ===
        questId &&
        attempt.participantId ===
        "user_z"
    ) ?? null;
}

app.get(
  "/",
  (_request, response) => {
    const state =
      getState();

    const user =
      (state.users ?? [])
        .find(
          (candidate) =>
            candidate.handle ===
            "z$"
        );

    const profile =
      user
        ? (
            (state.experienceProfiles ?? [])
              .find(
                (candidate) =>
                  candidate.userId ===
                  user.id
              )
          )
        : null;

    const experience =
      user && profile
        ? getHomeExperience({
            user,

            profile,

            achievements:
              state.achievements ?? [],

            quests:
              runtime.listQuests(),

            attempts:
              state.attempts ?? []
          })
        : null;

    const homeView =
      experience;

    const journeyDashboard =
      experience?.current
        ? {
            questTitle:
              experience.current.title,

            status:
              experience.current.status,

            builds:
              experience.current.builds,

            nextStep:
              experience.current.nextStep,

            completed:
              experience.profile
                .completedCount
          }
        : null;

    const journeyHistory =
      experience?.history
        ? {
            completed:
              experience.history.completed,

            totalCompleted:
              experience.history.totalCompleted
          }
        : null;

    const journeyState =
      experience
        ? {
            state:
              experience.state,

            nextAction:
              experience.next?.reason ??
              null
          }
        : null;

    const quests =
      runtime.listQuests();

    const cards =
      quests
        .map(
          (quest) => {
            const attempt =
              getAttemptForQuest(
                quest.id
              );

            const status =
              attempt
                ? attempt.status
                : "available";

            return `
<a
  class="card"
  href="/quests/${encodeURIComponent(
    quest.id
  )}"
>
  <div class="meta">
    <span>
      ${escapeHtml(
        quest.category
      )}
    </span>

    <span>
      Difficulty
      ${escapeHtml(
        quest.difficulty
      )}/10
    </span>

    <span class="status">
      ${escapeHtml(
        status
      )}
    </span>
  </div>

  <h2>
    ${escapeHtml(
      quest.title
    )}
  </h2>

  <p>
    ${escapeHtml(
      quest.description
    )}
  </p>
</a>`;
          }
        )
        .join("\n");

    response.send(
      page({
        title:
          "Do something worth remembering",
        body: `
<section>
  <p class="eyebrow">
    Real-world challenges
  </p>

  <h1>
    Do something.
    Prove it.
    Pass it on.
  </h1>

  <p class="lede">
    Quest is a network built around
    action instead of passive feeds.
  </p>

  ${
    journeyState
      ? `
<section class="panel">
  <p class="eyebrow">
    Journey state
  </p>

  <h2>
    ${
      journeyState.state === "new"
        ? "Start your first journey"
        : journeyState.state === "active"
          ? "Keep building your path"
          : "Choose your next challenge"
    }
  </h2>

  <p>
    ${escapeHtml(
      journeyState.nextAction
    )}
  </p>
</section>
`
      : ""
  }

  ${
    journeyHistory &&
    journeyHistory.completed.length > 0
      ? `
<section class="panel">
  <p class="eyebrow">
    Your journey
  </p>

  <h2>
    Completed milestones
  </h2>

  ${
    journeyHistory.completed
      .map(
        (quest) => `
<p>
  ✓ ${escapeHtml(
    quest.title
  )}
</p>
`
      )
      .join("")
  }

  <p>
    Total completed:
    ${escapeHtml(
      journeyHistory.totalCompleted
    )}
  </p>
</section>
`
      : ""
  }

  ${
    journeyDashboard
      ? `
<section class="panel">
  <p class="eyebrow">
    Current journey
  </p>

  <h2>
    ${escapeHtml(
      journeyDashboard.questTitle
    )}
  </h2>

  <p>
    Status:
    ${escapeHtml(
      journeyDashboard.status
    )}
  </p>

  ${
    journeyDashboard.builds.length > 0
      ? `
<p>
  Builds:
  ${journeyDashboard.builds
    .map(
      (skill) =>
        escapeHtml(skill)
    )
    .join(" · ")}
</p>
`
      : ""
  }

  ${
    journeyDashboard.nextStep
      ? `
<p>
  Next milestone:
  ${escapeHtml(
    journeyDashboard.nextStep
  )}
</p>
`
      : ""
  }

  <p>
    Completed:
    ${escapeHtml(
      journeyDashboard.completed
    )}
    Quests
  </p>
</section>
`
      : ""
  }

  ${
    homeView &&
    homeView.nextQuest
      ? `
<section class="panel">
  <p class="eyebrow">
    Continue your journey
  </p>

  <h2>
    ${escapeHtml(
      homeView.nextQuest.title
    )}
  </h2>

  <p>
    Because:
    ${escapeHtml(
      homeView.nextQuest.reason
    )}
  </p>

  <p>
    ${escapeHtml(
      homeView.nextQuest.progression
    )}
  </p>

  ${
    homeView.nextQuest.skillsBuilt &&
    homeView.nextQuest.skillsBuilt.length > 0
      ? `
<p>
  Builds:
  ${homeView.nextQuest.skillsBuilt
    .map(
      (skill) =>
        escapeHtml(skill)
    )
    .join(" · ")}
</p>
`
      : ""
  }

  ${
    homeView.nextQuest.estimatedMinutes
      ? `
<p>
  Time:
  ${escapeHtml(
    homeView.nextQuest.estimatedMinutes
  )} minutes
</p>
`
      : ""
  }

  ${
    homeView.nextQuest.difficultyChange !==
    null &&
    homeView.nextQuest.difficultyChange !==
    undefined
      ? `
<p>
  Difficulty:
  ${
    homeView.nextQuest.difficultyChange > 0
      ? "+"
      : ""
  }${escapeHtml(
    homeView.nextQuest.difficultyChange
  )}
</p>
`
      : ""
  }

  <div class="meta">
    <span>
      ${escapeHtml(
        homeView.nextQuest.category
      )}
    </span>

    <span>
      Source:
      ${escapeHtml(
        homeView.nextQuest.source
      )}
    </span>
  </div>
</section>
`
      : ""
  }

  <div class="grid">
    ${cards}
  </div>
</section>
`
      })
    );
  }
);

app.get(
  "/quests/:questId",
  (request, response) => {
    const quest =
      runtime.getQuest(
        request.params.questId
      );

    if (!quest) {
      response
        .status(404)
        .send(
          page({
            title:
              "Quest not found",
            body: `
<h1>
  Quest not found.
</h1>
`
          })
        );

      return;
    }

    const attempt =
      getAttemptForQuest(
        quest.id
      );

    if (attempt) {
      response.redirect(
        `/attempts/${encodeURIComponent(
          attempt.id
        )}`
      );

      return;
    }

    const requirements =
      quest
        .proofRequirements
        .map(
          (requirement) => `
<li>
  ${escapeHtml(
    requirement
  )}
</li>`
        )
        .join("");

    response.send(
      page({
        title:
          quest.title,
        body: `
<article class="panel">
  <p class="eyebrow">
    ${escapeHtml(
      quest.category
    )}
    · Difficulty
    ${escapeHtml(
      quest.difficulty
    )}/10
  </p>

  <h1>
    ${escapeHtml(
      quest.title
    )}
  </h1>

  <p class="lede">
    ${escapeHtml(
      quest.description
    )}
  </p>

  <section class="section">
    <h2>
      Proof required
    </h2>

    <ul>
      ${requirements}
    </ul>
  </section>

  <form
    method="post"
    action="/quests/${encodeURIComponent(
      quest.id
    )}/accept"
  >
    <button type="submit">
      Accept Quest
    </button>
  </form>
</article>
`
      })
    );
  }
);

app.post(
  "/quests/:questId/accept",
  (request, response) => {
    const quest =
      runtime.getQuest(
        request.params.questId
      );

    if (!quest) {
      response
        .status(404)
        .send(
          "Quest not found"
        );

      return;
    }

    const existing =
      getAttemptForQuest(
        quest.id
      );

    if (existing) {
      response.redirect(
        `/attempts/${encodeURIComponent(
          existing.id
        )}`
      );

      return;
    }

    const attempt =
      runtime.acceptQuest({
        questId:
          quest.id,
        participantId:
          "user_z"
      });

    response.redirect(
      `/attempts/${encodeURIComponent(
        attempt.id
      )}`
    );
  }
);

app.get(
  "/attempts/:attemptId",
  (request, response) => {
    const attempt =
      getAttempt(
        request.params.attemptId
      );

    if (!attempt) {
      response
        .status(404)
        .send(
          page({
            title:
              "Attempt not found",
            body: `
<h1>
  Attempt not found.
</h1>
`
          })
        );

      return;
    }

    const quest =
      runtime.getQuest(
        attempt.questId
      );

    const state =
      getState();

    const proofs =
      state.proofs.filter(
        (proof) =>
          proof.attemptId ===
          attempt.id
      );

    const proofMarkup =
      proofs.length === 0
        ? `
<p>
  No proof submitted yet.
</p>
`
        : proofs
            .map(
              (proof) => `
<div class="proof">
  <strong>
    ${escapeHtml(
      proof.type
    )}
  </strong>

  <div>
    ${escapeHtml(
      proof.value
    )}
  </div>
</div>`
            )
            .join("\n");

    let actions = "";

    if (
      attempt.status ===
      "active"
    ) {
      actions = `
<section class="section">
  <h2>
    Submit proof
  </h2>

  <form
    method="post"
    action="/attempts/${encodeURIComponent(
      attempt.id
    )}/proof"
  >
    <label for="proof">
      What did you do?
    </label>

    <textarea
      id="proof"
      name="proof"
      required
      placeholder="Describe your proof..."
    ></textarea>

    <button type="submit">
      Add Proof
    </button>
  </form>

  ${
    proofs.length > 0
      ? `
<form
  method="post"
  action="/attempts/${encodeURIComponent(
    attempt.id
  )}/submit"
>
  <button
    class="secondary"
    type="submit"
  >
    Submit Quest
  </button>
</form>
`
      : ""
  }
</section>
`;
    }

    if (
      attempt.status ===
      "submitted"
    ) {
      actions = `
<section class="section">
  <h2>
    Ready for completion
  </h2>

  <form
    method="post"
    action="/attempts/${encodeURIComponent(
      attempt.id
    )}/complete"
  >
    <button type="submit">
      Complete Quest
    </button>
  </form>
</section>
`;
    }

    if (
      attempt.status ===
      "completed"
    ) {
      const challengeCount =
        state.challenges.filter(
          (challenge) =>
            challenge.questId ===
            quest.id &&
            challenge.challengerId ===
            attempt.participantId
        ).length;

      actions = `
<section class="section">
  <p class="eyebrow">
    Completed
  </p>

  <h2>
    Pass it on.
  </h2>

  <p>
    You completed this Quest.
    Challenge someone else to do it.
  </p>

  <form
    method="post"
    action="/attempts/${encodeURIComponent(
      attempt.id
    )}/challenge"
  >
    <label for="recipient">
      Who are you challenging?
    </label>

    <input
      id="recipient"
      name="recipient"
      required
      autocomplete="off"
      placeholder="Friend name or handle"
    >

    <button type="submit">
      Challenge them
    </button>
  </form>

  ${
    challengeCount > 0
      ? `
<p>
  ${challengeCount}
  challenge${challengeCount === 1 ? "" : "s"}
  sent from this Quest.
</p>
`
      : ""
  }

  <div class="stack">
    <a
      class="cta secondary"
      href="/attempts/${encodeURIComponent(
        attempt.id
      )}/share"
    >
      View completion card
    </a>

    <a
      class="cta secondary"
      href="/"
    >
      Find another Quest
    </a>
  </div>
</section>
`;
    }

    response.send(
      page({
        title:
          quest.title,
        body: `
<article class="panel">
  <p class="eyebrow">
    ${escapeHtml(
      quest.category
    )}
    · ${escapeHtml(
      attempt.status
    )}
  </p>

  <h1>
    ${escapeHtml(
      quest.title
    )}
  </h1>

  <p class="lede">
    ${escapeHtml(
      quest.description
    )}
  </p>

  <section class="section">
    <h2>
      Proof
    </h2>

    <div class="grid">
      ${proofMarkup}
    </div>
  </section>

  ${actions}
</article>
`
      })
    );
  }
);

app.post(
  "/attempts/:attemptId/proof",
  (request, response) => {
    const attempt =
      getAttempt(
        request.params.attemptId
      );

    if (!attempt) {
      response
        .status(404)
        .send(
          "Attempt not found"
        );

      return;
    }

    runtime.addProof({
      attemptId:
        attempt.id,
      type: "text",
      value:
        request.body.proof
    });

    response.redirect(
      `/attempts/${encodeURIComponent(
        attempt.id
      )}`
    );
  }
);

app.post(
  "/attempts/:attemptId/submit",
  (request, response) => {
    const attempt =
      runtime.submit({
        attemptId:
          request.params.attemptId
      });

    response.redirect(
      `/attempts/${encodeURIComponent(
        attempt.id
      )}`
    );
  }
);

app.post(
  "/attempts/:attemptId/complete",
  (request, response) => {
    const result =
      runtime.complete({
        attemptId:
          request.params.attemptId,
        participantName:
          "Z$"
      });

    response.redirect(
      `/attempts/${encodeURIComponent(
        result.attempt.id
      )}`
    );
  }
);


app.post(
  "/attempts/:attemptId/challenge",
  (request, response) => {
    const attempt =
      getAttempt(
        request.params.attemptId
      );

    if (!attempt) {
      response
        .status(404)
        .send(
          "Attempt not found"
        );

      return;
    }

    const recipient =
      String(
        request.body.recipient ?? ""
      ).trim();

    if (recipient === "") {
      response
        .status(400)
        .send(
          "Recipient is required"
        );

      return;
    }

    const challenge =
      runtime.challenge({
        attemptId:
          attempt.id,
        recipientId:
          recipient
      });

    response.redirect(
      `/challenges/${encodeURIComponent(
        challenge.id
      )}`
    );
  }
);

app.get(
  "/challenges/:challengeId",
  (request, response) => {
    const state =
      getState();

    const challenge =
      state.challenges.find(
        (candidate) =>
          candidate.id ===
          request.params.challengeId
      );

    if (!challenge) {
      response
        .status(404)
        .send(
          page({
            title:
              "Challenge not found",
            body: `
<h1>
  Challenge not found.
</h1>
`
          })
        );

      return;
    }

    const quest =
      runtime.getQuest(
        challenge.questId
      );

    response.send(
      page({
        title:
          `Challenge: ${quest.title}`,
        body: `
<article class="panel">
  <p class="eyebrow">
    You have been challenged
  </p>

  <h1>
    ${escapeHtml(
      quest.title
    )}
  </h1>

  <p class="lede">
    ${escapeHtml(
      challenge.challengerId
    )}
    challenged
    ${escapeHtml(
      challenge.recipientId
    )}
    to complete this Quest.
  </p>

  <section class="section">
    <h2>
      The Quest
    </h2>

    <p>
      ${escapeHtml(
        quest.description
      )}
    </p>

    <p>
      Difficulty:
      ${escapeHtml(
        quest.difficulty
      )}/10
    </p>
  </section>

  <div class="stack">
    <a
      class="cta"
      href="/quests/${encodeURIComponent(
        quest.id
      )}"
    >
      View Quest
    </a>

    <a
      class="cta secondary"
      href="/"
    >
      Explore Quest
    </a>
  </div>
</article>
`
      })
    );
  }
);

app.get(
  "/attempts/:attemptId/share",
  (request, response) => {
    const attempt =
      getAttempt(
        request.params.attemptId
      );

    if (
      !attempt ||
      attempt.status !==
      "completed"
    ) {
      response
        .status(404)
        .send(
          page({
            title:
              "Completion not found",
            body: `
<h1>
  Completion not found.
</h1>
`
          })
        );

      return;
    }

    const quest =
      runtime.getQuest(
        attempt.questId
      );

    const card =
      {
        participantName:
          "Z$",
        title:
          quest.title,
        category:
          quest.category,
        difficulty:
          quest.difficulty
      };

    const journey =
      getCompletionJourneyView({
        state:
          store.read(),
        userId:
          "user_z"
      });

    const journeyMarkup =
      journey
        ? `
<div class="section">
  <h2>
    Your journey expanded
  </h2>

  <p>
    Total experiences:
    ${escapeHtml(
      journey.completed
    )}
  </p>

  <p>
    ${
      journey.disciplines
        .map(
          (discipline) =>
            `${escapeHtml(
              discipline.name
            )}: ${escapeHtml(
              discipline.count
            )}`
        )
        .join(" · ")
    }
  </p>

  <p>
    Latest milestone:
    ${escapeHtml(
      journey.latestMilestone ??
      "New experience"
    )}
  </p>
</div>
`
        : "";

    response.send(
      page({
        title:
          `${quest.title} completed`,
        body: `
<section
  class="panel"
  style="
    min-height: 560px;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
  "
>
  <div>
    <p class="eyebrow">
      Quest completed
    </p>

    <h1>
      ${escapeHtml(
        card.title
      )}
    </h1>
  </div>

  <div>
    <p
      style="
        font-size: 28px;
        margin-bottom: 12px;
      "
    >
      ${escapeHtml(
        card.participantName
      )}
      did it.
    </p>

    <div class="meta">
      <span>
        ${escapeHtml(
          card.category
        )}
      </span>

      <span>
        Difficulty
        ${escapeHtml(
          card.difficulty
        )}/10
      </span>
    </div>

    ${journeyMarkup}

    <p class="lede">
      Think you can complete it?
    </p>

    <a
      class="cta"
      href="/quests/${encodeURIComponent(
        quest.id
      )}"
    >
      Accept the Quest
    </a>
  </div>
</section>
`
      })
    );
  }
);


app.get(
  "/onboarding",
  (_request, response) => {
    response.send(
      page({
        title:
          "Start your journey",
        body: `
<section class="panel">
  <p class="eyebrow">
    Start your journey
  </p>

  <h1>
    Who do you want to become?
  </h1>

  <p class="lede">
    Choose a direction and Quest will
    give you a concrete first step.
  </p>

  <form
    method="post"
    action="/onboarding"
  >
    <label for="goal">
      Your goal
    </label>

    <input
      id="goal"
      name="goal"
      required
      placeholder="Become a better musician"
    >

    <label for="domain">
      Domain
    </label>

    <select
      id="domain"
      name="domain"
      required
    >
      <option value="music">
        Music
      </option>

      <option value="cooking">
        Cooking
      </option>
    </select>

    <label for="experienceLevel">
      Experience level
    </label>

    <select
      id="experienceLevel"
      name="experienceLevel"
      required
    >
      <option value="beginner">
        Beginner
      </option>

      <option value="intermediate">
        Intermediate
      </option>

      <option value="advanced">
        Advanced
      </option>
    </select>

    <label for="minutesPerDay">
      Minutes available per day
    </label>

    <input
      id="minutesPerDay"
      name="minutesPerDay"
      type="number"
      min="1"
      value="30"
      required
    >

    <button type="submit">
      Create my first Quest
    </button>
  </form>
</section>
`
      })
    );
  }
);

app.post(
  "/onboarding",
  (request, response) => {
    const state =
      getState();

    const user =
      (state.users ?? [])
        .find(
          (candidate) =>
            candidate.handle ===
            "z$"
        );

    if (!user) {
      response
        .status(500)
        .send(
          "User identity not initialized"
        );

      return;
    }

    const intent = {
      domain:
        String(
          request.body.domain ?? ""
        ),

      goal:
        String(
          request.body.goal ?? ""
        ).trim(),

      experienceLevel:
        String(
          request.body.experienceLevel ??
          "beginner"
        ),

      minutesPerDay:
        Number(
          request.body.minutesPerDay
        )
    };

    const view =
      getOnboardingView({
        userId:
          user.id,
        intent
      });

    response.send(
      page({
        title:
          view.headline,
        body: `
<section class="panel">
  <p class="eyebrow">
    Your first Quest
  </p>

  <h1>
    ${escapeHtml(
      view.questTitle
    )}
  </h1>

  <p class="lede">
    Goal:
    ${escapeHtml(
      view.goal
    )}
  </p>

  <section class="section">
    <h2>
      Why this Quest
    </h2>

    <p>
      ${escapeHtml(
        view.reason
      )}
    </p>

    ${
      view.skillsBuilt.length > 0
        ? `
<p>
  Builds:
  ${view.skillsBuilt
    .map(
      (skill) =>
        escapeHtml(skill)
    )
    .join(" · ")}
</p>
`
        : ""
    }

    <p>
      Estimated time:
      ${escapeHtml(
        view.estimatedMinutes
      )}
      minutes
    </p>
  </section>

  <form
    method="post"
    action="/quests/${encodeURIComponent(
      view.questId
    )}/accept"
  >
    <button
      type="submit"
      class="cta"
    >
      Accept first Quest
    </button>
  </form>
</section>
`
      })
    );
  }
);

registerJourneyApiRoute({
  app,

  getState
});

app.listen(
  port,
  () => {
    console.log(
      `Quest web running at http://localhost:${port}`
    );
  }
);
