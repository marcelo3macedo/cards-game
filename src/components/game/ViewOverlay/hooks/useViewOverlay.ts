import { useBattleEventStore } from "../../../../store/BattleEventStore";
import { withContextLogging } from "../../../../utils/loggingUtils";

export const useViewOverlay = () => {
    const log = withContextLogging("useViewOverlay");
    const { viewCard, clearViewCard, setViewCard } = useBattleEventStore();

    const closeAction = () => {
        clearViewCard();
    }

    return {
        viewCard,
        setViewCard,
        onClose: log(closeAction)
    }
}
