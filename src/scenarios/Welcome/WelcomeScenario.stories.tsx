import type { Meta, StoryObj } from "@storybook/react";
import WelcomeScenario from ".";

const meta: Meta<typeof WelcomeScenario> = {
  title: "Scenarios/WelcomeScenario",
  component: WelcomeScenario,
  parameters: {
    layout: "fullscreen",
  },
  argTypes: {
    onStart: { action: "clicked" },
  },
};

export default meta;
type Story = StoryObj<typeof WelcomeScenario>;

export const Default: Story = {
  args: {
    onStart: () => console.log("Duelo Iniciado!"),
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
