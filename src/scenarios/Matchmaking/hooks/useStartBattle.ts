import { useState } from 'react';
import { useUserStore } from '../../../store/UserStore';
import { useVillainStore } from '../../../store/VillainStore';
import { battleService } from '../../../services/battleService';
import { useBattleStore } from '../../../store/BattleStore';
import { BattleEvent } from '../../../core/domain/BattleStore';

export const useStartBattle = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const user = useUserStore((state) => state.user);
  const selectedVillain = useVillainStore((state) => state.selectedVillain);
  const initBattle = useBattleStore((state) => state.initBattle);
  const setEvent = useBattleStore((state) => state.setEvent);

  const startBattle = async () => {
    if (!user?.id || !selectedVillain?.id) {
      setError("Usuário ou Vilão não identificados.");
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const initialState = await battleService.startBattle(user.id, selectedVillain.id);
      if (initialState) {
        initBattle(initialState);
        setEvent(BattleEvent.INITIAL);
      }

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
