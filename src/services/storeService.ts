import { authService } from "./authService";

export interface StorePackageItem {
  id: number;
  name: string;
  description: string;
  price: number;
  requiredLevel: number;
  cardCount: number;
  storeId: number;
}

export const storeService = {
  getStorePackages: async (): Promise<StorePackageItem[]> => {
    const API_URL = import.meta.env.VITE_API_URL;
    const response = await fetch(`${API_URL}/store-packages`);
    if (!response.ok) throw new Error("Erro ao carregar pacotes da loja");
    return response.json();
  },

  buyPackage: async (storePackageId: number): Promise<any> => {
    const API_URL = import.meta.env.VITE_API_URL;
    const token = authService.getSessionToken();

    const response = await fetch(`${API_URL}/store-packages/${storePackageId}/buy`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        authorization: `${token}`,
      },
    });

    if (!response.ok) {
      if (response.status === 401) authService.logout();
      const err = await response.json();
      throw new Error(err.error || "Erro ao comprar pacote");
    }

    return response.json();
  },
};
