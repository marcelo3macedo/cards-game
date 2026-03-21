import { BattleEvent } from "../../../../core/domain/BattleStore";
import { useBattleEventStore } from "../../../../store/BattleEventStore";
import { useBattleStore } from "../../../../store/BattleStore";
import { withContextLogging } from "../../../../utils/loggingUtils"

export const useGameBoard = () => {
    const log = withContextLogging('useGameBoard');
    const { isSelectingTarget, setIsSelectingTarget } = useBattleEventStore();
    const { environment, event } = useBattleStore();

    const isBlur = false;
    const activeField = environment?.activeField;

    const onDraw = () => { /* lógica aqui */ }
    const onSelectTarget = () => {
        setIsSelectingTarget(false)
    }

    return {
        activeField,
        isBlur,
        isSelectingTarget: isSelectingTarget && event !== BattleEvent.EQUIP_TARGETING,

        onDraw: log(onDraw),
        onSelectTarget: log(onSelectTarget),
    }
}
