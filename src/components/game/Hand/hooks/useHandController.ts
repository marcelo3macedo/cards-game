import { useEffect } from "react";
import { useHandStore } from "../../../../store/HandStore";
import { useBattleEventStore } from "../../../../store/BattleEventStore";
import { ActionKey, getActionFromKey } from "../../../../utils/keyUtils";

export function useHandController() {
  const { isVisible, isHidden, setVisible, toggleVisible, focusArea, setFocusArea, isFusionMode } = useHandStore();
  const { setSelectedFieldArea, setSelectedFieldIndex } = useBattleEventStore();

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      const action = getActionFromKey(e.key);

      if (action === ActionKey.Up && focusArea === "hand" && !isFusionMode) {
        setFocusArea("board");
        setVisible(false);
        setSelectedFieldArea("MAGIC");
        setSelectedFieldIndex(0);
      }
    };

    const handleMouseMove = (e: MouseEvent) => {
      if (e.clientY > window.innerHeight - 100) {
        setVisible(true);
        setFocusArea("hand");
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    window.addEventListener("mousemove", handleMouseMove);
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      window.removeEventListener("mousemove", handleMouseMove);
    };
  }, [focusArea, isFusionMode, setVisible, setFocusArea, setSelectedFieldArea, setSelectedFieldIndex]);

  return { isVisible, isHidden, setVisible, toggleVisible };
}
