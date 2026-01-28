import { useEffect, useState } from 'react';
import { PlayerHand } from '../../components/game/Hand';
import { MonsterCard } from '../../core/domain/Card';
import { GameBoard } from '../../components/game/Board';
import exemplo_legendaria from '@/assets/images/exemplo_legendaria.jpg';
import { SummonOverlay } from '../../components/game/SummorOverlay';

export interface FieldSlot {
  card: MonsterCard | null;
  mode: 'atk' | 'def' | 'face-down';
}

export default function BattleScenario() {
  const [selectedCard, setSelectedCard] = useState<MonsterCard | null>(null);
  const [isSelectingZone, setIsSelectingZone] = useState(false);
  const [focusedZoneIndex, setFocusedZoneIndex] = useState(0);
  const [pendingSummon, setPendingSummon] = useState<{index: number, mode?: string} | null>(null);
  const [monsterZones, setMonsterZones] = useState<FieldSlot[]>(
    Array(5).fill(null).map(() => ({ card: null, mode: 'atk' }))
  );

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setSelectedCard(null);
        setIsSelectingZone(false);
        setPendingSummon(null);
      }

      if (isSelectingZone && !pendingSummon) {
        switch (e.key) {
          case 'ArrowLeft':
            setFocusedZoneIndex((prev) => (prev > 0 ? prev - 1 : monsterZones.length - 1));
            break;
          case 'ArrowRight':
            setFocusedZoneIndex((prev) => (prev < monsterZones.length - 1 ? prev + 1 : 0));
            break;
          case 'Enter':
            handleZoneClick(focusedZoneIndex);
            break;
        }
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isSelectingZone, pendingSummon, monsterZones, focusedZoneIndex]);
  
  const [hand, setHand] = useState<MonsterCard[]>([
    new MonsterCard('1', 'Patrulheiro Gárgula de Gelo', 'Emmissão de sombras geladas...', exemplo_legendaria, 'ice', 2500, 2100, 7, 'LEGENDARIO'),
    new MonsterCard('2', 'Patrulheiro Gárgula de Gelo', 'Emmissão de sombras geladas...', exemplo_legendaria, 'ice', 2500, 2100, 7, 'LEGENDARIO'),
    new MonsterCard('3', 'Patrulheiro Gárgula de Gelo', 'Emmissão de sombras geladas...', exemplo_legendaria, 'ice', 2500, 2100, 7, 'LEGENDARIO'),
  ]);


  const handleHandSelect = (card: MonsterCard) => {
    setSelectedCard(card);
    setIsSelectingZone(true); // Ativa o modo de escolha de zona
    setPendingSummon(null);    // Limpa qualquer seleção anterior
  };

  const handleZoneClick = (index: number) => {
    // Só permite clicar se houver uma carta selecionada e a zona estiver vazia
    if (!selectedCard || monsterZones[index].card) return; 
    setPendingSummon({ index }); 
  };

  const executeSummon = (mode: string) => {
    if (!selectedCard || pendingSummon === null) return;

    const updatedZones = [...monsterZones];
    updatedZones[pendingSummon.index] = {
      card: selectedCard,
      mode: mode.includes('def') ? 'def' : 'atk',
    };

    setMonsterZones(updatedZones);
    setHand(prev => prev.filter(c => c.id !== selectedCard.id));
    
    // Reset states
    setSelectedCard(null);
    setIsSelectingZone(false);
    setPendingSummon(null);
  };

  return (
    <div className="h-screen w-screen bg-zinc-950 flex flex-col items-center justify-center overflow-hidden text-white font-sans select-none relative bg-[radial-gradient(circle_at_center,_#1a1a2e_0%,#09090b_100%)]">
      <div className="absolute inset-0 opacity-20 pointer-events-none bg-[url('/grid-pattern.svg')] bg-center [mask-image:radial-gradient(white,transparent)]"></div>

      <div className="absolute right-10 top-20 flex flex-col gap-2 items-end">
        <div className="bg-black/60 border border-red-500/30 p-4 rounded-xl backdrop-blur-md text-right shadow-[0_0_20px_rgba(239,68,68,0.1)]">
          <p className="text-red-400 text-[10px] font-black uppercase tracking-[0.2em]">Opponent LP</p>
          <p className="text-4xl font-black italic text-zinc-100">8000</p>
        </div>
        <div className="flex gap-2">
           <span className="bg-zinc-800/80 px-2 py-1 rounded text-[10px] text-zinc-400 border border-white/5">DECK: 40</span>
           <span className="bg-zinc-800/80 px-2 py-1 rounded text-[10px] text-zinc-400 border border-white/5">HAND: 5</span>
        </div>
      </div>
      
      <GameBoard 
        monsterZones={monsterZones} 
        isBlur={false}
        isSelecting={isSelectingZone}
        onZoneSelect={handleZoneClick}
        highlightedIndex={pendingSummon?.index}
        focusedZoneIndex={focusedZoneIndex}
      />
      <PlayerHand 
        cards={hand} 
        onSelect={(card) => handleHandSelect(card as MonsterCard)} // CHAMADA CORRIGIDA
        isHidden={isSelectingZone} // Esconde a mão se estiver selecionando campo
      />
      {pendingSummon !== null && selectedCard && (
        <SummonOverlay 
          card={selectedCard}
          onSummon={executeSummon}
          onCancel={() => setPendingSummon(null)}
        />
      )}

      {isSelectingZone && !pendingSummon && (
        <div className="absolute bottom-40 left-1/2 -translate-x-1/2 bg-blue-600/90 text-white px-8 py-3 rounded-full animate-pulse shadow-[0_0_20px_rgba(59,130,246,0.5)] z-50 border border-blue-400">
          Escolha um local no campo para invocar ou pressione <span className="font-bold bg-black/30 px-2 py-0.5 rounded">ESC</span>
        </div>
      )}

      <div className="absolute left-10 top-1/2 -translate-y-1/2 flex flex-col gap-4">
        <div className="bg-black/60 border border-blue-500/30 p-4 rounded-xl backdrop-blur-md">
          <p className="text-blue-400 text-xs font-bold uppercase tracking-widest">Player LP</p>
          <p className="text-4xl font-black italic">8000</p>
        </div>
      </div>
    </div>
  );
}