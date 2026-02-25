import { useCallback, useState } from "react";
import { authService } from "../services/authService";
import { useNavigationStore } from "../store/NavigationStore";

export type ScenarioType =
  | "WELCOME" | "MATCHMAKING" | "BATTLE" | "BATTLE_RESULT"
  | "REWARDS" | "PROFILE" | "MAINMENU" | "DECKMANAGER" | "TUTORIAL";

export const useNavigation = () => {
  const currentScenario = useNavigationStore((s) => s.currentScenario);
  const navigateTo = useNavigationStore((s) => s.navigateTo);

  const checkUserStatus = useCallback(() => {
    if (authService.isAuthenticated()) {
      navigateTo("MAINMENU");
    } else {
      navigateTo("PROFILE");
    }
  }, [navigateTo]);

  const handleStartGame = useCallback(() => {
    checkUserStatus();
  }, [checkUserStatus]);

  const handleBattleEnd = useCallback(() => {
    navigateTo("BATTLE_RESULT");
  }, [navigateTo]);

  return {
    currentScenario,
    navigateTo,
    handleStartGame,
    handleBattleEnd
  };
};
