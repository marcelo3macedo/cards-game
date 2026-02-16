import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";

interface BattleEventState {
  selectedCard: any;
  selectedFieldIndex: number;
  selectedAttackerIndex: number;
  selectedTargetIndex: number;
  selectedOrigin: string;
  viewCard: any;
  battleData: any;
  isSelectingTarget: boolean;
  setSelectedCard: (selectedCard: any) => void;
  setSelectedOrigin: (selectedOrigin: any) => void;
  setSelectedFieldIndex: (selectedFieldIndex: number) => void;
  setSelectedAttackerIndex: (selectedAttackerIndex: number) => void;
  setSelectedTargetIndex: (selectedAttackerIndex: number) => void;
  setViewCard: (viewCard: any) => void;
  clearViewCard: () => void;
  setBattleData: (battleData: any) => void;
  clearBattleData: () => void;
  setIsSelectingTarget: (isSelectingTarget: boolean) => void;
}

export const useBattleEventStore = create<BattleEventState>()(
  persist(
    (set) => ({
      selectedCard: null,
      selectedFieldIndex: 0,
      selectedAttackerIndex: 0,
      selectedTargetIndex: 0,
      selectedOrigin: "",
      viewCard: null,
      battleData: null,
      isSelectingTarget: false,

      setSelectedCard: (selectedCard) => set({ selectedCard }),
      setSelectedOrigin: (selectedOrigin) => set({ selectedOrigin }),
      setSelectedFieldIndex: (selectedFieldIndex) => set({ selectedFieldIndex }),
      setSelectedAttackerIndex: (selectedAttackerIndex) => set({ selectedAttackerIndex }),
      setSelectedTargetIndex: (selectedTargetIndex) => set({ selectedTargetIndex }),
      setViewCard: (viewCard) => set({ viewCard }),
      clearViewCard: () => set({ viewCard: null }),
      setBattleData: (battleData) => set({ battleData }),
      clearBattleData: () => set({ battleData: null }),
      setIsSelectingTarget: (isSelectingTarget) => set({ isSelectingTarget }),
    }),
    {
      name: "battle-event-storage",
      storage: createJSONStorage(() => localStorage),
    }
  )
);
