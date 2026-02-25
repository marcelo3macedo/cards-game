import { useState, useEffect, useMemo } from "react";
import { authService } from "../../../services/authService";
import { userService } from "../../../services/userService";
import { useUserStore } from "../../../store/UserStore";
import { useVillainStore } from "../../../store/VillainStore";

export interface ProfilePicture {
  id: number;
  name: string;
  type: "boy" | "girl";
  imageUrl: string;
}
export function useProfileRegistration(onConfirm: (data: any) => void) {
  const API_URL = import.meta.env.VITE_API_URL;
  const IMAGES_URL = import.meta.env.VITE_IMAGES_URL;
  const [name, setName] = useState("");
  const [gender, setGender] = useState<"boy" | "girl">("boy");
  const [avatars, setAvatars] = useState<ProfilePicture[]>([]);
  const [selectedAvatarId, setSelectedAvatarId] = useState<number | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const { setUser } = useUserStore();
  const { setVillains } = useVillainStore();

  useEffect(() => {
    const fetchAvatars = async () => {
      try {
        const response = await fetch(`${API_URL}/profile-pictures`);
        const data = await response.json();
        setAvatars(data);
      } catch (error) {
        console.error("Erro ao carregar avatares:", error);
      }
    };
    fetchAvatars();
  }, [API_URL]);

  const filteredAvatars = useMemo(() => {
    return avatars.filter((a) => a.type === gender);
  }, [avatars, gender]);

  const registerUser = async () => {
    if (!name || !selectedAvatarId) return;

    setIsLoading(true);
    try {
      const userData = await userService.register(name, selectedAvatarId);

      if (userData.token) {
        authService.saveSession(userData.token);
      }

      setUser(userData);
      setVillains([]);
      onConfirm(userData);
      return userData;
    } catch (error) {
      console.error(error);
      alert("Erro ao salvar perfil!");
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  return {
    name,
    setName,
    gender,
    setGender,
    selectedAvatarId,
    setSelectedAvatarId,
    filteredAvatars,
    registerUser,
    isLoading,
    getFullImageUrl: (path: string) => `${IMAGES_URL}${path}`
  };
}
