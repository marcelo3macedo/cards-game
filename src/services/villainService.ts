import type { Villain } from "../store/VillainStore";
import { authService } from "./authService";

export const villainService = {
  getAll: async (): Promise<Villain[]> => {
    const API_URL = import.meta.env.VITE_API_URL;
    const token = authService.getSessionToken();

    const response = await fetch(`${API_URL}/villains`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "authorization": `${token}`,
      },
    });

    if (!response.ok) {
      if (response.status === 401) {
        authService.logout();
      }
      throw new Error("Erro ao buscar lista de vilões");
    }

    const data: Villain[] = await response.json();
    return data.sort((a, b) => a.level - b.level);
  },
};
