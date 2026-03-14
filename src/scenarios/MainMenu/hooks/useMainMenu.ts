import { useEffect } from "react";
import { useUserStore } from "../../../store/UserStore";
import { userService } from "../../../services/userService";
import { authService } from "../../../services/authService";
import { useVillainStore } from "../../../store/VillainStore";
import { villainService } from "../../../services/villainService";
import { useNavigationStore } from "../../../store/NavigationStore";

export function useMainMenu() {
  const { user, loading, setUser, setLoading } = useUserStore();
  const { villains, setVillains, setSelectedVillain } = useVillainStore();

  useEffect(() => {
    const loadInitialData = async () => {
      if (user && villains.length > 0) return;

      try {
        setLoading(true);

        const [userData, villainsData] = await Promise.all([
          user ? Promise.resolve(user) : userService.getMe(),
          villains.length > 0 ? Promise.resolve(villains) : villainService.getAll()
        ]);

        if (userData) setUser(userData);
        if (villainsData) setVillains(villainsData);

      } catch (error) {
        console.error("Falha na sincronização do Menu:", error);
      } finally {
        setLoading(false);
      }
    };

    loadInitialData();
  }, []);

  const handleLogout = () => {
    authService.logout();
    useUserStore.getState().clearUser();
    useVillainStore.getState().clearVillains();
    sessionStorage.removeItem("navigation");
    useNavigationStore.getState().navigateTo("WELCOME");
  };

  return {
    user,
    villains,
    loading,
    setSelectedVillain,
    handleLogout
  };
}
