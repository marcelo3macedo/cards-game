import { useState, useEffect, useRef } from "react";
import { ActionKey, getActionFromKey } from "../../../utils/keyUtils";

interface UseMatchmakingKeyboardProps {
  loading: boolean;
  onStart: () => void;
  onBack: () => void;
}

export function useMatchmakingKeyboard({ loading, onStart, onBack }: UseMatchmakingKeyboardProps) {
  const [focusedIndex, setFocusedIndex] = useState(0);

  const onStartRef = useRef(onStart);
  onStartRef.current = onStart;
  const onBackRef = useRef(onBack);
  onBackRef.current = onBack;

  useEffect(() => {
    const handle = (e: KeyboardEvent) => {
      const action = getActionFromKey(e.key);
      if (!action) return;

      if (action === ActionKey.Up || action === ActionKey.Down) {
        e.preventDefault();
        setFocusedIndex(prev => (prev === 0 ? 1 : 0));
      } else if (action === ActionKey.Enter && !loading) {
        e.preventDefault();
        if (focusedIndex === 0) onStartRef.current();
        else onBackRef.current();
      } else if (action === ActionKey.Escape) {
        e.preventDefault();
        onBackRef.current();
      }
    };

    window.addEventListener("keydown", handle);
    return () => window.removeEventListener("keydown", handle);
  }, [loading, focusedIndex]);

  return { focusedIndex };
}
