import type { MonsterCard } from "./Card";

export interface SummonOverlayProps {
  card: MonsterCard;
  onSummon: (mode: "atk" | "def" | "face-down-atk" | "face-down-def") => void;
  onCancel: () => void;
}

export type Mode = "atk" | "face-down-atk" | "def" | "face-down-def";
