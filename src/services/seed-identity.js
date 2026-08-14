import {
  createSeedUsers
} from "../data/seed-users.js";

import {
  createExperienceProfile
} from "../domain/experience-profile.js";

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

    experienceProfiles:
      identity.users.map(
        (user) =>
          createExperienceProfile({
            userId:
              user.id
          })
      ),

    achievements: []
  });
}
