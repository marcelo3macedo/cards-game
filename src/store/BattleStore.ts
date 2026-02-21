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
      environment: null,
      event: null,
      result: null,

      initBattle: (state) =>
        set({
          player: state.player,
          opponent: state.opponent,
          turn: state.turn,
          currentTurnOwner: state.currentTurnOwner,
          environment: state.environment,
          event: "initial",
          result: null
        }),

      setBattle: (state) =>
        set({
          player: state.player,
          opponent: state.opponent,
          turn: state.turn,
          currentTurnOwner: state.currentTurnOwner,
          event: state.state,
          environment: state.environment
        }),

      setPlayer: (playerData: any) =>
        set({
          player: playerData,
        }),

      setOpponent: (opponentData: any) =>
        set({
          opponent: opponentData,
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
          event: null,
          result: null
        }),

      setResult: (result: any) =>
        set({
          result
        }),
    }),
    {
      name: "battle-storage",
      storage: createJSONStorage(() => localStorage),
    }
  )
);
