import { useEffect } from "react";
import { useHandStore } from "../../../../store/HandStore";

export function useHandController() {
  const { isVisible, setVisible, toggleVisible } = useHandStore();

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "ArrowUp") setVisible(false);
      if (e.key === "ArrowDown") setVisible(true);
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
