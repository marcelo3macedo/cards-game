import { FieldZone } from './FieldZone';

interface GameBoardProps {
  monsterZones: any[];
  isBlur: boolean;
  focusedZoneIndex: number;
  isSelecting?: boolean; // Novo
  onZoneSelect?: (index: number) => void; // Novo
  highlightedIndex?: number; // Novo
}

export function GameBoard({ monsterZones, isBlur, focusedZoneIndex, isSelecting, onZoneSelect, highlightedIndex }: GameBoardProps) {
  return (
    <div className={`
      grid grid-cols-[120px_1fr_120px] gap-8 items-center w-full max-w-7xl px-10
      transition-all duration-500 
      ${isBlur ? 'blur-xl scale-95 opacity-40' : 'blur-0 scale-100'}
    `}>
      
      <div className="flex flex-col gap-32 items-center opacity-30">
        <div className="w-24 h-32 border-2 border-zinc-800 bg-zinc-900/50 rounded-lg shadow-inner"></div>
        <div className="w-24 h-32 border-2 border-blue-900/20 bg-zinc-900/50 rounded-lg"></div>
      </div>

      <div className="flex flex-col gap-10">
        
        <div className="flex flex-col gap-3 scale-90 opacity-40 grayscale-[0.5]">
          <div className="flex justify-center gap-4">
            {Array(5).fill(null).map((_, i) => (
              <div key={i} className="w-24 h-32 border border-red-900/30 bg-zinc-900/40 rounded-lg"></div>
            ))}
          </div>
          <div className="flex justify-center gap-4">
            {Array(5).fill(null).map((_, i) => (
              <div key={i} className="w-24 h-32 border-2 border-red-900/20 bg-zinc-900/60 rounded-lg"></div>
            ))}
          </div>
        </div>

        <div className="w-full h-[2px] bg-gradient-to-r from-transparent via-blue-500/40 to-transparent shadow-[0_0_15px_rgba(59,130,246,0.5)]"></div>

        <div className="flex flex-col gap-3">
          <div className="flex justify-center gap-4">
            {monsterZones.map((zone, i) => (
              <FieldZone 
                key={i} 
                card={zone.card} 
                mode={zone.mode}
                isInteractable={isSelecting && !zone.card}
                isSelected={highlightedIndex === i}
                isFocused={isSelecting && focusedZoneIndex === i} // Passa o foco do teclado
                onClick={() => onZoneSelect(i)}
              />
            ))}
          </div>
          
          <div className="flex justify-center gap-4">
            {Array(5).fill(null).map((_, i) => (
              <div key={i} className="w-24 h-32 border-2 border-blue-900/10 bg-zinc-900/40 rounded-lg hover:bg-blue-900/5 transition-colors cursor-pointer"></div>
            ))}
          </div>
        </div>
      </div>

      <div className="flex flex-col gap-6 items-center">
        <div className="flex flex-col gap-3 opacity-40 scale-90 mb-12">
          <div className="w-24 h-32 bg-zinc-800 border-2 border-zinc-700 rounded-lg shadow-inner"></div>
          <div className="w-24 h-32 bg-orange-950 border-2 border-orange-900 rounded-lg"></div>
        </div>

        <div className="flex flex-col gap-3">
          <div className="w-24 h-32 bg-zinc-800/40 border-2 border-zinc-700 rounded-lg relative group">
            <div className="absolute inset-0 flex items-center justify-center text-[10px] font-bold text-zinc-600 group-hover:text-zinc-400">GY</div>
          </div>
          <div className="w-24 h-32 bg-orange-900 border-2 border-orange-700 rounded-lg shadow-[0_6px_0_#431407] hover:translate-y-1 transition-all cursor-pointer flex items-center justify-center overflow-hidden">
             <div className="w-16 h-20 border border-orange-400/20 rounded flex items-center justify-center opacity-20">
               <span className="text-2xl font-bold">?</span>
             </div>
          </div>
        </div>
      </div>

    </div>
  );
}