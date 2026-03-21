import { useEffect } from "react";
import { useBattleEventStore } from "../../../../store/BattleEventStore";
import { withContextLogging } from "../../../../utils/loggingUtils";
import { ActionKey, getActionFromKey } from "../../../../utils/keyUtils";

export const useViewOverlay = () => {
    const log = withContextLogging("useViewOverlay");
    const { viewCard, clearViewCard, setViewCard } = useBattleEventStore();

    const closeAction = () => {
        clearViewCard();
    }

    useEffect(() => {
        if (!viewCard) return;

        const handleKeyDown = (e: KeyboardEvent) => {
            const action = getActionFromKey(e.key);

            if (action === ActionKey.Escape) {
                e.stopImmediatePropagation();
                clearViewCard();
            }
        };

        window.addEventListener("keydown", handleKeyDown, true);
        return () => window.removeEventListener("keydown", handleKeyDown, true);
    }, [viewCard]);

    return {
        viewCard,
        setViewCard,
        onClose: log(closeAction)
    }
}
