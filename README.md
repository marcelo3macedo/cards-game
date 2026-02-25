🃏 Card Game Project

A strategic digital card game inspired by classic monster card battles, featuring turn-based combat, intelligent AI opponents, and an extensible plugin system for additional content.

🔗 Live Demo:
https://cardgame.alemdoscript.com.br/

🔗 Storybook (UI & Scenarios):
https://storybook-cardgame.alemdoscript.com.br/

📖 Overview

This project is a modern card battle game inspired by Yu-Gi-Oh!, focused on tactical decision-making, card positioning, and animated battles. Players collect cards, build their library, and face AI-controlled opponents in intense duels.

The architecture is designed to be modular, allowing new cards, mechanics, and scenarios to be added through plugins.

🎮 Main Features
🏠 Main Screens

Home Screen – Entry point to the game and battles

User Library – Manage collected cards and decks

Help / FAQ Screen – Game rules and mechanics explanation

Battle Screens – Full duel interface with animations and interactions

⚔️ Battle System

Monster card battles with attack and defense modes

Card positioning (Attack / Defense / Face-down)

AI-controlled opponent

Core actions:

Attack enemy cards

Defend and change card positions

Draw cards

Activate magic cards

Direct attacks on player life points

Animated battle resolution

Life points system

🧠 Artificial Intelligence

Enemy decision-making for:

Attacking cards or the player directly

Changing card positions

Activating magic card effects

Context-aware actions based on board state

🧩 Plugin System

Support for additional content via plugins

Add new:

Cards

Effects

Rules

Battle scenarios

Designed for scalability and future expansions

📚 Storybook Scenarios

The project includes a complete Storybook setup for UI components and battle simulations.

⚔️ Attack Scenarios

AttackSimulation

Attack vs Attack (Wins)

Attack vs Attack (Loses)

🐲 Summon Scenarios

Successful Attack Mode Summon

Successful Defense Mode Summon

Successful Face-Down Attack Mode Summon

Successful Face-Down Defense Mode Summon

👹 Villain Actions

Attack Player Directly

Attack Player in Attack Mode and Wins

Attack Player in Defense Mode and Wins

Change Card Position

Magic Card Effect

🧩 UI & Gameplay Components

AbandonBattleModal

ActiveFieldIndicator

BattleAnimation

BattleAnimationOverlay

BattleScenario

BoardGutter

BoardSide

Card

FieldZone

FieldZoneMenu

GameBoard

LifePoints

OpponentHand

PlayerHand

SummonOverlay

WelcomeScenario

🛠️ Technologies & Architecture

Component-driven architecture

Storybook for UI documentation and simulations

Modular battle engine

Extensible plugin-based design

Focus on maintainability and scalability

🚀 Future Improvements

Online multiplayer mode

Ranked matches

Deck builder with advanced filters

New card types and effects

More AI difficulty levels

Sound effects and music

📜 Inspiration

This project is inspired by classic monster card games like Yu-Gi-Oh!, reimagined with a modern web-based architecture and extensibility in mind.

📄 License

This project is licensed under the MIT License.
