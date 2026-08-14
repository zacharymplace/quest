import {
  z
} from "zod";

import {
  nanoid
} from "nanoid";

export const UserSchema =
  z.object({
    id:
      z.string().min(1),

    handle:
      z.string().min(1),

    displayName:
      z.string().min(1),

    createdAt:
      z.string().datetime()
  });

export function createUser({
  handle,
  displayName
}) {
  return UserSchema.parse({
    id:
      `user_${nanoid(12)}`,

    handle,

    displayName,

    createdAt:
      new Date().toISOString()
  });
}
