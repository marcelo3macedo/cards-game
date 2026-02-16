import { PlayerHandContainer } from "../../components/game/Hand/container";
import { AbandonBattleModal } from "./components/AbandonBattleModal";
import { SummonOverlay } from "../../components/game/SummorOverlay";
import { EndTurnAction } from "./components/EndTurnAction";
import { OpponentHandContainer } from "../../components/game/Hand/opponentContainer";
import { EnemyLifePoints } from "./components/EnemyLifePoints";
import { useBattleEvents } from "./hooks/useBattleEvents";
import { InvokingCardMessage } from "./components/InvokingCardMessage";
import { UserLifePoints } from "./components/UserLifePoints";
import { TargetSelectMessage } from "./components/TargetSelectMessage";
import { GameBoard } from "../../components/game/Board";
import { ViewOverlay } from "../../components/game/ViewOverlay";
import { BattleAnimation } from "../../components/game/Battle/BattleAnimation";
import { MagicOverlay } from "../../components/game/MagicOverlay";
import { EffectCardOverlay } from "../../components/game/EffectCardOverlay";

export default function BattleScenario({ onBack, onEnd }: any) {
  const { currentTurnOwner, handleAbandon, handleEndTurn } = useBattleEvents({ onBack, onEnd });

  return (
    <div className="h-screen w-screen bg-zinc-950 flex flex-col items-center justify-center overflow-hidden text-white font-sans select-none relative bg-[radial-gradient(circle_at_center,_#1a1a2e_0%,#09090b_100%)]">
      <div className="absolute inset-0 opacity-20 pointer-events-none bg-[url('/grid-pattern.svg')] bg-center [mask-image:radial-gradient(white,transparent)]"></div>

      <div className="actions">
        <AbandonBattleModal onConfirm={handleAbandon} />
        <EndTurnAction
          handleEndTurn={handleEndTurn}
          currentTurnOwner={currentTurnOwner}
        />
      </div>
      <div className="life-points">
        <EnemyLifePoints />
        <UserLifePoints />
      </div>
      <div className="hand-deck">
        <OpponentHandContainer />
        <PlayerHandContainer />
      </div>
      <div className="messages">
        <InvokingCardMessage />
        <TargetSelectMessage />
      </div>
      <div className="effects">
        <SummonOverlay />
        <MagicOverlay />
        <ViewOverlay />
        <BattleAnimation />
        <EffectCardOverlay />
      </div>
      <div className="board">
        <GameBoard />
      </div>
    </div>
  );
}
