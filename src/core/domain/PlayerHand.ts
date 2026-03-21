import type { BaseCard, MonsterCard } from "./Card";

export interface PlayerHandProps {
  cards: BaseCard[];
  onSelect: (card: BaseCard) => void;
  isHidden: boolean;
  canSummon?: boolean;
}

export interface PlayerHandContainerProps {
  onSelectCard: (card: MonsterCard) => void;
}
