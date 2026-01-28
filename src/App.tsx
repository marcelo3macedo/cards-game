import { useState } from "react";
import WelcomeScenario from "./scenarios/Welcome";
import MatchmakingScenario from "./scenarios/Matchmaking";
import BattleScenario from "./scenarios/Battle";
import ProfileScenario from "./scenarios/Profile";
import MainMenuScenario from "./scenarios/MainMenu";
import DeckManagerScenario from "./scenarios/DeckManager";

// Definimos os tipos de cenários disponíveis
type ScenarioType =
	| "WELCOME"
	| "MATCHMAKING"
	| "BATTLE"
	| "PROFILE"
	| "MAINMENU"
	| "DECKMANAGER";

function App() {
	const [currentScenario, setCurrentScenario] =
		useState<ScenarioType>("BATTLE");

	const navigateTo = (scenario: ScenarioType) => setCurrentScenario(scenario);

	return (
		<div className="game-container">
			{currentScenario === "WELCOME" && (
				<WelcomeScenario onStart={() => navigateTo("PROFILE")} />
			)}
			{currentScenario === "MAINMENU" && (
				<MainMenuScenario
					onViewDeck={() => navigateTo("DECKMANAGER")}
					onSelectOpponent={() => navigateTo("BATTLE")}
				/>
			)}

			{currentScenario === "MATCHMAKING" && (
				<MatchmakingScenario
					onBack={() => navigateTo("WELCOME")}
					onSelectOpponent={() => navigateTo("BATTLE")}
				/>
			)}

			{currentScenario === "BATTLE" && (
				<BattleScenario onEnd={() => navigateTo("MATCHMAKING")} />
			)}

			{currentScenario === "DECKMANAGER" && (
				<DeckManagerScenario onBack={() => navigateTo("MAINMENU")} />
			)}

			{currentScenario === "PROFILE" && (
				<ProfileScenario onConfirm={() => navigateTo("MAINMENU")} />
			)}
		</div>
	);
}

export default App;
