import type { Meta, StoryObj } from '@storybook/react';
import { Card } from './index';
import { MonsterCard } from '../../../core/domain/Card';
import exemplo_comum from '@/assets/images/exemplo_comum.jpg';

const meta = {
  title: 'Game/Card/Sizes',
  component: Card,
} satisfies Meta<typeof Card>;

export default meta;

export const Standard: StoryObj<typeof meta> = {
  args: {
    card: new MonsterCard(
      '2', 
      'Guarda de Pedra', 
      'Um soldado incansável esculpido nas montanhas antigas. Sua lealdade é tão imutável quanto a rocha de que é feito, servindo como a primeira linha de defesa contra hordas invasoras.', 
      exemplo_comum, 
      'earth', 
      1200, 2000, 4, 'COMUM'
    )
  }
};

export const Large: StoryObj<typeof meta> = {
  args: {
    card: new MonsterCard(
      '2', 
      'Guarda de Pedra', 
      'Um soldado incansável esculpido nas montanhas antigas. Sua lealdade é tão imutável quanto a rocha de que é feito, servindo como a primeira linha de defesa contra hordas invasoras.', 
      exemplo_comum, 
      'earth', 
      1200, 2000, 4, 'COMUM'
    ),
    size: "lg"
  }
};

export const Medium: StoryObj<typeof meta> = {
  args: {
    card: new MonsterCard(
      '2', 
      'Guarda de Pedra', 
      'Um soldado incansável esculpido nas montanhas antigas. Sua lealdade é tão imutável quanto a rocha de que é feito, servindo como a primeira linha de defesa contra hordas invasoras.', 
      exemplo_comum, 
      'earth', 
      1200, 2000, 4, 'COMUM'
    ),
    size: "md"
  }
};

export const Small: StoryObj<typeof meta> = {
  args: {
    card: new MonsterCard(
      '2', 
      'Guarda de Pedra', 
      'Um soldado incansável esculpido nas montanhas antigas. Sua lealdade é tão imutável quanto a rocha de que é feito, servindo como a primeira linha de defesa contra hordas invasoras.', 
      exemplo_comum, 
      'earth', 
      1200, 2000, 4, 'COMUM'
    ),
    size: "sm"
  }
};

export const ExtraSmall: StoryObj<typeof meta> = {
  args: {
    card: new MonsterCard(
      '2', 
      'Guarda de Pedra', 
      'Um soldado incansável esculpido nas montanhas antigas. Sua lealdade é tão imutável quanto a rocha de que é feito, servindo como a primeira linha de defesa contra hordas invasoras.', 
      exemplo_comum, 
      'earth', 
      1200, 2000, 4, 'COMUM'
    ),
    size: "xs"
  }
};