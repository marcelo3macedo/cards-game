import { authService } from "./authService";

export interface BattleState {
  battleId: string;
  player: {
    hp: number;
    hand: any[];
    deckCount: number;
    field: any;
  };
  opponent: {
    hp: number;
    handCount: number;
    deckCount: number;
    name: string;
    field: any;
  };
  turn: number;
}

export interface ActivationResponse {
  status: "WAITING_SELECTION" | "SUCCESS";
  newState?: BattleState;
  targetRequired?: any;
  message?: string;
}

export interface EndTurnResponse {
  message: string;
  logs: string[];
  actions: any[];
  state: BattleState;
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

  summonCard: async (handIndex: number, position: string): Promise<BattleState> => {
    const API_URL = import.meta.env.VITE_API_URL;
    const token = authService.getSessionToken();

    const response = await fetch(`${API_URL}/battle-engine/summon`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "authorization": `${token}`,
      },
      body: JSON.stringify({ handIndex, position }),
    });

    if (!response.ok) {
      if (response.status === 401) authService.logout();

      const errorData = await response.json();
      throw new Error(errorData.error || "Erro ao realizar a invocação");
    }

    return await response.json();
  },

  onDraw: async (): Promise<BattleState> => {
    const API_URL = import.meta.env.VITE_API_URL;
    const token = authService.getSessionToken();

    const response = await fetch(`${API_URL}/battle-engine/draw`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "authorization": `${token}`,
      }
    });

    if (!response.ok) {
      if (response.status === 401) authService.logout();

      const errorData = await response.json();
      throw new Error(errorData.error || "Erro ao realizar a invocação");
    }

    return await response.json();
  },

  attack: async (attackerIdx: number, targetIdx: number): Promise<any> => {
    const API_URL = import.meta.env.VITE_API_URL;
    const token = authService.getSessionToken();

    const response = await fetch(`${API_URL}/battle-engine/attack`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "authorization": `${token}`,
      },
      body: JSON.stringify({ attackerIdx, targetIdx }),
    });

    if (!response.ok) {
      if (response.status === 401) authService.logout();

      const errorData = await response.json();
      throw new Error(errorData.error || "Erro ao realizar o ataque");
    }

    return await response.json();
  },

  changePosition: async (fieldIndex: number, position: string): Promise<BattleState> => {
    const API_URL = import.meta.env.VITE_API_URL;
    const token = authService.getSessionToken();

    const response = await fetch(`${API_URL}/battle-engine/change-position`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "authorization": `${token}`,
      },
      body: JSON.stringify({ fieldIndex, position }),
    });

    if (!response.ok) {
      if (response.status === 401) authService.logout();

      const errorData = await response.json();
      throw new Error(errorData.error || "Erro ao mudar posição do card");
    }

    return await response.json();
  },

  endTurn: async (): Promise<EndTurnResponse> => {
    const API_URL = import.meta.env.VITE_API_URL;
    const token = authService.getSessionToken();

    const response = await fetch(`${API_URL}/battle-engine/end-turn`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "authorization": `${token}`,
      },
    });

    if (!response.ok) {
      if (response.status === 401) authService.logout();
      const errorData = await response.json();
      throw new Error(errorData.error || "Erro ao finalizar turno");
    }

    return await response.json();
  },

  saveBattleHistory: async (): Promise<any> => {
    const API_URL = import.meta.env.VITE_API_URL;
    const token = authService.getSessionToken();

    const response = await fetch(`${API_URL}/battles`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "authorization": `${token}`,
      }
    });

    if (!response.ok) {
      if (response.status === 401) authService.logout();
      const errorData = await response.json();
      throw new Error(errorData.error || "Erro ao salvar histórico da batalha");
    }

    return await response.json();
  },

  activateCard: async (cardIndex: number, origin: string): Promise<BattleState | ActivationResponse> => {
    const API_URL = import.meta.env.VITE_API_URL;
    const token = authService.getSessionToken();

    const response = await fetch(`${API_URL}/battle-engine/activate-card`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "authorization": `${token}`,
      },
      body: JSON.stringify({ origin, cardIndex }),
    });

    if (!response.ok) {
      if (response.status === 401) authService.logout();

      const errorData = await response.json();
      throw new Error(errorData.error || "Erro ao ativar efeito do card");
    }

    return await response.json();
  },
};
