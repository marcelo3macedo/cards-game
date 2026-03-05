import { authService } from "./authService";

export interface UserPackage {
  id: number;
  name: string;
  type: "villain" | "store";
  cards: number[];
  villain?: { id: number; name: string; imageUrl?: string };
  store?: { id: number; name: string };
  createdAt: string;
}

export const packageService = {
  getPackages: async (): Promise<UserPackage[]> => {
    const API_URL = import.meta.env.VITE_API_URL;
    const token = authService.getSessionToken();
    const response = await fetch(`${API_URL}/packages`, {
      headers: { authorization: `${token}` },
    });
    if (!response.ok) {
      if (response.status === 401) authService.logout();
      throw new Error("Erro ao carregar pacotes");
    }
    return response.json();
  },

  openPackage: async (packageId: number): Promise<{ package: any }> => {
    const API_URL = import.meta.env.VITE_API_URL;
    const token = authService.getSessionToken();
    const response = await fetch(`${API_URL}/packages/${packageId}/open`, {
      method: "POST",
      headers: { authorization: `${token}` },
    });
    if (!response.ok) {
      if (response.status === 401) authService.logout();
      const err = await response.json().catch(() => ({}));
      throw new Error((err as any).error || "Erro ao abrir pacote");
    }
    return response.json();
  },
};
