import { useState } from "react";
import WelcomeScenario from "./scenarios/Welcome";
import MatchmakingScenario from "./scenarios/Matchmaking";
import BattleScenario from "./scenarios/Battle";
import ProfileScenario from "./scenarios/Profile";
import MainMenuScenario from "./scenarios/MainMenu";
import DeckManagerScenario from "./scenarios/DeckManager";
import { BattleResultScenario } from "./scenarios/Result";
import { RewardsScenario } from "./scenarios/Result/Rewards";
import { MonsterCard } from "./core/domain/Card"; // Certifique-se de importar o tipo
import exemplo_legendaria from '@/assets/images/exemplo_legendaria.jpg';
import TutorialScenario from "./scenarios/Help";

// Definimos os tipos de cenários disponíveis
type ScenarioType =
    | "WELCOME"
    | "MATCHMAKING"
    | "BATTLE"
    | "BATTLE_RESULT" // Novo
    | "REWARDS"       // Novo
    | "PROFILE"
    | "MAINMENU"
    | "DECKMANAGER"
    | "TUTORIAL";

interface BattleOutcome {
    status: 'victory' | 'defeat';
    opponentName: string;
    opponentImage: string;
    opponentMessage: string;
    rating: number;
}

function App() {
    const [lastBattleOutcome, setLastBattleOutcome] = useState<BattleOutcome | null>({
        status: 'victory',
        opponentName: 'Gárgula de Gelo',
        opponentImage: exemplo_legendaria,
        opponentMessage: 'Seu baralho de fogo foi mais quente que meu gelo eterno... desta vez.',
        rating: 4
    });

    // 2. Mock de cartas ganhas para a tela de recompensas
    const [mockedRewards] = useState<MonsterCard[]>([
        new MonsterCard('reward-1', 'Dragão de Cristal', 'Um dragão reluzente...', exemplo_legendaria, 'light', 2800, 2400, 8, 'LENDARIO'),
        new MonsterCard('reward-2', 'Guerreiro de Elite', 'Especialista em combate...', exemplo_legendaria, 'earth', 1900, 1200, 4, 'RARO'),
    ]);

    const [currentScenario, setCurrentScenario] = useState<ScenarioType>("TUTORIAL");

    const navigateTo = (scenario: ScenarioType) => setCurrentScenario(scenario);

    const handleBattleEnd = (outcome: BattleOutcome) => {
        setLastBattleOutcome(outcome);
        navigateTo("BATTLE_RESULT");
    };

    return (
        <div className="game-container">
            {currentScenario === "WELCOME" && (
                <WelcomeScenario onStart={() => navigateTo("PROFILE")} />
            )}

            {currentScenario === "MAINMENU" && (
                <MainMenuScenario
                    onViewDeck={() => navigateTo("DECKMANAGER")}
                    onSelectOpponent={() => navigateTo("MATCHMAKING")}
                />
            )}

            {currentScenario === "MATCHMAKING" && (
                <MatchmakingScenario
                    onBack={() => navigateTo("MAINMENU")}
                    onSelectOpponent={() => navigateTo("BATTLE")}
                />
            )}

            {currentScenario === "BATTLE" && (
                <BattleScenario 
                    onEnd={(outcome: BattleOutcome) => handleBattleEnd(outcome)} 
                />
            )}

            {/* --- TELA DE RESULTADO --- */}
            {currentScenario === "BATTLE_RESULT" && lastBattleOutcome && (
                <BattleResultScenario
                    status={lastBattleOutcome.status}
                    opponentName={lastBattleOutcome.opponentName}
                    opponentImage={lastBattleOutcome.opponentImage}
                    opponentMessage={lastBattleOutcome.opponentMessage}
                    rating={lastBattleOutcome.rating}
                    onSeeRewards={() => navigateTo("REWARDS")}
                    onGoMenu={() => navigateTo("MAINMENU")}
                />
            )}

            {/* --- TELA DE RECOMPENSAS (Corrigido com a prop cards) --- */}
            {currentScenario === "REWARDS" && (
                <RewardsScenario
                    cards={mockedRewards} // Passando as cartas mockadas aqui
                    onBack={() => navigateTo("MAINMENU")} 
                />
            )}

            {currentScenario === "DECKMANAGER" && (
                <DeckManagerScenario onBack={() => navigateTo("MAINMENU")} />
            )}

            {currentScenario === "PROFILE" && (
                <ProfileScenario onConfirm={() => navigateTo("MAINMENU")} />
            )}

            {currentScenario === "TUTORIAL" && (
                <TutorialScenario onBack={() => navigateTo("MAINMENU")} />
            )}
        </div>
    );
}

export default App;