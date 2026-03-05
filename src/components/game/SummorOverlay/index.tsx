import React from "react";
import { Card } from "../Card";
import { ActionButton } from "./ActionButton";
import type { SummonOverlayProps } from "../../../core/domain/Summon";
import { useSummonOverlayNavigation } from "./hooks/useSummonOverlayNavigation";
import { BattleEvent } from "../../../core/domain/BattleStore";
import { useBattleEventStore } from "../../../store/BattleEventStore";
import { useHandStore } from "../../../store/HandStore";

export const SummonOverlay: React.FC<SummonOverlayProps> = () => {
  const { options, activeIndex, card, eventType, onSummon, onCancel } = useSummonOverlayNavigation();
  const { fusionCardIndices } = useBattleEventStore();
  const { fusionMaterialCards } = useHandStore();

  const isFusion = fusionCardIndices.length > 0;
  const isVisible = eventType === BattleEvent.SELECTING_MODE && (!!card || isFusion);

  if (!isVisible) return <></>;

  return (
    <div className="absolute inset-0 z-[100] flex flex-col items-center justify-center animate-in fade-in zoom-in duration-300 backdrop-blur-md bg-black/80">
      <div className="mb-10 shadow-[0_0_80px_rgba(0,0,0,0.6)] scale-110">
        {isFusion ? (
          <div className="flex items-center gap-4">
            {fusionMaterialCards.slice(0, 2).map((c, i) => (
              <div key={i} className="opacity-90">
                <Card card={c} size="md" />
              </div>
            ))}
            <div className="text-purple-400 text-4xl font-black">⬡</div>
          </div>
        ) : (
          <Card card={card!} size="lg" />
        )}
      </div>

      {isFusion && (
        <div className="mb-6 text-purple-300 font-bold italic tracking-[0.2em] text-sm animate-pulse">
          FUSÃO — Escolha o modo
        </div>
      )}

      <div className="flex flex-col items-center gap-8 w-full max-w-2xl px-6">
        <div className="grid grid-cols-4 gap-4 w-full">
          {options.map((opt, index) => (
            <div
              key={opt.mode}
              className={`transition-all duration-200 ${activeIndex === index ? "scale-110" : "scale-100 opacity-50"}`}
            >
              <ActionButton {...opt} onSummon={onSummon} isSelected={activeIndex === index} />
            </div>
          ))}
        </div>

        <button
          onClick={onCancel}
          className="text-[10px] font-bold text-zinc-500 hover:text-red-400 uppercase tracking-[0.4em] transition-colors py-2"
        >
          [ ESC para Cancelar ]
        </button>
      </div>
    </div>
  );
};
