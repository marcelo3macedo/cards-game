import { useState, useEffect, useMemo } from "react";
import { authService } from "../../../services/authService";

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
      const response = await fetch(`${API_URL}/users`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: name,
          profilePictureId: selectedAvatarId,
        }),
      });

      if (!response.ok) throw new Error("Falha ao registrar");

      const userData = await response.json();

      if (userData.token) {
        authService.saveSession(userData.token);
      }

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
