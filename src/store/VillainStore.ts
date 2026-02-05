import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";

export interface Villain {
  id: number;
  name: string;
  profilePictureUrl: string;
  level: number;
  description: string;
  happyQuote: string;
  angerQuote: string;
}

interface VillainState {
  villains: Villain[];
  setVillains: (villains: Villain[]) => void;
  clearVillains: () => void;
}

export const useVillainStore = create<VillainState>()(
  persist(
    (set) => ({
      villains: [],
      setVillains: (villains) => set({ villains }),
      clearVillains: () => set({ villains: [] }),
    }),
    {
      name: "villains-storage",
      storage: createJSONStorage(() => localStorage),
    }
  )
);
