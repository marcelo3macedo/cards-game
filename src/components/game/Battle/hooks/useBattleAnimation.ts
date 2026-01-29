import { useState, useEffect, useMemo } from 'react';
import type { BattleAnimationOverlayProps } from '../../../../core/domain/BattleAnimation';

export type BattlePhase = 'intro' | 'confront' | 'impact' | 'resolve' | 'damage';

export const useBattleSequence = ({ attacker, defender, onAnimationEnd }: BattleAnimationOverlayProps) => {
  const [phase, setPhase] = useState<BattlePhase>('intro');

  const isDirectAttack = !defender;
  
  const defenderValue = useMemo(() => {
    if (isDirectAttack) return 0;
    return defender.mode === 'def' ? defender.def : defender.atk;
  }, [isDirectAttack, defender]);

  const damageDiff = attacker.atk - defenderValue;

  useEffect(() => {
    const timers = [
      setTimeout(() => setPhase('confront'), 1000),
      setTimeout(() => setPhase('impact'), 2500),
      setTimeout(() => setPhase('resolve'), 3500),
      setTimeout(() => setPhase('damage'), 4200),
      setTimeout(() => {
        const result = isDirectAttack 
          ? 'direct_hit' 
          : damageDiff > 0 ? 'attacker_wins' : damageDiff < 0 ? 'defender_wins' : 'draw';
        onAnimationEnd(result);
      }, 6500)
    ];

    return () => timers.forEach(clearTimeout);
  }, [damageDiff, isDirectAttack, onAnimationEnd]);

  return {
    phase,
    isDirectAttack,
    defenderValue,
    damageDiff,
  };
};