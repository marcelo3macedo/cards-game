import type { BoardSideProps } from "../../../../core/domain/GameBoard";
import { FieldZone } from "../FieldZone";

export const BoardSide = ({
  zones,
  isOpponent,
  isSelectingTarget,
  onSelectTarget,
  isSelecting,
  highlightedIndex,
  focusedZoneIndex,
  onZoneSelect,
  onInitiateAttack,
  onChangeMode,
}: BoardSideProps) => {
  const monsterRow = (
    <div className="flex justify-center gap-4">
      {zones.map((zone, i) =>
        isOpponent ? (
          <div
            key={i}
            onClick={(e) => {
              if (isSelectingTarget && zone.card) {
                e.stopPropagation();
                onSelectTarget?.(i);
              }
            }}
            className={`w-24 h-32 border-2 rounded-lg transition-all flex items-center justify-center
              ${zone.card ? "border-red-500/40 bg-zinc-900 shadow-lg cursor-pointer hover:scale-110" : "border-red-900/20 bg-zinc-900/60"}
              ${isSelectingTarget && zone.card ? "animate-pulse border-red-500 shadow-[0_0_15px_rgba(239,68,68,0.4)]" : ""}
            `}
          >
            {zone.card && (
              <div className="text-[10px] text-red-500 font-bold uppercase rotate-180">
                Oponente
              </div>
            )}
          </div>
        ) : (
          <FieldZone
            key={i}
            index={i}
            card={zone.card}
            mode={zone.mode}
            isInteractable={isSelecting && !zone.card}
            isSelected={highlightedIndex === i}
            isFocused={isSelecting && focusedZoneIndex === i}
            onClick={() => onZoneSelect?.(i)}
            onInitiateAttack={onInitiateAttack}
            onChangeMode={onChangeMode}
          />
        ),
      )}
    </div>
  );

  const spellRow = (
    <div className={`flex justify-center gap-4 ${isOpponent ? "opacity-40" : ""}`}>
      {Array(5)
        .fill(null)
        .map((_, i) => (
          <div
            key={i}
            className="w-24 h-32 border-2 border-zinc-800/20 bg-zinc-900/40 rounded-lg hover:bg-zinc-800/10 transition-colors"
          />
        ))}
    </div>
  );

  return (
    <div className={`flex flex-col gap-3 ${isOpponent ? "scale-90" : ""}`}>
      {isOpponent ? spellRow : monsterRow}
      {isOpponent ? monsterRow : spellRow}
    </div>
  );
};
