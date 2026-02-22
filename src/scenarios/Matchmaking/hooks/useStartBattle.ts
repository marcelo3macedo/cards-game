import { useState } from 'react';
import { useUserStore } from '../../../store/UserStore';
import { useVillainStore } from '../../../store/VillainStore';
import { battleService } from '../../../services/battleService';
import { useBattleStore } from '../../../store/BattleStore';
import { BattleEvent } from '../../../core/domain/BattleStore';
import { useHandStore } from '../../../store/HandStore';

export const useStartBattle = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const user = useUserStore((state) => state.user);
  const selectedVillain = useVillainStore((state) => state.selectedVillain);
  const initBattle = useBattleStore((state) => state.initBattle);
  const setEvent = useBattleStore((state) => state.setEvent);
  const { setVisible, setIsHidden } = useHandStore();

  const startBattle = async () => {
    if (!user?.id || !selectedVillain?.id) {
      setError("Usuário ou Vilão não identificados.");
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const response = await battleService.startBattle(user.id, selectedVillain.id);
      if (response?.state) {
        initBattle(response?.state);
        setEvent(BattleEvent.INITIAL);
        setVisible(true);
        setIsHidden(false);
      }

      return response?.state;

    } catch (err: any) {
      setError(err.message);
      console.error("Battle Start Error:", err);
    } finally {
      setLoading(false);
    }
  };

  return { startBattle, loading, error };
};
