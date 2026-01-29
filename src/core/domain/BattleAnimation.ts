import type { MonsterCard } from "./Card";

export interface BattleAnimationOverlayProps {
  attacker: MonsterCard;
  defender: MonsterCard | null;
  onAnimationEnd: (result: 'attacker_wins' | 'defender_wins' | 'draw' | 'direct_hit') => void;
}