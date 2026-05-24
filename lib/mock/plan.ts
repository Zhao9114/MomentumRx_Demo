import { Plan } from "../../types";

export const MOCK_PLAN: Plan = {
  generated_for: "Alex",
  weeks: [
    {
      week_number: 1,
      phase: "Build",
      theme: "Tension under load",
      habit_focus: "Auditory Time Log: track one work block per day",
      nutrition: { calories: 2600, protein_g: 185, carbs_g: 290, fat_g: 75 },
      sessions: [
        {
          day: "Mon",
          focus: "Lower — Hinge",
          exercises: [
            { name: "Romanian Deadlift", sets: 4, reps: "8", load: "RPE 7", note: "Pause 2s at the stretch" },
            { name: "Leg Curl (lying)", sets: 3, reps: "10-12", load: "RPE 7" },
            { name: "Goblet Squat", sets: 3, reps: "12", load: "BW+KB", note: "Focus on rib-pelvis stack" },
            { name: "Single-leg Hip Thrust", sets: 3, reps: "10", load: "BW" },
          ],
        },
        {
          day: "Wed",
          focus: "Upper — Push",
          exercises: [
            { name: "Dumbbell Bench Press", sets: 4, reps: "8-10", load: "RPE 7", note: "RPE 7 — leave 3 in the tank" },
            { name: "Incline DB Press", sets: 3, reps: "10", load: "RPE 6" },
            { name: "Cable Lateral Raise", sets: 3, reps: "15", load: "Light" },
            { name: "Tricep Pushdown", sets: 3, reps: "12", load: "RPE 7" },
          ],
        },
        {
          day: "Fri",
          focus: "Upper — Pull",
          exercises: [
            { name: "Seated Cable Row", sets: 4, reps: "8-10", load: "RPE 7" },
            { name: "Lat Pulldown", sets: 3, reps: "10", load: "RPE 7", note: "Full hang at the top" },
            { name: "Face Pull", sets: 3, reps: "15", load: "Light" },
            { name: "Dumbbell Curl", sets: 3, reps: "12", load: "RPE 7" },
          ],
        },
      ],
    },
    {
      week_number: 2,
      phase: "Build",
      theme: "Bracing & breath",
      habit_focus: "Decision Matrix at the 3pm slump",
      nutrition: { calories: 2650, protein_g: 190, carbs_g: 295, fat_g: 75 },
      sessions: [
        {
          day: "Mon",
          focus: "Lower — Squat",
          exercises: [
            { name: "Barbell Back Squat", sets: 4, reps: "6-8", load: "RPE 7", note: "Brace before the unrack" },
            { name: "Bulgarian Split Squat", sets: 3, reps: "10", load: "DB", note: "Pause 1s at the bottom" },
            { name: "Leg Press", sets: 3, reps: "12", load: "RPE 6" },
            { name: "Calf Raise", sets: 4, reps: "15", load: "BW" },
          ],
        },
        {
          day: "Wed",
          focus: "Upper — Push",
          exercises: [
            { name: "Overhead Press", sets: 4, reps: "6-8", load: "RPE 7" },
            { name: "DB Lateral Raise", sets: 4, reps: "12", load: "Light" },
            { name: "Close-grip Bench", sets: 3, reps: "10", load: "RPE 7" },
            { name: "Overhead Tricep Ext", sets: 3, reps: "12", load: "RPE 6" },
          ],
        },
        {
          day: "Fri",
          focus: "Upper — Pull",
          exercises: [
            { name: "Pull-up", sets: 4, reps: "AMRAP", load: "BW", note: "Full dead hang between reps" },
            { name: "Single-arm DB Row", sets: 3, reps: "10", load: "RPE 7" },
            { name: "Rear Delt Fly", sets: 3, reps: "15", load: "Light" },
            { name: "Hammer Curl", sets: 3, reps: "12", load: "RPE 7" },
          ],
        },
      ],
    },
    {
      week_number: 3,
      phase: "Sharpen",
      theme: "Hinge mechanics",
      habit_focus: "Pre-session activation routine — 5 min before every session",
      nutrition: { calories: 2500, protein_g: 195, carbs_g: 265, fat_g: 72 },
      sessions: [
        {
          day: "Mon",
          focus: "Lower — Hinge",
          exercises: [
            { name: "Conventional Deadlift", sets: 4, reps: "5", load: "RPE 8", note: "Reset grip each rep" },
            { name: "Romanian Deadlift", sets: 3, reps: "8", load: "RPE 7" },
            { name: "Leg Curl (seated)", sets: 3, reps: "10", load: "RPE 7" },
            { name: "Glute Bridge", sets: 3, reps: "15", load: "BW" },
          ],
        },
        {
          day: "Wed",
          focus: "Upper — Push + Pull superset",
          exercises: [
            { name: "Bench Press", sets: 4, reps: "5", load: "RPE 8" },
            { name: "Barbell Row", sets: 4, reps: "5", load: "RPE 8", note: "Superset with bench" },
            { name: "DB Lateral Raise", sets: 3, reps: "15", load: "Light" },
            { name: "Face Pull", sets: 3, reps: "15", load: "Light" },
          ],
        },
        {
          day: "Fri",
          focus: "Full Body — Force Field",
          exercises: [
            { name: "Trap Bar Deadlift", sets: 3, reps: "5", load: "RPE 8" },
            { name: "Push-up", sets: 3, reps: "AMRAP", load: "BW" },
            { name: "Inverted Row", sets: 3, reps: "AMRAP", load: "BW" },
            { name: "Farmer Carry", sets: 3, reps: "40m", load: "Heavy DB", note: "Tight ribcage, tall spine" },
          ],
        },
      ],
    },
    {
      week_number: 4,
      phase: "Peak",
      theme: "Peak expression",
      habit_focus: "Reflect: what friction point did you solve this month?",
      nutrition: { calories: 2700, protein_g: 200, carbs_g: 305, fat_g: 78 },
      sessions: [
        {
          day: "Mon",
          focus: "Lower — Max Effort",
          exercises: [
            { name: "Barbell Back Squat", sets: 3, reps: "3", load: "RPE 9", note: "This is your test week" },
            { name: "Romanian Deadlift", sets: 2, reps: "6", load: "RPE 7" },
            { name: "Leg Press", sets: 2, reps: "10", load: "RPE 6" },
          ],
        },
        {
          day: "Wed",
          focus: "Upper — Max Effort",
          exercises: [
            { name: "Bench Press", sets: 3, reps: "3", load: "RPE 9" },
            { name: "Weighted Pull-up", sets: 3, reps: "3", load: "RPE 9" },
            { name: "DB Lateral Raise", sets: 2, reps: "15", load: "Light" },
          ],
        },
        {
          day: "Fri",
          focus: "Full Body — Deload",
          exercises: [
            { name: "Goblet Squat", sets: 2, reps: "10", load: "Light", note: "Move well, not heavy" },
            { name: "Push-up", sets: 2, reps: "10", load: "BW" },
            { name: "Band Pull-apart", sets: 2, reps: "20", load: "Light" },
            { name: "Hip 90/90 Stretch", sets: 2, reps: "60s", load: "BW" },
          ],
        },
      ],
    },
  ],
};
