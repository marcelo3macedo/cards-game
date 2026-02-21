import { useBattleEventStore } from "../../../../store/BattleEventStore";
import { useBattleStore } from "../../../../store/BattleStore";
import { withContextLogging } from "../../../../utils/loggingUtils"

export const useGameBoard = () => {
    const log = withContextLogging('useGameBoard');
    const { isSelectingTarget, setIsSelectingTarget } = useBattleEventStore();
    const environment = useBattleStore((s) => s.environment);

    const isBlur = false;
    const activeField = environment?.activeField;

    const onDraw = () => { /* lógica aqui */ }
    const onSelectTarget = () => {
        setIsSelectingTarget(false)
    }

    return {
        activeField,
        isBlur,
        isSelectingTarget,

        onDraw: log(onDraw),
        onSelectTarget: log(onSelectTarget),
    }
}
