import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";

export interface Chapter {
  id: number;
  name: string;
  description: string | null;
  unlockVillainId: number | null;
  isUnlocked: boolean;
}

export interface Villain {
  id: number;
  name: string;
  profilePictureUrl: string;
  level: number;
  description: string;
  happyQuote: string;
  angerQuote: string;
  chapterId: number | null;
  chapter: Chapter | null;
}

interface VillainState {
  villains: Villain[];
  selectedVillain: Villain | null;
  setVillains: (villains: Villain[]) => void;
  setSelectedVillain: (villain: Villain | null) => void;
  clearVillains: () => void;
}

export const useVillainStore = create<VillainState>()(
  persist(
    (set) => ({
      villains: [],
      selectedVillain: null,
      setVillains: (villains) => set({ villains }),
      setSelectedVillain: (villain) => set({ selectedVillain: villain }),
      clearVillains: () => set({ villains: [], selectedVillain: null }),
    }),
    {
      name: "villains-storage",
      storage: createJSONStorage(() => localStorage),
    }
  )
);
