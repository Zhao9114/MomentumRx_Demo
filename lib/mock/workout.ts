import { Session } from "../../types";

export const MOCK_TODAY_WORKOUT: Session = {
  day: "Wed",
  focus: "Lower — Hinge Focus, Build Week 3 / Day 3",
  exercises: [
    { name: "Romanian Deadlift", sets: 4, reps: "8", load: "RPE 7", note: "Pause 2s at the stretch" },
    { name: "Leg Curl (lying)", sets: 3, reps: "10-12", load: "RPE 7" },
    { name: "Goblet Squat", sets: 3, reps: "12", load: "BW+KB", note: "Focus on rib-pelvis stack" },
    { name: "Single-leg Hip Thrust", sets: 3, reps: "10", load: "BW" },
  ],
};
