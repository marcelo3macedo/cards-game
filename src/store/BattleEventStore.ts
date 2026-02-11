import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";

interface BattleEventState {
  selectedCard: any;
  selectedFieldIndex: number;
  viewCard: any;
  battleData: any;
  setSelectedCard: (selectedCard: any) => void;
  setSelectedFieldIndex: (selectedFieldIndex: number) => void;
  setViewCard: (viewCard: any) => void;
  clearViewCard: () => void;
  setBattleData: (battleData: any) => void;
  clearBattleData: () => void;
}

export const useBattleEventStore = create<BattleEventState>()(
  persist(
    (set) => ({
      selectedCard: null,
      selectedFieldIndex: 0,
      viewCard: null,
      battleData: null,

      setSelectedCard: (selectedCard) => set({ selectedCard }),
      setSelectedFieldIndex: (selectedFieldIndex) => set({ selectedFieldIndex }),
      setViewCard: (viewCard) => set({ viewCard }),
      clearViewCard: () => set({ viewCard: null }),
      setBattleData: (battleData) => set({ battleData }),
      clearBattleData: () => set({ battleData: null }),
    }),
    {
      name: "battle-event-storage",
      storage: createJSONStorage(() => localStorage),
    }
  )
);
