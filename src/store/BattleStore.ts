import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";

interface PlayerData {
  id: number;
  name: string;
  hp: number;
  deckCount: number;
  hand?: any;
  handCount?: number;
  graveyard: any[];
  field: any[];
}

interface BattleStoreState {
  player: PlayerData | null;
  opponent: PlayerData | null;
  turn: number;
  currentTurnOwner: "player" | "opponent";
  initBattle: (state: any) => void;
  setBattle: (state: any) => void;
  updateHP: (playerHP: number, opponentHP: number) => void;
  clearBattle: () => void;
}

export const useBattleStore = create<BattleStoreState>()(
  persist(
    (set) => ({
      player: null,
      opponent: null,
      turn: 1,
      currentTurnOwner: "player",

      initBattle: (state) =>
        set({
          player: state.player,
          opponent: state.opponent,
          turn: state.turn,
          currentTurnOwner: state.currentTurnOwner,
        }),

      setBattle: (state) =>
        set({
          player: state.player,
          opponent: state.opponent,
          turn: state.turn,
          currentTurnOwner: state.currentTurnOwner,
        }),

      updateHP: (playerHP, opponentHP) =>
        set((state) => ({
          player: state.player ? { ...state.player, hp: playerHP } : null,
          opponent: state.opponent ? { ...state.opponent, hp: opponentHP } : null,
        })),

      clearBattle: () =>
        set({
          player: null,
          opponent: null,
          turn: 1,
          currentTurnOwner: "player",
        }),
    }),
    {
      name: "battle-storage",
      storage: createJSONStorage(() => localStorage),
    }
  )
);
