import type { Meta, StoryObj } from "@storybook/react";
import TutorialScenario from ".";

const meta: Meta<typeof TutorialScenario> = {
  title: "Scenarios/TutorialScenario",
  component: TutorialScenario,
  parameters: {
    layout: "fullscreen",
  },
  argTypes: {
    onBack: { action: "clicked" },
  },
};

export default meta;
type Story = StoryObj<typeof TutorialScenario>;

export const Default: Story = {
  args: {
    onBack: () => console.log("Voltou ao menu!"),
  },
};

export const TopicCartas: Story = {
  name: "Topic: Tipos de Cartas",
  args: {
    ...Default.args,
  },
};

export const MobileView: Story = {
  args: {
    ...Default.args,
  },
  parameters: {
    viewport: {
      defaultViewport: "mobile1",
    },
  },
};
