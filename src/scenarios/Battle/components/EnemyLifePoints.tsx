import { LifePoints } from "../../../components/game/LifePoints";
import { useBattleStore } from "../../../store/BattleStore";

export function EnemyLifePoints() {
    const { currentTurnOwner } = useBattleStore();

    return (
        <div className="absolute right-10 top-5 flex flex-col gap-2">
            <LifePoints
                target="opponent"
                color="red"
                align="right"
            />
            <div className="flex gap-4 justify-end">
                <span className="bg-red-900/20 px-2 py-1 rounded text-[10px] text-red-400 border border-red-500/20">
                TURNO: {currentTurnOwner === 'opponent' ? 'ADVERSÁRIO' : 'AGUARDANDO'}
                </span>
            </div>
        </div>
    )
}
