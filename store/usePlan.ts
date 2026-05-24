import { create } from "zustand";
import { Plan } from "../types";

interface PlanStore {
  plan: Plan | null;
  setPlan: (plan: Plan) => void;
}

export const usePlan = create<PlanStore>((set) => ({
  plan: null,
  setPlan: (plan) => set({ plan }),
}));
