import type { Meta, StoryObj } from '@storybook/react';
import { BaseCard, MonsterCard } from '../../../core/domain/Card';
import { PlayerHand } from '.';
import exemplo_comum from '@/assets/images/exemplo_comum.jpg';

const card = new MonsterCard(
    '2', 
    'Guarda de Pedra', 
    'Um soldado incansável esculpido nas montanhas antigas. Sua lealdade é tão imutável quanto a rocha de que é feito, servindo como a primeira linha de defesa contra hordas invasoras.', 
    exemplo_comum, 
    'earth', 
    1200, 2000, 4, 'COMUM'
);

const mockCards: BaseCard[] = [
  card, card, card, card, card
];

const meta: Meta<typeof PlayerHand> = {
  title: 'Game/PlayerHand',
  component: PlayerHand,
  parameters: {
    layout: 'fullscreen',
  },
  argTypes: {
    onSelect: { action: 'card selected' },
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

export const Hidden: Story = {
  args: {
    cards: mockCards,
    isHidden: true,
  },
};