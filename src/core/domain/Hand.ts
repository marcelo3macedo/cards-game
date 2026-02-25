import type { BaseCard } from "./Card";

export interface UseHandNavigationProps {
  cards: BaseCard[];
  isHidden: boolean;
  onSelect: any;
}
