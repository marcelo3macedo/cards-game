import { create } from "zustand";
import { BaseCard, MonsterCard } from "../core/domain/Card";

interface HandState {
  cards: BaseCard[];
  isVisible: boolean;
  isHidden: boolean;
  focusArea: "hand" | "board";
  setCards: (cards: BaseCard[]) => void;
  addCard: (card: MonsterCard) => void;
  removeCard: (cardId: string) => void;
  setVisible: (visible: boolean) => void;
  setIsHidden: (isHidden: boolean) => void;
  toggleVisible: () => void;
  setFocusArea: (area: "hand" | "board") => void;
}

export const useHandStore = create<HandState>((set) => ({
  cards: [],
  isVisible: true,
  isHidden: false,
  focusArea: "hand",
  setCards: (cards) => set({ cards }),
  addCard: (card) => set((state) => ({ cards: [...state.cards, card] })),
  removeCard: (cardId) => set((state) => ({ cards: state.cards.filter((c) => c.id !== cardId) })),
  setVisible: (visible) => set({ isVisible: visible }),
  setIsHidden: (isHidden) => set({ isHidden }),
  toggleVisible: () => set((state) => ({ isVisible: !state.isVisible })),
  setFocusArea: (focusArea) => set({ focusArea }),
}));
