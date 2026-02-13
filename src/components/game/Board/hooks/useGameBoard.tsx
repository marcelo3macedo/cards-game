import { useBattleEventStore } from "../../../../store/BattleEventStore";
import { withContextLogging } from "../../../../utils/loggingUtils"

export const useGameBoard = () => {
    const log = withContextLogging('useGameBoard');
    const { isSelectingTarget, setIsSelectingTarget } = useBattleEventStore();

    const isBlur = false;

    const onDraw = () => { /* lógica aqui */ }
    const onSelectTarget = () => {
        setIsSelectingTarget(false)
    }

    return {
        isBlur,
        isSelectingTarget,

        onDraw: log(onDraw),
        onSelectTarget: log(onSelectTarget),
    }
}
