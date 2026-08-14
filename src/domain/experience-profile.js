import {
  z
} from "zod";

export const ExperienceProfileSchema =
  z.object({
    userId:
      z.string().min(1),

    completedCount:
      z.number().int().min(0),

    disciplines:
      z.record(
        z.string(),
        z.number().int().min(0)
      ),

    milestones:
      z.array(
        z.string()
      )
  });

export function createExperienceProfile({
  userId
}) {
  return ExperienceProfileSchema.parse({
    userId,

    completedCount:
      0,

    disciplines:
      {},

    milestones:
      []
  });
}

export function recordExperience({
  profile,
  category,
  title
}) {
  const disciplines = {
    ...profile.disciplines
  };

  disciplines[category] =
    (disciplines[category] ?? 0) + 1;

  return ExperienceProfileSchema.parse({
    ...profile,

    completedCount:
      profile.completedCount + 1,

    disciplines,

    milestones: [
      ...profile.milestones,
      title
    ]
  });
}
