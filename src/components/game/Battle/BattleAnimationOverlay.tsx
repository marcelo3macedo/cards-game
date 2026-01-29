import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Card } from '../Card';
import type { BattleAnimationOverlayProps } from '../../../core/domain/BattleAnimation';
import { useBattleSequence } from './hooks/useBattleAnimation';

export const BattleAnimationOverlay: React.FC<BattleAnimationOverlayProps> = ({ 
  attacker, 
  defender, 
  onAnimationEnd 
}) => {
  const { phase, isDirectAttack, defenderValue, damageDiff } = useBattleSequence({
    attacker, defender, onAnimationEnd
  });

  const renderDamagePopup = (isAttackerSide: boolean) => {
    const showHere = isAttackerSide ? damageDiff < 0 : damageDiff > 0;
    if (!showHere || phase !== 'damage') return null;

    return (
      <motion.div 
        initial={{ opacity: 0, scale: 0.5, y: 0 }}
        animate={{ opacity: 1, scale: 1.2, y: -100 }}
        className="absolute inset-0 flex items-center justify-center z-[250] pointer-events-none"
      >
        <span className="text-8xl font-black italic text-white drop-shadow-[0_0_30px_rgba(255,0,0,1)]">
          -{Math.abs(damageDiff)}
        </span>
      </motion.div>
    );
  };

  return (
    <div className="fixed inset-0 z-[200] flex items-center justify-center bg-black/95 backdrop-blur-xl overflow-hidden font-sans">
      <AnimatePresence>
        {phase === 'impact' && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.4 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 bg-white z-[300] pointer-events-none" 
          />
        )}
      </AnimatePresence>

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
          {renderDamagePopup(true)}
        </div>
        <div className={`text-6xl font-black italic text-zinc-800 transition-all duration-1000 ${phase !== 'intro' ? 'opacity-0 scale-50' : 'opacity-100'}`}>VS</div>


        <div className="relative">
          <div className={`
            transition-all duration-1000 ease-out transform
            ${phase === 'intro' ? 'translate-x-full opacity-0' : 'translate-x-0 opacity-100'}
            ${phase === 'confront' ? '-translate-x-12' : ''}
            ${phase === 'impact' ? 'animate-shake-heavy' : ''}
            ${phase === 'resolve' && !isDirectAttack && damageDiff > 0 ? 'scale-0 opacity-0 blur-2xl' : ''}
            ${phase === 'damage' && !isDirectAttack && damageDiff > 0 ? 'hidden' : ''}
          `}>
            
            {phase === 'impact' && (
              <div className="absolute inset-0 z-50 flex items-center justify-center overflow-visible">
                <div className={`w-[250%] h-6 rotate-[35deg] animate-slash-slow ${isDirectAttack ? 'bg-yellow-400 shadow-[0_0_50px_#fbbf24]' : 'bg-white shadow-[0_0_40px_#fff]'}`} />
              </div> 
            )}
            
            {isDirectAttack ? (
                <div className="flex flex-col items-center">
                    <div className="absolute -top-10 left-1/2 -translate-x-1/2 w-96 text-center text-orange-500 font-black italic tracking-widest text-xl animate-pulse">DIRECT HIT</div>
                </div>
            ) : (
                <>
                    <div className="absolute -top-10 left-1/2 -translate-x-1/2 text-blue-500 font-black italic tracking-widest text-xl opacity-50">
                        {defender?.mode === 'def' ? 'DEFENSE' : 'TARGET'}
                    </div>
                    <Card card={defender!} size="lg" />
                    <div className="mt-8 text-center">
                        <span className={`text-5xl font-black italic transition-colors duration-1000 ${damageDiff <= 0 ? 'text-yellow-400 drop-shadow-[0_0_15px_rgba(250,204,21,0.4)]' : 'text-zinc-700'}`}>
                            {defenderValue}
                        </span>
                    </div>
                </>
            )}
          </div>
          {renderDamagePopup(false)}
        </div>
      </div>

      <style>{`
        @keyframes slash-slow {
          0% { transform: translateX(-120%) rotate(35deg); opacity: 0; }
          20% { opacity: 1; }
          80% { opacity: 1; }
          100% { transform: translateX(120%) rotate(35deg); opacity: 0; }
        }
        @keyframes shake-heavy {
          0%, 100% { transform: translate(0, 0); }
          20% { transform: translate(-15px, 10px); }
          40% { transform: translate(15px, -10px); }
          60% { transform: translate(-15px, -10px); }
          80% { transform: translate(15px, 10px); }
        }
        .animate-slash-slow { animation: slash-slow 0.7s ease-in-out forwards; }
        .animate-shake-heavy { animation: shake-heavy 0.08s infinite; }
      `}</style>
    </div>
  );
};