import { authService } from "./authService";

export interface UserProfile {
  id: number;
  name: string;
  level: number;
  points: number;
  active: boolean;
  profile: {
    imageUrl: string;
    type: string;
  };
}

export const userService = {
  getMe: async (): Promise<UserProfile> => {
    const API_URL = import.meta.env.VITE_API_URL;
    const token = authService.getSessionToken();

    const response = await fetch(`${API_URL}/users/me`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "authorization": `${token}`
      },
    });

    if (!response.ok) {
      if (response.status === 401) authService.logout();
      throw new Error("Sessão inválida ou erro no servidor");
    }

    return response.json();
  }
};
