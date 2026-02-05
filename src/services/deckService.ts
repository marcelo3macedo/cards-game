import { authService } from "./authService";

export interface CardData {
  id: number;
  name: string;
  description: string;
  imageUrl: string;
  type: string;
  element: string;
  attribute: "monster" | "spell" | "trap";
  stars: number;
  attackPower: number;
  defensePower: number;
}

export interface DeckEntry {
  id: number;
  cardId: number;
  card: CardData;
}

export interface DeckResponse {
  mainDeck: DeckEntry[];
  library: DeckEntry[];
}

export const deckService = {
  getDeckData: async (): Promise<DeckResponse> => {
    const API_URL = import.meta.env.VITE_API_URL;
    const token = authService.getSessionToken();

    const response = await fetch(`${API_URL}/decks`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "authorization": `${token}`,
      },
    });

    if (!response.ok) {
      if (response.status === 401) authService.logout();
      throw new Error("Erro ao carregar o deck");
    }

    return await response.json();
  },

  updateDeck: async (cardIds: number[]) => {
    const API_URL = import.meta.env.VITE_API_URL;
    const token = authService.getSessionToken();

    const response = await fetch(`${API_URL}/decks`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "authorization": `${token}`,
      },
      body: JSON.stringify({ cardIds }),
    });

    if (!response.ok) throw new Error("Falha ao sincronizar deck com servidor");
    return await response.json();
  }
};
