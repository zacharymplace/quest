import {
  createSeedQuests
} from "../data/seed-quests.js";

export function seedStore({
  store
}) {
  const state =
    store.read();

  if (
    state.quests.length > 0
  ) {
    return state;
  }

  return store.write({
    ...state,
    quests:
      createSeedQuests()
  });
}
