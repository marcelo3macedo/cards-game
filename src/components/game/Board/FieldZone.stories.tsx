import type { Meta, StoryObj } from "@storybook/react";
import { FieldZone } from "./FieldZone";
import { MonsterCard } from "../../../core/domain/Card";
import exemplo_comum from "@/assets/images/exemplo_comum.jpg";

const meta: Meta<typeof FieldZone> = {
  title: "Game/FieldZone",
  component: FieldZone,
  parameters: { layout: "centered" },
  tags: ["autodocs"],
  argTypes: {
    mode: { control: "select", options: ["atk", "def", "face-down"] },
  },
};

export default meta;
type Story = StoryObj<typeof FieldZone>;

const mockCard = new MonsterCard(
  "1",
  "Patrulheiro Gárgula de Gelo",
  "Emmissão de sombras geladas, ele vigia fronteiras celestiais, lançando gelo que bloqueia invasores e fortalece aliados. Sua presença inspira coragem, e o eco de seu grito de gelo ressoa nas muralhas, formando escudos de pedra que refutam qualquer ataque.",
  exemplo_comum,
  "ice",
  2500,
  2100,
  7,
  "LEGENDARIO",
);

export const Empty: Story = {
  args: { index: 0, card: undefined, isInteractable: false },
};

export const AttackerMode: Story = {
  args: {
    index: 1,
    card: mockCard,
    mode: "atk",
  },
};

export const DefenseMode: Story = {
  args: {
    index: 2,
    card: mockCard,
    mode: "def",
  },
};

export const FaceDown: Story = {
  args: {
    index: 3,
    card: mockCard,
    mode: "face-down",
  },
};

export const Selected: Story = {
  args: {
    index: 4,
    card: mockCard,
    mode: "atk",
    isSelected: true,
  },
};
