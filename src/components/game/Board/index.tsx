import { FieldZone } from './FieldZone';

interface GameBoardProps {
  monsterZones: any;
  isBlur: boolean;
}

export function GameBoard({ monsterZones, isBlur }: GameBoardProps) {
  return (
    <div className={`flex flex-col gap-8 transition-all duration-500 ${isBlur ? 'blur-xl scale-90 opacity-40' : ''}`}>
      {/* Zonas de Monstros do Jogador */}
      <div className="flex gap-4">
        {monsterZones.map((zone, i) => (
          <FieldZone key={i} card={zone.card} mode={zone.mode} />
        ))}
      </div>
      
      {/* Zonas de Magia/Armadilha (Simuladas) */}
      <div className="flex gap-4 opacity-40">
        {Array(5).fill(null).map((_, i) => (
          <div key={i} className="w-20 h-28 border border-blue-900/30 bg-zinc-900/40 rounded"></div>
        ))}
      </div>
    </div>
  );
}