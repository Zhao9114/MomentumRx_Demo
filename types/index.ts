import { z } from "zod";
import { ProfileSchema } from "../lib/schemas/profile";
import { IntakeSchema } from "../lib/schemas/intake";
import { PlanSchema, WeekSchema, SessionSchema, ExerciseSchema } from "../lib/schemas/plan";

export type Profile = z.infer<typeof ProfileSchema>;
export type Intake = z.infer<typeof IntakeSchema>;
export type Plan = z.infer<typeof PlanSchema>;
export type Week = z.infer<typeof WeekSchema>;
export type Session = z.infer<typeof SessionSchema>;
export type Exercise = z.infer<typeof ExerciseSchema>;
