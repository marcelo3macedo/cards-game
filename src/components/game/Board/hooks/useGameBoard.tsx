import { withContextLogging } from "../../../../utils/loggingUtils"

export const useGameBoard = () => {
    const log = withContextLogging('useGameBoard');

    const isSelectingTarget = false;
    const isBlur = false;

    const onDraw = () => { /* lógica aqui */ }
    const onSelectTarget = () => { /* lógica aqui */ }

    return {
        isBlur,
        isSelectingTarget,

        onDraw: log(onDraw),
        onSelectTarget: log(onSelectTarget),
    }
}
