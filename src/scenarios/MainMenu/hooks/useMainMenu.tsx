import { useEffect } from "react";
import { useUserStore } from "../../../store/UserStore";
import { userService } from "../../../services/userService";
import { authService } from "../../../services/authService";

export function useMainMenu() {
  const { user, loading, setUser, setLoading } = useUserStore();

  useEffect(() => {
    const loadUser = async () => {
      if (user) return;

      try {
        setLoading(true);
        const data = await userService.getMe();
        setUser(data);
      } catch (error) {
        console.error("Erro ao carregar usuário:", error);
      } finally {
        setLoading(false);
      }
    };

    loadUser();
  }, [user, setUser, setLoading]);

  const handleLogout = () => {
    authService.logout();
    useUserStore.getState().clearUser();
    window.location.href = "/login";
  };

  return {
    user,
    loading,
    handleLogout
  };
}
