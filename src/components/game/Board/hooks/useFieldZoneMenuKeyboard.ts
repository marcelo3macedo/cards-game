import { useState, useEffect, useRef } from "react";
import { ActionKey, getActionFromKey } from "../../../../utils/keyUtils";

export type MenuAction = "attack" | "invoke" | "change-mode" | "view";

interface UseFieldZoneMenuKeyboardProps {
  actions: MenuAction[];
  onConfirm: (action: MenuAction) => void;
  onClose: () => void;
}

export function useFieldZoneMenuKeyboard({ actions, onConfirm, onClose }: UseFieldZoneMenuKeyboardProps) {
  const [focusedIndex, setFocusedIndex] = useState(0);

  // Reset to first action whenever the visible actions change
  useEffect(() => {
    setFocusedIndex(0);
  }, [actions.length]);

  const onConfirmRef = useRef(onConfirm);
  onConfirmRef.current = onConfirm;
  const onCloseRef = useRef(onClose);
  onCloseRef.current = onClose;

  useEffect(() => {
    if (actions.length === 0) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      const action = getActionFromKey(e.key);
      switch (action) {
        case ActionKey.Left:
          e.stopImmediatePropagation();
          setFocusedIndex((prev) => Math.max(0, prev - 1));
          break;
        case ActionKey.Right:
          e.stopImmediatePropagation();
          setFocusedIndex((prev) => Math.min(actions.length - 1, prev + 1));
          break;
        case ActionKey.Enter:
          e.stopImmediatePropagation();
          onConfirmRef.current(actions[focusedIndex]);
          break;
        case ActionKey.Escape:
          e.stopImmediatePropagation();
          onCloseRef.current();
          break;
      }
    };

    // Use capture so menu intercepts before board navigation handlers
    window.addEventListener("keydown", handleKeyDown, true);
    return () => window.removeEventListener("keydown", handleKeyDown, true);
  }, [focusedIndex, actions]);

  return { focusedIndex, focusedAction: actions[focusedIndex] };
}
