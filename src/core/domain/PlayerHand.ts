import type { BaseCard } from "./Card";

export interface PlayerHandProps {
  cards: BaseCard[];
  onSelect: (card: BaseCard) => void;
  isHidden: boolean;
}