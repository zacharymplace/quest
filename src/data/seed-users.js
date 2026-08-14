import {
  createUser
} from "../domain/user.js";

import {
  createReputation
} from "../domain/reputation.js";

export function createSeedUsers() {
  const user =
    createUser({
      handle:
        "z$",
      displayName:
        "Z$"
    });

  return {
    users: [
      user
    ],

    reputations: [
      createReputation({
        userId:
          user.id
      })
    ]
  };
}
