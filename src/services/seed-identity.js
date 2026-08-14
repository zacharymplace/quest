import {
  createSeedUsers
} from "../data/seed-users.js";

export function seedIdentity({
  store
}) {
  const state =
    store.read();

  if (
    state.users &&
    state.users.length > 0
  ) {
    return state;
  }

  const identity =
    createSeedUsers();

  return store.write({
    ...state,
    ...identity,
    achievements: []
  });
}
