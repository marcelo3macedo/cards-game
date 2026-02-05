import { authService } from "./authService";

export interface BattleState {
  battleId: string;
  player: {
    hp: number;
    hand: any[];
    deckCount: number;
  };
  opponent: {
    hp: number;
    handCount: number;
    deckCount: number;
    name: string;
  };
  turn: number;
}

export const battleService = {
  startBattle: async (userId: number, villainId: number): Promise<BattleState> => {
    const API_URL = import.meta.env.VITE_API_URL;
    const token = authService.getSessionToken();

    const response = await fetch(`${API_URL}/battle-engine/start`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "authorization": `${token}`,
      },
      body: JSON.stringify({ userId, villainId }),
    });

    if (!response.ok) {
      if (response.status === 401) authService.logout();
      const errorData = await response.json();
      throw new Error(errorData.error || "Erro ao iniciar o motor de batalha");
    }

    return await response.json();
  },
};
