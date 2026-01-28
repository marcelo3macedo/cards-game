import React, { useState, useEffect } from 'react';
import { Card } from '../Card';
import { MonsterCard } from '../../../core/domain/Card';

interface BattleAnimationOverlayProps {
  attacker: MonsterCard;
  defender: MonsterCard;
  onAnimationEnd: (result: 'attacker_wins' | 'defender_wins' | 'draw') => void;
}

export const BattleAnimationOverlay: React.FC<BattleAnimationOverlayProps> = ({ 
  attacker, 
  defender, 
  onAnimationEnd 
}) => {
  const [phase, setPhase] = useState<'intro' | 'confront' | 'impact' | 'resolve' | 'damage'>('intro');

  const defenderTargetValue = defender.mode === 'def' ? defender.def : defender.atk;
  const damageDiff = attacker.atk - defenderTargetValue;

  useEffect(() => {
    const confrontT = setTimeout(() => setPhase('confront'), 1000);
    const impactT = setTimeout(() => setPhase('impact'), 2500);
    const resolveT = setTimeout(() => setPhase('resolve'), 3500);
    const damageT = setTimeout(() => setPhase('damage'), 4200);
    
    const endT = setTimeout(() => {
      const result = damageDiff > 0 ? 'attacker_wins' : damageDiff < 0 ? 'defender_wins' : 'draw';
      onAnimationEnd(result);
    }, 6500);

    return () => [confrontT, impactT, resolveT, damageT, endT].forEach(clearTimeout);
  }, [damageDiff, onAnimationEnd]);

  const renderDamage = (isAttackerSide: boolean) => {
    const showHere = isAttackerSide ? damageDiff < 0 : damageDiff > 0;
    if (!showHere || phase !== 'damage') return null;

    return (
      <div className="absolute inset-0 flex items-center justify-center z-[250] animate-damage-slow pointer-events-none">
        <span className="text-8xl font-black italic text-white drop-shadow-[0_0_30px_rgba(255,0,0,1)]">
          -{Math.abs(damageDiff)}
        </span>
      </div>
    );
  };

  return (
    <div className="fixed inset-0 z-[200] flex items-center justify-center bg-black/95 backdrop-blur-xl overflow-hidden font-sans">
      <div className={`absolute inset-0 bg-white z-[300] pointer-events-none transition-opacity duration-300 ${phase === 'impact' ? 'opacity-40' : 'opacity-0'}`} />

      <div className="flex items-center gap-24 relative scale-110">
        
        <div className="relative">
          <div className={`
            transition-all duration-1000 ease-out transform
            ${phase === 'intro' ? '-translate-x-full opacity-0' : 'translate-x-0 opacity-100'}
            ${phase === 'confront' ? 'translate-x-12 scale-105 z-40' : ''}
            ${phase === 'impact' ? 'translate-x-20 scale-110 z-50' : ''}
            ${phase === 'resolve' && damageDiff < 0 ? 'scale-0 opacity-0 blur-2xl' : ''}
            ${phase === 'damage' && damageDiff < 0 ? 'hidden' : ''} 
          `}>
            <div className="absolute -top-10 left-1/2 -translate-x-1/2 text-red-500 font-black italic tracking-widest text-xl opacity-50">ATTACKER</div>
            <Card card={attacker} size="lg" />
            <div className="mt-8 text-center">
              <span className={`text-5xl font-black italic transition-colors duration-1000 ${damageDiff >= 0 ? 'text-yellow-400 drop-shadow-[0_0_15px_rgba(250,204,21,0.4)]' : 'text-zinc-700'}`}>
                {attacker.atk}
              </span>
            </div>
          </div>
          {renderDamage(true)}
        </div>

        <div className={`text-6xl font-black italic text-zinc-800 transition-all duration-1000 ${phase !== 'intro' ? 'opacity-0 scale-50' : 'opacity-100'}`}>VS</div>

        <div className="relative">
          <div className={`
            transition-all duration-1000 ease-out transform
            ${phase === 'intro' ? 'translate-x-full opacity-0' : 'translate-x-0 opacity-100'}
            ${phase === 'confront' ? '-translate-x-12' : ''}
            ${phase === 'impact' ? 'animate-shake-heavy' : ''}
            ${phase === 'resolve' && damageDiff > 0 ? 'scale-0 opacity-0 blur-2xl' : ''}
            ${phase === 'damage' && damageDiff > 0 ? 'hidden' : ''}
          `}>
            {phase === 'impact' && (
              <div className="absolute inset-0 z-50 flex items-center justify-center overflow-visible">
                <div className="w-[250%] h-4 bg-white shadow-[0_0_40px_#fff,0_0_80px_#3b82f6] rotate-[35deg] animate-slash-slow" />
              </div>
            )}
            
            <div className="absolute -top-10 left-1/2 -translate-x-1/2 text-blue-500 font-black italic tracking-widest text-xl opacity-50">
              {defender.mode === 'def' ? 'DEFENSE' : 'TARGET'}
            </div>
            <Card card={defender} size="lg" />
            <div className="mt-8 text-center">
              <span className={`text-5xl font-black italic transition-colors duration-1000 ${damageDiff <= 0 ? 'text-yellow-400 drop-shadow-[0_0_15px_rgba(250,204,21,0.4)]' : 'text-zinc-700'}`}>
                {defenderTargetValue}
              </span>
            </div>
          </div>
          {renderDamage(false)}
        </div>

      </div>

      <style>{`
        @keyframes damage-slow {
          0% { transform: scale(0.3) translateY(0); opacity: 0; }
          20% { transform: scale(1.1) translateY(-20px); opacity: 1; }
          80% { transform: scale(1) translateY(-60px); opacity: 1; }
          100% { transform: scale(0.9) translateY(-100px); opacity: 0; }
        }
        @keyframes slash-slow {
          0% { transform: translateX(-120%) rotate(35deg); opacity: 0; }
          30% { opacity: 1; }
          70% { opacity: 1; }
          100% { transform: translateX(120%) rotate(35deg); opacity: 0; }
        }
        @keyframes shake-heavy {
          0%, 100% { transform: translate(0, 0); }
          10% { transform: translate(-12px, 8px); }
          30% { transform: translate(12px, -8px); }
          50% { transform: translate(-12px, -8px); }
          70% { transform: translate(12px, 8px); }
        }
        .animate-damage-slow { animation: damage-slow 2.5s cubic-bezier(0.19, 1, 0.22, 1) forwards; }
        .animate-slash-slow { animation: slash-slow 0.8s ease-in-out forwards; }
        .animate-shake-heavy { animation: shake-heavy 0.1s infinite; }
      `}</style>
    </div>
  );
};