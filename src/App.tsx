import WelcomeScenario from "./scenarios/Welcome";
import MatchmakingScenario from "./scenarios/Matchmaking";
import BattleScenario from "./scenarios/Battle";
import ProfileScenario from "./scenarios/Profile";
import MainMenuScenario from "./scenarios/MainMenu";
import DeckManagerScenario from "./scenarios/DeckManager";
import { BattleResultScenario } from "./scenarios/Result";
import { RewardsScenario } from "./scenarios/Result/Rewards";
import TutorialScenario from "./scenarios/Help";
import { useNavigation, type ScenarioType } from "./hooks/useNavigation";

function App() {
  const {
    currentScenario,
    lastBattleOutcome,
    mockedRewards,
    navigateTo,
    handleStartGame,
    handleBattleEnd
  } = useNavigation();

  const scenarios: Record<ScenarioType, React.ReactNode> = {
    WELCOME: <WelcomeScenario onStart={handleStartGame} />,
    PROFILE: <ProfileScenario onConfirm={() => navigateTo("MAINMENU")} />,
    MAINMENU: (
      <MainMenuScenario
        onViewDeck={() => navigateTo("DECKMANAGER")}
        onSelectOpponent={() => navigateTo("MATCHMAKING")}
        onViewTips={() => navigateTo("TUTORIAL")}
      />
    ),
    MATCHMAKING: (
      <MatchmakingScenario
        onBack={() => navigateTo("MAINMENU")}
        onBattleStarted={() => navigateTo("BATTLE")}
      />
    ),
    BATTLE: <BattleScenario onEnd={handleBattleEnd} />,
    BATTLE_RESULT: lastBattleOutcome && (
      <BattleResultScenario
        {...lastBattleOutcome}
        onSeeRewards={() => navigateTo("REWARDS")}
        onGoMenu={() => navigateTo("MAINMENU")}
      />
    ),
    REWARDS: (
      <RewardsScenario
        cards={mockedRewards}
        onBack={() => navigateTo("MAINMENU")}
      />
    ),
    DECKMANAGER: <DeckManagerScenario onBack={() => navigateTo("MAINMENU")} />,
    TUTORIAL: <TutorialScenario onBack={() => navigateTo("MAINMENU")} />,
  };

  return (
    <div className="game-container">
      {scenarios[currentScenario] || scenarios.WELCOME}
    </div>
  );
}

export default App;
