import { create } from "zustand";
import { BaseCard, MonsterCard } from "../core/domain/Card";

export interface FusionAnimData {
  materialCards: BaseCard[];
  resultCard: BaseCard | null;
}

interface HandState {
  cards: BaseCard[];
  isVisible: boolean;
  isHidden: boolean;
  focusArea: "hand" | "board";
  isFusionMode: boolean;
  fusionCardIndices: number[];
  fusionMaterialCards: BaseCard[];
  fusionAnimData: FusionAnimData | null;
  pendingBattleState: any | null;
  setCards: (cards: BaseCard[]) => void;
  addCard: (card: MonsterCard) => void;
  removeCard: (cardId: string) => void;
  setVisible: (visible: boolean) => void;
  setIsHidden: (isHidden: boolean) => void;
  toggleVisible: () => void;
  setFocusArea: (area: "hand" | "board") => void;
  setFusionMode: (mode: boolean) => void;
  toggleFusionCard: (index: number) => void;
  clearFusion: () => void;
  setFusionMaterialCards: (cards: BaseCard[]) => void;
  setFusionAnimData: (data: FusionAnimData) => void;
  clearFusionAnimData: () => void;
  setPendingBattleState: (state: any) => void;
  clearPendingBattleState: () => void;
}

export const useHandStore = create<HandState>((set) => ({
  cards: [],
  isVisible: true,
  isHidden: false,
  focusArea: "hand",
  isFusionMode: false,
  fusionCardIndices: [],
  fusionMaterialCards: [],
  fusionAnimData: null,
  pendingBattleState: null,
  setCards: (cards) => set({ cards }),
  addCard: (card) => set((state) => ({ cards: [...state.cards, card] })),
  removeCard: (cardId) => set((state) => ({ cards: state.cards.filter((c) => c.id !== cardId) })),
  setVisible: (visible) => set({ isVisible: visible }),
  setIsHidden: (isHidden) => set({ isHidden }),
  toggleVisible: () => set((state) => ({ isVisible: !state.isVisible })),
  setFocusArea: (focusArea) => set({ focusArea }),
  setFusionMode: (isFusionMode) => set({ isFusionMode }),
  toggleFusionCard: (index) =>
    set((state) => ({
      fusionCardIndices: state.fusionCardIndices.includes(index)
        ? state.fusionCardIndices.filter((i) => i !== index)
        : [...state.fusionCardIndices, index],
    })),
  clearFusion: () => set({ isFusionMode: false, fusionCardIndices: [] }),
  setFusionMaterialCards: (fusionMaterialCards) => set({ fusionMaterialCards }),
  setFusionAnimData: (fusionAnimData) => set({ fusionAnimData }),
  clearFusionAnimData: () => set({ fusionAnimData: null }),
  setPendingBattleState: (pendingBattleState) => set({ pendingBattleState }),
  clearPendingBattleState: () => set({ pendingBattleState: null }),
}));
