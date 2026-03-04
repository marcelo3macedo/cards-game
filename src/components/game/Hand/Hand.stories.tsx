import type { Meta, StoryObj } from "@storybook/react";
import { useState } from "react";
import { motion } from "framer-motion";
import { MonsterCard } from "../../../core/domain/Card";
import { PlayerHand } from ".";

const card = new MonsterCard(
  "1",
  "Patrulheiro Gárgula de Gelo",
  "Emmissão de sombras geladas, ele vigia fronteiras celestiais, lançando gelo que bloqueia invasores e fortalece aliados. Sua presença inspira coragem, e o eco de seu grito de gelo ressoa nas muralhas, formando escudos de pedra que refutam qualquer ataque.",
  'images/exemplo_comum.jpg',
  "attack",
  "ice",
  2500,
  2100,
  7,
  "LEGENDARIO",
);

const mockCards = [card, card, card, card, card];

const meta: Meta<typeof PlayerHand> = {
  title: "Game/PlayerHand",
  component: PlayerHand,
  parameters: {
    layout: "fullscreen",
  },
  argTypes: {
    onSelect: { action: "card selected" },
  },
};

export default meta;
type Story = StoryObj<typeof PlayerHand>;

export const Default: Story = {
  args: {
    cards: mockCards,
    isHidden: false,
  },
  render: (args) => (
    <div className="w-full h-screen bg-slate-900 flex items-center justify-center">
      <p className="text-white absolute top-10 text-center">
        Use as setas ⬅️ ➡️ do teclado e Enter para selecionar
      </p>
      <PlayerHand {...args} />
    </div>
  ),
};

export const Dimmed: Story = {
  args: {
    cards: mockCards,
    isHidden: false,
  },
  render: (args) => (
    <div className="w-full h-screen bg-slate-900">
      <p className="text-white absolute top-10 w-full text-center text-sm opacity-60">
        Estado inativo — cartas sempre visíveis, mas discretas (y: 120, opacity: 0.4)
      </p>
      <div className="fixed bottom-0 left-0 right-0 flex justify-center">
        <motion.div
          initial={false}
          animate={{ y: 120, opacity: 0.4 }}
        >
          <PlayerHand {...args} />
        </motion.div>
      </div>
    </div>
  ),
};

export const Visible: Story = {
  args: {
    cards: mockCards,
    isHidden: false,
  },
  render: (args) => (
    <div className="w-full h-screen bg-slate-900">
      <p className="text-white absolute top-10 w-full text-center text-sm opacity-60">
        Estado ativo — cartas completamente visíveis (y: 0, opacity: 1)
      </p>
      <div className="fixed bottom-0 left-0 right-0 flex justify-center">
        <motion.div
          initial={false}
          animate={{ y: 0, opacity: 1 }}
        >
          <PlayerHand {...args} />
        </motion.div>
      </div>
    </div>
  ),
};

export const ToggleDemo: Story = {
  args: {
    cards: mockCards,
    isHidden: false,
  },
  render: (args) => {
    const [isVisible, setIsVisible] = useState(false);

    return (
      <div className="w-full h-screen bg-slate-900">
        <div className="absolute top-10 w-full flex flex-col items-center gap-3">
          <p className="text-white text-sm opacity-60">
            {isVisible
              ? "Estado ativo — mova o mouse pra longe do fundo para desativar"
              : "Estado inativo — mova o mouse para o fundo da tela para ativar"}
          </p>
          <button
            onClick={() => setIsVisible((v) => !v)}
            className="px-4 py-2 bg-blue-600 text-white rounded text-sm hover:bg-blue-500 transition-colors"
          >
            {isVisible ? "Desativar (simular mouse longe)" : "Ativar (simular mouse no fundo)"}
          </button>
        </div>

        <div
          className="fixed bottom-0 left-0 right-0 flex justify-center pointer-events-none"
          onMouseEnter={() => setIsVisible(true)}
          onMouseLeave={() => setIsVisible(false)}
        >
          <motion.div
            initial={false}
            animate={isVisible ? { y: 0, opacity: 1 } : { y: 120, opacity: 0.4 }}
            transition={{ type: "spring", stiffness: 200, damping: 25 }}
            className="pointer-events-auto"
          >
            <PlayerHand {...args} />
          </motion.div>
        </div>
      </div>
    );
  },
};

export const Hidden: Story = {
  args: {
    cards: mockCards,
    isHidden: true,
  },
  render: (args) => (
    <div className="w-full h-screen bg-slate-900">
      <p className="text-white absolute top-10 w-full text-center text-sm opacity-60">
        Monstros bloqueados (isHidden = true) — só magias podem ser jogadas
      </p>
      <PlayerHand {...args} />
    </div>
  ),
};
