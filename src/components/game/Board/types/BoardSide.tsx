import type { BoardSideProps } from "../../../../core/domain/GameBoard";
import { FieldZone } from "../FieldZone";
import { useBoardSideContent } from "../hooks/useBoardSideContent";

export const BoardSide = ({
  isOpponent
}: BoardSideProps) => {
  const { attributes, normalizedField, selectedFieldIndex } = useBoardSideContent({
    isOpponent,
  });

  const monsterRow = (
    <div className="flex justify-center gap-4 mt-8">
      {normalizedField.map((cardData, i) => (
        <FieldZone
          key={`${i}_${cardData?.card?.id}`}
          index={i}
          cardData={cardData}
          isInteractable={attributes.isInteractable}
          isSelected={attributes.isSelected}
          isFocused={attributes.isFocused && selectedFieldIndex === i}
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
