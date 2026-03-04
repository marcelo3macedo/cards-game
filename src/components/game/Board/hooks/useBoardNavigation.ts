import { useEffect } from "react";
import { useHandStore } from "../../../../store/HandStore";
import { useBattleEventStore } from "../../../../store/BattleEventStore";
import { useBattleStore } from "../../../../store/BattleStore";
import { ActionKey, getActionFromKey } from "../../../../utils/keyUtils";
import { mapServerCardToEntity } from "../../../../utils/cardUtils";

const FIELD_SIZE = 5;

export function useBoardNavigation({ isOpponent }: { isOpponent: boolean | undefined }) {
  const { focusArea, setFocusArea, setVisible } = useHandStore();
  const { selectedFieldIndex, selectedFieldArea, setSelectedFieldIndex, setSelectedFieldArea, setViewCard, viewCard } =
    useBattleEventStore();
  const { player } = useBattleStore();

  useEffect(() => {
    if (isOpponent) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (focusArea !== "board") return;

      const action = getActionFromKey(e.key);

      switch (action) {
        case ActionKey.Left:
          setSelectedFieldIndex(Math.max(0, selectedFieldIndex - 1));
          break;
        case ActionKey.Right:
          setSelectedFieldIndex(Math.min(FIELD_SIZE - 1, selectedFieldIndex + 1));
          break;
        case ActionKey.Up:
          if (selectedFieldArea === "MAGIC") setSelectedFieldArea("MONSTER");
          break;
        case ActionKey.Down:
          if (selectedFieldArea === "MONSTER") {
            setSelectedFieldArea("MAGIC");
          } else if (selectedFieldArea === "MAGIC") {
            setFocusArea("hand");
            setVisible(true);
          }
          break;
        case ActionKey.Info: {
          if (viewCard) break;
          if (selectedFieldArea === "MONSTER") {
            const raw = player?.field?.[selectedFieldIndex]?.card;
            if (raw) setViewCard(mapServerCardToEntity(raw));
          } else if (selectedFieldArea === "MAGIC") {
            const raw = player?.spells?.[selectedFieldIndex];
            if (raw) setViewCard(mapServerCardToEntity(raw));
          }
          break;
        }
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpponent, focusArea, selectedFieldIndex, selectedFieldArea, viewCard, player]);
}
