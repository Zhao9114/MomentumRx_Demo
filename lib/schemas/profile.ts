import { z } from "zod";

export const ProfileSchema = z.object({
  name: z.string(),
  goal: z.enum(["lose_weight", "build_muscle", "perform", "longevity"]),
  days_per_week: z.number().int().min(2).max(6),
  experience: z.enum(["beginner", "intermediate", "advanced"]),
  current_weight_lb: z.number(),
  target_weight_lb: z.number(),
  injuries: z.string(),
  friction: z.string(),
});
