import React, { useEffect } from "react";
import type { Meta, StoryObj } from "@storybook/react";
import { BattleAnimation } from "./BattleAnimation";
import { useBattleEventStore } from "../../../store/BattleEventStore";
import { MonsterCard } from "../../../core/domain/Card";
import exemplo_comum from "@/assets/images/exemplo_comum.jpg";

const meta: Meta<typeof BattleAnimation> = {
  title: "Game/BattleAnimation",
  component: BattleAnimation,
  parameters: {
    layout: "fullscreen",
  },
};

export default meta;

const better = new MonsterCard(
  "1",
  "Patrulheiro Gárgula de Gelo",
  "Emmissão de sombras geladas, ele vigia fronteiras celestiais, lançando gelo que bloqueia invasores e fortalece aliados. Sua presença inspira coragem, e o eco de seu grito de gelo ressoa nas muralhas, formando escudos de pedra que refutam qualquer ataque.",
  exemplo_comum,
  "attack",
  "ice",
  2500,
  2100,
  7,
  "LEGENDARIO",
);
const lower = new MonsterCard(
  "1",
  "Patrulheiro Gárgula de Gelo",
  "Emmissão de sombras geladas, ele vigia fronteiras celestiais, lançando gelo que bloqueia invasores e fortalece aliados. Sua presença inspira coragem, e o eco de seu grito de gelo ressoa nas muralhas, formando escudos de pedra que refutam qualquer ataque.",
  exemplo_comum,
  "attack",
  "ice",
  2300,
  2100,
  7,
  "LEGENDARIO",
);


export const BattleCycle: StoryObj<typeof BattleAnimation> = {
  render: () => {
    const { setBattleData, battleData, clearBattleData } = useBattleEventStore();

    useEffect(() => {
      setBattleData({
        attacker: better,
        defender: lower,
      });

      const timer = setTimeout(() => {
        setBattleData({
        attacker: better,
        defender: null,
        });
        console.log("⚡ Alteração dupla aplicada!");
      }, 5000);

      return () => {
        clearTimeout(timer);
        clearBattleData();
      };
    }, []);

    return (
      <div style={{ width: "100vw", height: "100vh", background: "#1a1a1a" }}>
        <BattleAnimation />

        {!battleData && (
          <div style={{ color: "white", padding: "20px" }}>
            <p>Animação finalizada: battleData foi limpo pelo onAnimationEnd.</p>
            <button onClick={() => window.location.reload()}>Reiniciar Story</button>
          </div>
        )}
      </div>
    );
  },
};
