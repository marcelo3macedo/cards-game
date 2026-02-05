import type { Meta, StoryObj } from "@storybook/react";
import { useState } from "react";
import { DrawCard } from "./DrawCard";
import { MonsterCard } from "../../../core/domain/Card";
import exemplo_comum from "@/assets/images/exemplo_comum.jpg";

const meta: Meta<typeof DrawCard> = {
  title: "Game/Animations/DrawCard",
  component: DrawCard,
  parameters: {
    layout: "fullscreen",
  },
};

export default meta;

const mockMonster = new MonsterCard(
  "2",
  "Guarda de Pedra",
  "Um soldado incansável esculpido nas montanhas antigas. Sua lealdade é tão imutável quanto a rocha de que é feito, servindo como a primeira linha de defesa contra hordas invasoras.",
  exemplo_comum,
  "earth",
  1200,
  2000,
  4,
  "COMUM",
);

export const InteractiveDraw: StoryObj<typeof DrawCard> = {
  render: () => {
    const [card, setCard] = useState<MonsterCard | null>(null);

    return (
      <div className="w-full h-screen bg-zinc-950 flex flex-col items-center justify-center gap-8">
        <button
          onClick={() => setCard(mockMonster)}
          className="px-6 py-3 bg-blue-600 hover:bg-blue-500 text-white font-bold rounded-lg shadow-lg transition-colors pointer-events-auto z-[900]"
        >
          Puxar Carta (Draw)
        </button>

        <p className="text-zinc-500 text-sm">
          A animação encerra automaticamente 2s após o término do movimento.
        </p>

        <DrawCard card={card} onComplete={() => setCard(null)} />
      </div>
    );
  },
};

export const CommonRarityDraw: StoryObj<typeof DrawCard> = {
  render: () => {
    const [card, setCard] = useState<MonsterCard | null>(null);
    const commonMonster = new MonsterCard(
      "2",
      "Guarda de Pedra",
      "Um soldado incansável esculpido nas montanhas antigas. Sua lealdade é tão imutável quanto a rocha de que é feito, servindo como a primeira linha de defesa contra hordas invasoras.",
      exemplo_comum,
      "earth",
      1200,
      2000,
      4,
      "COMUM",
    );

    return (
      <div className="w-full h-screen bg-zinc-950 flex items-center justify-center">
        <button
          onClick={() => setCard(commonMonster)}
          className="px-6 py-3 bg-slate-600 text-white font-bold rounded-lg pointer-events-auto z-[1001]"
        >
          Draw Common Card
        </button>
        <DrawCard card={card} onComplete={() => setCard(null)} />
      </div>
    );
  },
};
