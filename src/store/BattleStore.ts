import { create } from 'zustand';

interface PlayerData {
  name: string;
  lp: number;
}

interface BattleState {
  player: PlayerData;
  opponent: PlayerData;
  damagePlayer: (amount: number) => void;
  damageOpponent: (amount: number) => void;
  setPlayerLP: (value: number) => void;
  setOpponentLP: (value: number) => void;
}

export const useBattleStore = create<BattleState>((set) => ({
  player: { name: 'Yugi', lp: 8000 },
  opponent: { name: 'Kaiba', lp: 8000 },

  damagePlayer: (amount) => 
    set((state) => ({ player: { ...state.player, lp: Math.max(0, state.player.lp - amount) } })),
  
  damageOpponent: (amount) => 
    set((state) => ({ opponent: { ...state.opponent, lp: Math.max(0, state.opponent.lp - amount) } })),

  setPlayerLP: (value) => 
    set((state) => ({ player: { ...state.player, lp: value } })),
    
  setOpponentLP: (value) => 
    set((state) => ({ opponent: { ...state.opponent, lp: value } })),
}));