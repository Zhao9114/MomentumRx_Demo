import { create } from "zustand";
import { Intake } from "../types";

type PartialIntake = Partial<Intake>;

interface ProfileStore {
  intake: PartialIntake;
  setField: <K extends keyof Intake>(key: K, value: Intake[K]) => void;
  reset: () => void;
}

export const useProfile = create<ProfileStore>((set) => ({
  intake: {},
  setField: (key, value) =>
    set((s) => ({ intake: { ...s.intake, [key]: value } })),
  reset: () => set({ intake: {} }),
}));
