interface PlayerData {
  id: number;
  name: string;
  hp: number;
  deckCount: number;
  hand?: any;
  handCount?: number;
  graveyard: any[];
  field: any[];
  spells: any[];
  canSummon: boolean;
}

export interface BattleStoreState {
  player: PlayerData | null;
  opponent: PlayerData | null;
  turn: number;
  currentTurnOwner: "player" | "opponent";
  event: string | null;
  result: any,
  environment: any,
  initBattle: (state: any) => void;
  setBattle: (state: any) => void;
  setEvent: (event: string) => void;
  updateHP: (playerHP: number, opponentHP: number) => void;
  setOpponent: (opponent: PlayerData) => void;
  setPlayer: (player: PlayerData) => void;
  setResult: (result: any) => void;
  clearBattle: () => void;
}

export const BattleEvent = {
  INITIAL: "initial",
  SELECTING_POSITION: "selecting-position",
  SELECTING_EFFECT: "selecting-effect",
  ACTIVATING_EFFECT: "activating-effect",
  ACTIVE_EFFECT: "active-effect",
  SELECTING_TARGET: "selecting-target",
  SELECTING_MODE: "selecting-mode",
  FUSION_SELECTING: "fusion-selecting",
  FUSION_PLACING: "fusion-placing",
} as const;

export type BattleEvent = typeof BattleEvent[keyof typeof BattleEvent];

export interface BoardSideAttributes {
  isInteractable: boolean;
  isSelected: boolean;
  isFocused: boolean;
}
