import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import type { ScenarioType } from "../hooks/useNavigation";

const VOLATILE_SCENARIOS: ScenarioType[] = ["BATTLE", "BATTLE_RESULT", "REWARDS", "INTRO"];

export const useNavigationStore = create<{
  currentScenario: ScenarioType;
  navigateTo: (s: ScenarioType) => void;
}>()(
  persist(
    (set) => ({
      currentScenario: "WELCOME",
      navigateTo: (scenario) => set({ currentScenario: scenario }),
    }),
    {
      name: "navigation",
      storage: createJSONStorage(() => sessionStorage),
      onRehydrateStorage: () => (state) => {
        if (state && VOLATILE_SCENARIOS.includes(state.currentScenario)) {
          state.currentScenario =
            state.currentScenario === "INTRO" ? "WELCOME" : "MAINMENU";
        }
      },
    }
  )
);
