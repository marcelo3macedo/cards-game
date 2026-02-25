import type { BoardSideProps } from "../../../../core/domain/GameBoard";
import { FieldSpellZone } from "../FieldSpellZone";
import { FieldZone } from "../FieldZone";
import { useBoardSideContent } from "../hooks/useBoardSideContent";

export const BoardSide = ({
  isOpponent
}: BoardSideProps) => {
  const { attributes, normalizedField, normalizedFieldSpells, selectedFieldIndex, selectedFieldArea } = useBoardSideContent({
    isOpponent,
  });

  const monsterRow = (
    <div className="flex justify-center gap-4 mt-8">
      {normalizedField.map((cardData, i) => (
        <FieldZone
          key={`monster_${i}_${cardData?.card?.id}`}
          index={i}
          cardData={cardData}
          isInteractable={attributes.isInteractable && selectedFieldArea == "MONSTER"}
          isSelected={attributes.isSelected}
          isFocused={attributes.isFocused && selectedFieldIndex === i && selectedFieldArea == "MONSTER"}
          isOpponent={isOpponent}
          isMonster={true}
        />
      ))}
    </div>
  );

  const spellRow = (
    <div className="flex justify-center gap-4">
      {normalizedFieldSpells.map((cardData, i) => (
        <FieldSpellZone
          key={`magic_${i}_${cardData?.card?.id}`}
          data-test={`magic_${i}_${isOpponent}`}
          index={i}
          cardData={cardData}
          isInteractable={attributes.isInteractable && selectedFieldArea == "MAGIC"}
          isSelected={attributes.isSelected}
          isFocused={attributes.isFocused && selectedFieldIndex === i  && selectedFieldArea == "MAGIC"}
          isOpponent={isOpponent}
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
