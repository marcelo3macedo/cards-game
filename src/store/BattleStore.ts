import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import type { BattleStoreState } from "../core/domain/BattleStore";

export const useBattleStore = create<BattleStoreState>()(
  persist(
    (set) => ({
      player: null,
      opponent: null,
      turn: 1,
      currentTurnOwner: "player",
      event: null,

      initBattle: (state) =>
        set({
          player: state.player,
          opponent: state.opponent,
          turn: state.turn,
          currentTurnOwner: state.currentTurnOwner,
          event: "initial"
        }),

      setBattle: (state) =>
        set({
          player: state.player,
          opponent: state.opponent,
          turn: state.turn,
          currentTurnOwner: state.currentTurnOwner,
          event: state.state
        }),

      setEvent: (event: string) =>
        set({
          event
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
          event: null
        }),
    }),
    {
      name: "battle-storage",
      storage: createJSONStorage(() => localStorage),
    }
  )
);
