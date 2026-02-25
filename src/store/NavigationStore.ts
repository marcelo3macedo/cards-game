import { create } from "zustand";
import type { ScenarioType } from "../hooks/useNavigation";

export const useNavigationStore = create<{
  currentScenario: ScenarioType;
  navigateTo: (s: ScenarioType) => void;
}>((set) => ({
  currentScenario: "WELCOME",
  navigateTo: (scenario) => set({ currentScenario: scenario }),
}));
