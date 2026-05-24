import { MOMENTUM_IP } from "./momentum-ip";
import { Intake } from "../../types";

export function buildPlannerSystemPrompt(): string {
  return `${MOMENTUM_IP}

You are generating a 4-week training plan. Use the generate_plan tool to return structured JSON. Every session must have 3–5 exercises. Phases must follow Build → Build → Sharpen → Peak order. Nutrition targets should be realistic for the user's goal and weight. Habit focuses should reference Momentum methodology touchstones.`;
}

export const GENERATE_PLAN_TOOL = {
  name: "generate_plan",
  description: "Generate a 4-week training, nutrition, and habit plan for the user based on their intake.",
  input_schema: {
    type: "object",
    properties: {
      generated_for: { type: "string" },
      weeks: {
        type: "array",
        minItems: 4,
        maxItems: 4,
        items: {
          type: "object",
          properties: {
            week_number: { type: "integer" },
            phase: { type: "string", enum: ["Build", "Sharpen", "Peak", "Rest"] },
            theme: { type: "string" },
            sessions: {
              type: "array",
              items: {
                type: "object",
                properties: {
                  day: { type: "string", enum: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"] },
                  focus: { type: "string" },
                  exercises: {
                    type: "array",
                    items: {
                      type: "object",
                      properties: {
                        name: { type: "string" },
                        sets: { type: "integer" },
                        reps: { type: "string" },
                        load: { type: "string" },
                        note: { type: "string" },
                      },
                      required: ["name", "sets", "reps", "load"],
                    },
                  },
                },
                required: ["day", "focus", "exercises"],
              },
            },
            nutrition: {
              type: "object",
              properties: {
                calories: { type: "number" },
                protein_g: { type: "number" },
                carbs_g: { type: "number" },
                fat_g: { type: "number" },
              },
              required: ["calories", "protein_g", "carbs_g", "fat_g"],
            },
            habit_focus: { type: "string" },
          },
          required: ["week_number", "phase", "theme", "sessions", "nutrition", "habit_focus"],
        },
      },
    },
    required: ["generated_for", "weeks"],
  },
};

export function buildPlannerUserMessage(intake: Intake): string {
  return `Generate a 4-week plan for this user:
Name: ${intake.name}
Goal: ${intake.goal.replace("_", " ")}
Experience: ${intake.experience}
Days available: ${intake.days_per_week} per week
Current weight: ${intake.current_weight_lb} lb, target: ${intake.target_weight_lb} lb
Injuries: ${intake.injuries || "none"}
Biggest friction: ${intake.friction || "not specified"}`;
}
