import { z } from "zod";

export const ExerciseSchema = z.object({
  name: z.string(),
  sets: z.number().int(),
  reps: z.string(),
  load: z.string(),
  note: z.string().optional(),
});

export const SessionSchema = z.object({
  day: z.enum(["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"]),
  focus: z.string(),
  exercises: z.array(ExerciseSchema),
});

export const WeekSchema = z.object({
  week_number: z.number().int(),
  phase: z.enum(["Build", "Sharpen", "Peak", "Rest"]),
  theme: z.string(),
  sessions: z.array(SessionSchema),
  nutrition: z.object({
    calories: z.number(),
    protein_g: z.number(),
    carbs_g: z.number(),
    fat_g: z.number(),
  }),
  habit_focus: z.string(),
});

export const PlanSchema = z.object({
  generated_for: z.string(),
  weeks: z.array(WeekSchema).length(4),
});
