import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";

interface UIState {
  tutorialSeen: boolean;
  setTutorialSeen: () => void;
}

export const useUIStore = create<UIState>()(
  persist(
    (set) => ({
      tutorialSeen: false,
      setTutorialSeen: () => set({ tutorialSeen: true }),
    }),
    {
      name: "ui-preferences",
      storage: createJSONStorage(() => localStorage),
    }
  )
);
