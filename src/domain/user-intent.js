import {
  z
} from "zod";

export const UserIntentSchema =
  z.object({
    userId:
      z.string().min(1),

    domain:
      z.string().min(1),

    goal:
      z.string().min(1),

    experienceLevel:
      z.enum([
        "beginner",
        "intermediate",
        "advanced"
      ]),

    minutesPerDay:
      z.number()
        .positive()
  });

export function createUserIntent({
  userId,
  domain,
  goal,
  experienceLevel,
  minutesPerDay
}) {
  return UserIntentSchema.parse({
    userId,
    domain,
    goal,
    experienceLevel,
    minutesPerDay
  });
}
