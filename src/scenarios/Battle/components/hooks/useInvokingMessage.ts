import { useEffect } from "react";
import { ActionKey, getActionFromKey } from "../../../../utils/keyUtils";
import { useBattleStore } from "../../../../store/BattleStore";
import { BattleEvent } from "../../../../core/domain/BattleStore";
import { useHandStore } from "../../../../store/HandStore";

export const useInvokingMessage = () => {
    const { event, setEvent } = useBattleStore();
    const { setFocusArea } = useHandStore();

    useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            if (event !== BattleEvent.SELECTING_POSITION) return;

            const action = getActionFromKey(e.key);

            if (action === ActionKey.Escape) {
                setEvent(BattleEvent.INITIAL);
                setFocusArea("hand");
            }
        };

        window.addEventListener("keydown", handleKeyDown);
        return () => window.removeEventListener("keydown", handleKeyDown);
    }, [event, setEvent, setFocusArea]);

    return {
        event
    }
}
