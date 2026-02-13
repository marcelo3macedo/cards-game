import React from "react";
import { useBattleStore } from "../../store/BattleStore";
import { BattleResultContainer } from "./container";
import { getImageUrl } from "../../utils/imageUtils";

interface BattleResultContainerProps {
  onSeeRewards: (cards: any[]) => void;
  onGoMenu: () => void;
}

export const BattleResultScenario: React.FC<BattleResultContainerProps> = ({
  onSeeRewards,
  onGoMenu,
}) => {
  const { result, clearBattle } = useBattleStore();

  if (!result || !result.history || !result.villain) {
    return null;
  }

  const { history, villain } = result;
  const status = history.status === "win" ? "victory" : "defeat";
  const opponentMessage = status === "victory" ? villain.angerQuote : villain.happyQuote;

  const handleGoMenuClick = () => {
    clearBattle();
    onGoMenu();
  };

  const handleSeeRewardsClick = () => {
    onSeeRewards(history.cardsAcquired);
  };

  return (
    <BattleResultContainer
      status={status}
      opponentName={villain.name}
      opponentImage={getImageUrl(villain.profilePictureUrl) || ""}
      opponentMessage={opponentMessage}
      rating={history.stars}
      onSeeRewards={handleSeeRewardsClick}
      onGoMenu={handleGoMenuClick}
    />
  );
};
