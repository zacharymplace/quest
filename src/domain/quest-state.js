import {
  z
} from "zod";

export const QuestStateSchema =
  z.enum([
    "available",
    "active",
    "completed",
    "archived"
  ]);
