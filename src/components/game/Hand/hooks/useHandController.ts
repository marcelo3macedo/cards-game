import { useEffect } from "react";
import { useHandStore } from "../../../../store/HandStore";
import { ActionKey, getActionFromKey } from "../../../../utils/keyUtils";

export function useHandController() {
  const { isVisible, isHidden, setVisible, toggleVisible } = useHandStore();

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      const action = getActionFromKey(e.key);

      if (action === ActionKey.Down) setVisible(false);
      if (action === ActionKey.Up) setVisible(true);
    };

    const handleMouseMove = (e: MouseEvent) => {
      if (e.clientY > window.innerHeight - 100) {
        setVisible(true);
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    window.addEventListener("mousemove", handleMouseMove);
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      window.removeEventListener("mousemove", handleMouseMove);
    };
  }, [setVisible]);

  return { isVisible, isHidden, setVisible, toggleVisible };
}
