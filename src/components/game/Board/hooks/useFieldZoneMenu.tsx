import { BattleEvent } from "../../../../core/domain/BattleStore";
import { battleService } from "../../../../services/battleService";
import { useBattleEventStore } from "../../../../store/BattleEventStore";
import { useBattleStore } from "../../../../store/BattleStore";
import { withContextLogging } from "../../../../utils/loggingUtils"

export const useFieldZoneMenu = ({ onEnd, card, mode, isMonster }: any) => {
    const log = withContextLogging('useFieldZoneMenu');
    const { setEvent } = useBattleStore();
    const { setSelectedCard, setSelectedOrigin, setViewCard, setIsSelectingTarget, setSelectedAttackerIndex } = useBattleEventStore();

    const onChangeMode = async (index: number) => {
        if (isMonster) {
            const position = (() => {
            if (mode === "face-down-defense") return "attack";

            return mode.includes("attack")
                ? mode.replaceAll("attack", "defense")
                : mode.replaceAll("defense", "attack");
            })();

            const response = await battleService.changePosition(index, position);
            useBattleStore.getState().setBattle(response);
        } else {
            setSelectedOrigin("spells");
            setSelectedCard(card);
            setEvent(BattleEvent.ACTIVATING_EFFECT);
        }
    }

    const onInvoke = async (index: number) => {
        if (isMonster) {
            const position = "attack";

            const response = await battleService.changePosition(index, position);
            useBattleStore.getState().setBattle(response);
        } else {
            setSelectedOrigin("spells");
            setSelectedCard(card);
            setEvent(BattleEvent.ACTIVATING_EFFECT);
        }
    }

    const onInitiateAttack = (index: number) => {
        setSelectedAttackerIndex(index);
        setIsSelectingTarget(true);
        setEvent(BattleEvent.SELECTING_TARGET);
    }
    const onView = () => { setViewCard(card); }
    const onClose = () => { onEnd() }

    return {
        onInitiateAttack: log(onInitiateAttack),
        onInvoke: log(onInvoke),
        onChangeMode: log(onChangeMode),
        onView: log(onView),
        onClose: log(onClose)
    }
}
