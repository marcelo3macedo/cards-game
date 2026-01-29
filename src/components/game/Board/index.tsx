import type { GameBoardProps } from '../../../core/domain/GameBoard';
import { FieldZone } from './FieldZone';

// Adicione estas props à sua interface GameBoardProps no arquivo de definição
interface ExtendedGameBoardProps extends GameBoardProps {
  onInitiateAttack: (index: number) => void;
  onSelectTarget: (targetIndex?: number) => void;
  onChangeMode: (index: number) => void;
  isSelectingTarget: boolean;
  opponentZones: any[]; // Substitua pelo tipo correto das zonas do oponente
}

export function GameBoard({ 
  monsterZones, 
  opponentZones, // Adicionado
  isBlur, 
  focusedZoneIndex, 
  isSelecting, 
  isSelectingTarget, // Adicionado
  onZoneSelect, 
  onInitiateAttack, // Adicionado
  onSelectTarget, // Adicionado
  onChangeMode, // Adicionado
  highlightedIndex, 
  onDraw 
}: ExtendedGameBoardProps) {
  
  return (
    <div className={`
      grid grid-cols-[120px_1fr_120px] gap-8 items-center w-full max-w-7xl px-10
      transition-all duration-500 
      ${isBlur ? 'blur-xl scale-95 opacity-40' : 'blur-0 scale-100'}
    `}>
      
      {/* COLUNA ESQUERDA (Extra Deck / Field) */}
      <div className="flex flex-col gap-32 items-center opacity-30">
        <div className="w-24 h-32 border-2 border-zinc-800 bg-zinc-900/50 rounded-lg shadow-inner"></div>
        <div className="w-24 h-32 border-2 border-blue-900/20 bg-zinc-900/50 rounded-lg"></div>
      </div>

      {/* CAMPO CENTRAL */}
      <div className="flex flex-col gap-10">
        
        {/* ZONAS DO OPONENTE */}
        <div 
          className={`flex flex-col gap-3 scale-90 transition-all duration-300 ${isSelectingTarget ? 'ring-4 ring-red-500/20 p-4 rounded-xl bg-red-500/5' : 'opacity-60 grayscale-[0.3]'}`}
          onClick={() => isSelectingTarget && onSelectTarget(undefined)} // Clique na área vazia = Ataque Direto
        >
          {/* Magias/Armadilhas Oponente */}
          <div className="flex justify-center gap-4 opacity-40">
            {Array(5).fill(null).map((_, i) => (
              <div key={i} className="w-24 h-32 border border-red-900/30 bg-zinc-900/40 rounded-lg"></div>
            ))}
          </div>
          
          {/* Monstros Oponente (Alvos de Ataque) */}
          <div className="flex justify-center gap-4">
            {opponentZones.map((zone, i) => (
              <div 
                key={i}
                onClick={(e) => {
                  if (isSelectingTarget && zone.card) {
                    e.stopPropagation();
                    onSelectTarget(i);
                  }
                }}
                className={`
                  w-24 h-32 border-2 rounded-lg transition-all
                  ${zone.card ? 'border-red-500/40 bg-zinc-900 shadow-lg cursor-pointer hover:scale-110 hover:border-red-500 active:scale-95' : 'border-red-900/20 bg-zinc-900/60'}
                  ${isSelectingTarget && zone.card ? 'animate-pulse border-red-500 shadow-[0_0_15px_rgba(239,68,68,0.4)]' : ''}
                `}
              >
                {zone.card && (
                  <div className={`scale-90 h-full w-full flex items-center justify-center ${zone.mode === 'def' ? 'rotate-90' : ''}`}>
                    {/* Aqui você renderiza a carta do oponente (pode ser um componente Card simplificado) */}
                    <div className="text-[10px] text-red-500 font-bold uppercase tracking-tighter">Opponent</div>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* LINHA DIVISÓRIA (CENTRO) */}
        <div className="w-full h-[2px] bg-gradient-to-r from-transparent via-blue-500/40 to-transparent shadow-[0_0_15px_rgba(59,130,246,0.5)]"></div>

        {/* ZONAS DO JOGADOR */}
        <div className="flex flex-col gap-3">
          <div className="flex justify-center gap-4">
            {monsterZones.map((zone, i) => (
              <FieldZone 
                key={i} 
                index={i}
                card={zone.card} 
                mode={zone.mode}
                isInteractable={isSelecting && !zone.card}
                isSelected={highlightedIndex === i}
                isFocused={isSelecting && focusedZoneIndex === i}
                onClick={() => onZoneSelect(i)}
                onInitiateAttack={onInitiateAttack} // Conectado!
                onChangeMode={onChangeMode} // Conectado!
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

      {/* COLUNA DIREITA (Deck / GY) */}
      <div className="flex flex-col gap-6 items-center">
        {/* ... slots superiores ... */}
        <div className="flex flex-col gap-3 opacity-40 scale-90 mb-12">
          <div className="w-24 h-32 bg-zinc-800 border-2 border-zinc-700 rounded-lg shadow-inner"></div>
          <div className="w-24 h-32 bg-orange-950 border-2 border-orange-900 rounded-lg"></div>
        </div>

        <div className="flex flex-col gap-3">
          {/* Cemitério */}
          <div className="w-24 h-32 bg-zinc-800/40 border-2 border-zinc-700 rounded-lg relative group">
            <div className="absolute inset-0 flex items-center justify-center text-[10px] font-bold text-zinc-600 group-hover:text-zinc-400">GY</div>
          </div>
          
          {/* Deck (Compra de carta) */}
          <div 
            onClick={onDraw}
            className="w-24 h-32 bg-orange-900 border-2 border-orange-700 rounded-lg shadow-[0_6px_0_#431407] hover:translate-y-1 active:shadow-none active:translate-y-1.5 transition-all cursor-pointer flex items-center justify-center overflow-hidden group"
          >
             <div className="w-16 h-20 border border-orange-400/30 rounded flex items-center justify-center opacity-40 group-hover:opacity-100 transition-opacity">
               <span className="text-2xl font-bold text-orange-200">40</span>
             </div>
          </div>
        </div>
      </div>
    </div>
  );
}