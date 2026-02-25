import { authService } from "./authService";

export async function startMockBattle(battleState: any) {
    const API_URL = import.meta.env.VITE_API_URL;
    const token = "8km8rkluq2k";
    authService.saveSession(token);

    const response = await fetch(`${API_URL}/battle-engine/mock/start`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "authorization": `${token}`,
        },
        body: JSON.stringify({ battleState }),
    });

    if (!response.ok) {
        throw new Error("Failed to start mock battle");
    }

    return response.json();
}
