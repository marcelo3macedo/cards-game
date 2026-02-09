import { useEffect } from "react";
import { useHandStore } from "../../../../store/HandStore";
import { ActionKey, getActionFromKey } from "../../../../utils/keyUtils";

export function useHandController() {
  const { isVisible, setVisible, toggleVisible } = useHandStore();

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      const action = getActionFromKey(e.key);

      if (action === ActionKey.Up) setVisible(false);
      if (action === ActionKey.Down) setVisible(true);
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

  return { isVisible, setVisible, toggleVisible };
}
