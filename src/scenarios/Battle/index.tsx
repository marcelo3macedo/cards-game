import { useState } from 'react';
import { PlayerHand } from '../../components/game/Hand';
import { MonsterCard } from '../../core/domain/Card';
import { GameBoard } from '../../components/game/Board';
import { Card } from '../../components/game/Card'; // Importe seu componente de Card
import exemplo_legendaria from '@/assets/images/exemplo_legendaria.jpg';
import { SummonOverlay } from '../../components/game/SummorOverlay';

export interface FieldSlot {
  card: MonsterCard | null;
  mode: 'atk' | 'def' | 'face-down';
}

export default function BattleScenario() {
  const [selectedCard, setSelectedCard] = useState<MonsterCard | null>(null);
  
  const [hand, setHand] = useState<MonsterCard[]>([
    new MonsterCard('1', 'Patrulheiro Gárgula de Gelo', 'Emmissão de sombras geladas...', exemplo_legendaria, 'ice', 2500, 2100, 7, 'LEGENDARIO'),
    new MonsterCard('2', 'Patrulheiro Gárgula de Gelo', 'Emmissão de sombras geladas...', exemplo_legendaria, 'ice', 2500, 2100, 7, 'LEGENDARIO'),
    new MonsterCard('3', 'Patrulheiro Gárgula de Gelo', 'Emmissão de sombras geladas...', exemplo_legendaria, 'ice', 2500, 2100, 7, 'LEGENDARIO'),
  ]);

  const [monsterZones, setMonsterZones] = useState<FieldSlot[]>(
    Array(5).fill(null).map(() => ({ card: null, mode: 'atk' }))
  );

  const handleSummon = (mode: string) => {
    if (!selectedCard) return;

    const emptySlotIndex = monsterZones.findIndex(slot => slot.card === null);

    if (emptySlotIndex !== -1) {
      const updatedZones = [...monsterZones];
      
      updatedZones[emptySlotIndex] = {
        card: selectedCard,
        mode: mode.includes('def') ? 'def' : 'atk',
      };

      setMonsterZones(updatedZones);
      setHand(prevHand => prevHand.filter(c => c.id !== selectedCard.id));
      setSelectedCard(null);
    }
  };

  return (
    <div className="h-screen w-screen bg-zinc-950 flex flex-col items-center justify-center overflow-hidden text-white font-sans select-none relative bg-[radial-gradient(circle_at_center,_#1a1a2e_0%,#09090b_100%)]">
      <div className="absolute inset-0 opacity-20 pointer-events-none bg-[url('/grid-pattern.svg')] bg-center [mask-image:radial-gradient(white,transparent)]"></div>

      <GameBoard 
        monsterZones={monsterZones} 
        isBlur={!!selectedCard} 
      />
      <PlayerHand 
        cards={hand} 
        onSelect={(card) => setSelectedCard(card as MonsterCard)} 
        isHidden={!!selectedCard}
      />
      {selectedCard && (
        <SummonOverlay 
          card={selectedCard}
          onSummon={handleSummon}
          onCancel={() => setSelectedCard(null)}
        />
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