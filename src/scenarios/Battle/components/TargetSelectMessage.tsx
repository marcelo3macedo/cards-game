import { BattleEvent } from "../../../core/domain/BattleStore";
import { useBattleStore } from "../../../store/BattleStore";

export function TargetSelectMessage() {
    const { event } = useBattleStore();
    if (event !== BattleEvent.SELECTING_TARGET) return;

    return (
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 bg-red-600/90 text-white px-10 py-4 rounded-full animate-bounce shadow-[0_0_30px_rgba(220,38,38,0.5)] z-50 border-2 border-white/20 font-black italic">
          SELECIONE O ALVO PARA ATACAR
        </div>
    )
}
