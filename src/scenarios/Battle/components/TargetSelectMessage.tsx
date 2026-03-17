import { BattleEvent } from "../../../core/domain/BattleStore";
import { useBattleStore } from "../../../store/BattleStore";
import { useBattleEventStore } from "../../../store/BattleEventStore";

export function TargetSelectMessage() {
    const { event } = useBattleStore();
    const { equipTargetInfo } = useBattleEventStore();

    if (event === BattleEvent.EQUIP_TARGETING) {
        return (
            <div className="absolute top-3/4 left-1/2 -translate-x-1/2 bg-emerald-600/90 text-white px-10 py-4 rounded-full animate-bounce shadow-[0_0_30px_rgba(16,185,129,0.5)] z-50 border-2 border-white/20 font-black italic text-center">
                {equipTargetInfo?.message?.toUpperCase() || "ESCOLHA UM MONSTRO PARA EQUIPAR"}
            </div>
        );
    }

    if (event !== BattleEvent.SELECTING_TARGET) return null;

    return (
        <div className="absolute text-xs text-center top-1/4 left-1/2 mt-[-80px] sm:mt-0 -translate-x-1/2 bg-red-600/90 text-white px-4 py-2 sm:px-10 sm:py-4 rounded-full animate-bounce shadow-[0_0_30px_rgba(220,38,38,0.5)] z-50 border-2 border-white/20 font-black italic">
          SELECIONE O ALVO PARA ATACAR
        </div>
    );
}
