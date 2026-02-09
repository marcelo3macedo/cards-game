import type { BoardSideProps } from "../../../../core/domain/GameBoard";
import { useBattleStore } from "../../../../store/BattleStore";
import { mapServerCardToEntity } from "../../../../utils/cardUtils";
import { FieldZone } from "../FieldZone";

export const BoardSide = ({
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
  const rawField = useBattleStore((state) =>
    isOpponent ? state.opponent?.field : state.player?.field
  ) || [];

  const normalizedField = Array.from({ length: 5 }, (_, i) => rawField[i] ?? null);

  const monsterRow = (
    <div className="flex justify-center gap-4 mt-8">
      {normalizedField.map((cardData, i) => (
        <FieldZone
          key={`monster-${i}`}
          index={i}
          card={mapServerCardToEntity(cardData?.card || cardData)}
          mode={cardData?.mode || "attack"}
          isInteractable={
            isOpponent
              ? (isSelectingTarget && !!cardData)
              : (isSelecting && !cardData)
          }
          isSelected={!isOpponent && highlightedIndex === i}
          isFocused={!isOpponent && isSelecting && focusedZoneIndex === i}
          onClick={() => {
            if (isOpponent) {
              if (isSelectingTarget && cardData) onSelectTarget?.(i);
            } else {
              onZoneSelect?.(i);
            }
          }}
          onInitiateAttack={isOpponent ? undefined : onInitiateAttack}
          onChangeMode={isOpponent ? undefined : onChangeMode}
          isOpponent={isOpponent}
        />
      ))}
    </div>
  );

  const spellRow = (
    <div className="flex justify-center gap-4">
      {Array(5).fill(null).map((_, i) => (
        <div
          key={`spell-${i}`}
          className="w-24 h-32 border-2 border-zinc-800/10 bg-zinc-900/20 rounded-lg"
        />
      ))}
    </div>
  );

  return (
    <div className={`flex flex-col gap-3 transition-all ${isOpponent ? "rotate-180 scale-95" : ""}`}>
      {monsterRow}
      {spellRow}
    </div>
  );
};
