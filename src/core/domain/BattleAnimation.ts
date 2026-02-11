import type { MonsterCard } from "./Card";

export interface BattleAnimationOverlayProps {
  attacker: MonsterCard;
  defender: MonsterCard | undefined;
  onAnimationEnd: (result: "attacker_wins" | "defender_wins" | "draw" | "direct_hit") => void;
}

export interface DamagePopupProps {
  damage: number;
  isVisible: boolean;
}
