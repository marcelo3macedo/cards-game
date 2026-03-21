import React from "react";
import { motion } from "framer-motion";
import { Sword, RefreshCw, Search, ArrowUpFromLineIcon } from "lucide-react";
import type { ExtendedFieldZoneMenuProps } from "../../../core/domain/FieldZone";
import { useFieldZoneMenu } from "./hooks/useFieldZoneMenu";
import { useFieldZoneMenuKeyboard, type MenuAction } from "./hooks/useFieldZoneMenuKeyboard";
import { useBattleStore } from "../../../store/BattleStore";

export const FieldZoneMenu: React.FC<ExtendedFieldZoneMenuProps> = ({
  card,
  canAttack,
  mode,
  index,
  isOpponent = false,
  isMonster = false,
  onEnd
}) => {
  const {
    onInitiateAttack,
    onChangeMode,
    onInvoke,
    onView,
    onClose
  } = useFieldZoneMenu({ onEnd, card, mode, isMonster });

  const turn = useBattleStore((s) => s.turn);
  const isFaceDown = (mode === "face-down-attack" || mode === "face-down-defense");
  const canChangeMode = !isFaceDown && (canAttack || turn === 1);

  if (isOpponent && isFaceDown) return <></>;

  // Build the ordered list of visible actions
  const visibleActions: MenuAction[] = [];
  if (!isOpponent) {
    if (mode === "attack" && canAttack) visibleActions.push("attack");
    if (isFaceDown) visibleActions.push("invoke");
    else if (canChangeMode) visibleActions.push("change-mode");
  }
  if (!isOpponent || !isFaceDown) visibleActions.push("view");

  const handleConfirm = (action: MenuAction) => {
    switch (action) {
      case "attack":   onInitiateAttack?.(index); onClose(); break;
      case "invoke":   onInvoke?.(index);          onClose(); break;
      case "change-mode": onChangeMode?.(index);   onClose(); break;
      case "view":     onView?.(index);             onClose(); break;
    }
  };

  const { focusedAction } = useFieldZoneMenuKeyboard({
    actions: visibleActions,
    onConfirm: handleConfirm,
    onClose,
  });

  const isFocused = (action: MenuAction) => focusedAction === action;

  return (
    <motion.div
      initial={{ opacity: 0, y: 10, x: "-50%" }}
      animate={{ opacity: 1, y: -10, x: "-50%" }}
      exit={{ opacity: 0, y: 5, x: "-50%" }}
      className="absolute -top-12 left-1/2 flex gap-1 bg-zinc-900/95 border border-white/20 p-1.5 rounded-xl shadow-2xl z-[100] backdrop-blur-md"
    >
      {!isOpponent && (
        <>
          {mode === "attack" && canAttack && (
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                onInitiateAttack?.(index);
                onClose();
              }}
              className={`p-2 rounded-lg transition-colors group/btn ${isFocused("attack") ? "bg-red-500/40 ring-1 ring-red-400 text-red-300" : "hover:bg-red-500/20 text-red-400"}`}
              title="Declarar Ataque"
              aria-label="Declarar Ataque"
            >
              <Sword size={18} className="group-hover/btn:scale-110 group-active/btn:scale-90" />
            </button>
          )}

          {isFaceDown ? (
            <button
              onClick={(e) => {
                e.stopPropagation();
                onInvoke?.(index);
                onClose();
              }}
              className={`p-2 rounded-lg transition-colors group/btn ${isFocused("invoke") ? "bg-yellow-500/40 ring-1 ring-yellow-400 text-yellow-300" : "hover:bg-yellow-500/20 text-yellow-400"}`}
              title="Invocação de Virada"
            >
              <ArrowUpFromLineIcon size={18} className="group-hover/btn:scale-110" />
            </button>
          ) : canChangeMode && (
            <button
              onClick={(e) => {
                e.stopPropagation();
                onChangeMode?.(index);
                onClose();
              }}
              className={`p-2 rounded-lg transition-colors group/btn ${isFocused("change-mode") ? "bg-blue-500/40 ring-1 ring-blue-400 text-blue-300" : "hover:bg-blue-500/20 text-blue-400"}`}
              title="Mudar Posição"
            >
              <RefreshCw size={18} className="group-hover/btn:scale-110" />
            </button>
          )}
        </>
      )}

      {!isOpponent || !isFaceDown ? (
        <button
          onClick={(e) => {
            e.stopPropagation();
            onView?.(index);
            onClose();
          }}
          className={`p-2 rounded-lg transition-colors group/btn ${isFocused("view") ? "bg-emerald-500/40 ring-1 ring-emerald-400 text-emerald-300" : "hover:bg-emerald-500/20 text-emerald-400"}`}
          title="Visualizar Carta"
        >
          <Search size={18} className="group-hover/btn:scale-110" />
        </button>
      ) : <></>}

      <div className="absolute -bottom-4 left-0 right-0 h-4 bg-transparent" />
    </motion.div>
  );
};
