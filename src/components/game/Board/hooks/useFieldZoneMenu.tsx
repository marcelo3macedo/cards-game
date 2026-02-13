import { BattleEvent } from "../../../../core/domain/BattleStore";
import { battleService } from "../../../../services/battleService";
import { useBattleEventStore } from "../../../../store/BattleEventStore";
import { useBattleStore } from "../../../../store/BattleStore";
import { withContextLogging } from "../../../../utils/loggingUtils"

export const useFieldZoneMenu = ({ onEnd, card }: any) => {
    const log = withContextLogging('useFieldZoneMenu');
    const { setEvent } = useBattleStore();
    const { setViewCard, setIsSelectingTarget, setSelectedAttackerIndex } = useBattleEventStore();

    const onChangeMode = async (index: number) => {
        const response = await battleService.changePosition(index);
        useBattleStore.getState().setBattle(response);
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
        onChangeMode: log(onChangeMode),
        onView: log(onView),
        onClose: log(onClose)
    }
}
