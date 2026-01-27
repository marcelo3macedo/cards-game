import type { FieldZoneProps } from "../../../core/domain/FieldZone";
import { Card } from "../Card";

export function FieldZone({ card, mode, isInteractable, isSelected, isFocused, onClick }: FieldZoneProps) {
  return (
    <div 
      onClick={isInteractable ? onClick : undefined}
      className={`
        w-24 h-32 border-2 rounded-lg flex items-center justify-center relative transition-all duration-300
        ${card ? 'border-solid' : 'border-dashed'}
        
        /* Estilos de Interatividade */
        ${!card && isInteractable ? 'cursor-pointer border-blue-400/50 bg-blue-900/20' : 'border-blue-500/20 bg-zinc-900/80'}
        
        /* Foco do Teclado (Destaque Azul) */
        ${isFocused && !isSelected ? 'ring-4 ring-blue-400 border-blue-300 scale-105 shadow-[0_0_15px_rgba(59,130,246,0.5)]' : ''}
        
        /* Selecionado (Destaque Amarelo) */
        ${isSelected ? 'border-yellow-400 border-4 shadow-[0_0_20px_rgba(250,204,21,0.4)] scale-105 z-10' : ''}
      `}
    >
      {!card && isInteractable && (
        <div className={`absolute inset-0 bg-blue-400/10 ${isFocused ? 'animate-pulse' : ''} rounded-lg`} />
      )}

      {card && (
        <div className={`transition-transform duration-500 ${mode === 'def' ? 'rotate-90 scale-75' : 'scale-90'}`}>
          <Card card={card} size="xs" />
        </div>
      )}
    </div>
  );
}