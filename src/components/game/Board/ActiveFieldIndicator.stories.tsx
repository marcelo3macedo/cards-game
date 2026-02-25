import type { Meta, StoryObj } from '@storybook/react';
import { ActiveFieldIndicator } from './ActiveFieldIndicator';

const meta: Meta<typeof ActiveFieldIndicator> = {
  title: 'Game/ActiveFieldIndicator',
  component: ActiveFieldIndicator,
  parameters: {
    layout: 'fullscreen',
    backgrounds: { default: 'dark' },
  },
  decorators: [
    (Story) => (
      <div className="relative w-full h-[300px] bg-slate-950">
        <Story />
      </div>
    ),
  ],
};

export default meta;
type Story = StoryObj<typeof ActiveFieldIndicator>;

export const Default: Story = {
  args: {
    field: null,
  },
};

export const WaterField: Story = {
  args: {
    field: {
      name: 'Oceano Profundo',
      type: 'agua',
    },
  },
};

export const FireField: Story = {
  args: {
    field: {
      name: 'Vulcão de Enxofre',
      type: 'fogo',
    },
  },
};

export const EarthField: Story = {
  args: {
    field: {
      name: 'Caverna de Cristal',
      type: 'terra',
    },
  },
};

export const UnknownType: Story = {
  args: {
    field: {
      name: 'Campo Misterioso',
    },
  },
};
