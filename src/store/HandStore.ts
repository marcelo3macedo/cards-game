import { create } from "zustand";
import { BaseCard, MonsterCard } from "../core/domain/Card";

interface HandState {
  cards: BaseCard[];
  isVisible: boolean;
  setCards: (cards: BaseCard[]) => void;
  addCard: (card: MonsterCard) => void;
  removeCard: (cardId: string) => void;
  setVisible: (visible: boolean) => void;
  toggleVisible: () => void;
}

export const useHandStore = create<HandState>((set) => ({
  cards: [],
  isVisible: true,
  setCards: (cards) => set({ cards }),
  addCard: (card) => set((state) => ({ cards: [...state.cards, card] })),
  removeCard: (cardId) => set((state) => ({ cards: state.cards.filter((c) => c.id !== cardId) })),
  setVisible: (visible) => set({ isVisible: visible }),
  toggleVisible: () => set((state) => ({ isVisible: !state.isVisible })),
}));
