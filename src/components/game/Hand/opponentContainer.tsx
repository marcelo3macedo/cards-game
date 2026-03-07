import { useBattleStore } from "../../../store/BattleStore";
import { OpponentHand } from "./opponent";

export const OpponentHandContainer = () => {
  const handCount = useBattleStore((s) => s.opponent?.handCount ?? 0);

  if (handCount <= 0) return null;

  return (
    <div className="hidden sm:flex fixed top-0 left-0 right-0 z-40 justify-center pointer-events-none">
       <OpponentHand count={handCount} />
    </div>
  );
};
