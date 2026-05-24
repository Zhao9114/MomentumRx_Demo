import { z } from "zod";

export const IntakeSchema = z.object({
  name: z.string().min(1),
  goal: z.enum(["lose_weight", "build_muscle", "perform", "longevity"]),
  days_per_week: z.number().int().min(2).max(6),
  experience: z.enum(["beginner", "intermediate", "advanced"]),
  current_weight_lb: z.number().positive(),
  target_weight_lb: z.number().positive(),
  injuries: z.string().default(''),
  friction: z.string().default(''),
});
