import { LifePoints } from "../../components/game/LifePoints";
import { PlayerHandContainer } from "../../components/game/Hand/container";
import { DrawCard } from "../../components/game/Hand/DrawCard";
import { useBattleActions } from "./hooks/useBattleActions";
import { AbandonBattleModal } from "./components/AbandonBattleModal";
import { GameBoard } from "../../components/game/Board";
import { SummonOverlay } from "../../components/game/SummorOverlay";
import { BattleAnimationOverlay } from "../../components/game/Battle/BattleAnimationOverlay";
import { EndTurnAction } from "./components/EndTurnAction";
import { OpponentHandContainer } from "../../components/game/Hand/opponentContainer";

export default function BattleScenario({ onBack, onEnd }: any) {
  const {
    monsterZones,
    opponentZones,
    battleData,
    isSelectingZone,
    isSelectingTarget,
    handleZoneClick,
    selectedCard,
    handleInitiateAttack,
    handleSelectTarget,
    handleChangeMode,
    pendingSummon,
    focusedZoneIndex,
    handleDrawCard,
    drawingCard,
    finalizeDraw,
    handleHandSelect,
    currentTurnOwner,
    clearBattle,
    executeSummon,
    handleBattleComplete,
    setPendingSummon,
    handleEndTurn
  } = useBattleActions();

  const handleAbandon = () => {
    clearBattle();
    onBack();
  };

  return (
    <div className="h-screen w-screen bg-zinc-950 flex flex-col items-center justify-center overflow-hidden text-white font-sans select-none relative bg-[radial-gradient(circle_at_center,_#1a1a2e_0%,#09090b_100%)]">
      <div className="absolute inset-0 opacity-20 pointer-events-none bg-[url('/grid-pattern.svg')] bg-center [mask-image:radial-gradient(white,transparent)]"></div>

      <div className="absolute left-10 top-5 z-50">
        <AbandonBattleModal onConfirm={handleAbandon} />
      </div>

      <OpponentHandContainer />

      <div className="absolute right-10 top-5 flex flex-col gap-2">
        <LifePoints
          target="opponent"
          color="red"
          align="right"
        />
        <div className="flex gap-4 justify-end">
          <span className="bg-red-900/20 px-2 py-1 rounded text-[10px] text-red-400 border border-red-500/20">
            TURNO: {currentTurnOwner === 'opponent' ? 'ADVERSÁRIO' : 'AGUARDANDO'}
          </span>
        </div>
      </div>

      <GameBoard
        monsterZones={monsterZones}
        opponentZones={opponentZones}
        isBlur={!!battleData}
        isSelecting={isSelectingZone}
        isSelectingTarget={isSelectingTarget}
        onZoneSelect={handleZoneClick}
        onInitiateAttack={handleInitiateAttack}
        onSelectTarget={handleSelectTarget}
        onChangeMode={handleChangeMode}
        highlightedIndex={pendingSummon?.index}
        focusedZoneIndex={focusedZoneIndex}
        onDraw={handleDrawCard}
      />

      <PlayerHandContainer onSelectCard={handleHandSelect} />
      <DrawCard card={drawingCard} onComplete={finalizeDraw} />

      {pendingSummon !== null && selectedCard && (
        <SummonOverlay
          card={selectedCard}
          onSummon={executeSummon}
          onCancel={() => setPendingSummon(null)}
        />
      )}

      {isSelectingTarget && (
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 bg-red-600/90 text-white px-10 py-4 rounded-full animate-bounce shadow-[0_0_30px_rgba(220,38,38,0.5)] z-50 border-2 border-white/20 font-black italic">
          SELECIONE O ALVO PARA ATACAR
        </div>
      )}

      {battleData && (
        <BattleAnimationOverlay
          attacker={battleData.attacker}
          defender={battleData.defender}
          onAnimationEnd={handleBattleComplete}
        />
      )}

      {isSelectingZone && !pendingSummon && (
        <div className="absolute bottom-40 left-1/2 -translate-x-1/2 bg-blue-600/90 text-white px-8 py-3 rounded-full animate-pulse shadow-[0_0_20px_rgba(59,130,246,0.5)] z-50 border border-blue-400">
          Escolha um local no campo para invocar ou pressione{" "}
          <span className="font-bold bg-black/30 px-2 py-0.5 rounded">ESC</span>
        </div>
      )}

      <div className="absolute left-10 top-1/2 -translate-y-1/2">
        <LifePoints target="player" color="blue" align="left" />
      </div>

      <EndTurnAction
        handleEndTurn={handleEndTurn}
        currentTurnOwner={currentTurnOwner}
      />
    </div>
  );
}
