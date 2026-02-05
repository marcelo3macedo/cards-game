import { useState } from 'react';
import { useUserStore } from '../../../store/UserStore';
import { useVillainStore } from '../../../store/VillainStore';
import { battleService } from '../../../services/battleService';

export const useStartBattle = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const user = useUserStore((state) => state.user);
  const selectedVillain = useVillainStore((state) => state.selectedVillain);

  const startBattle = async () => {
    if (!user?.id || !selectedVillain?.id) {
      setError("Usuário ou Vilão não identificados.");
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const initialState = await battleService.startBattle(user.id, selectedVillain.id);
      return initialState;

    } catch (err: any) {
      setError(err.message);
      console.error("Battle Start Error:", err);
    } finally {
      setLoading(false);
    }
  };

  return { startBattle, loading, error };
};
