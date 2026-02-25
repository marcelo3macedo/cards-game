# 🃏 Card Game Project

A strategic digital card game inspired by classic monster card battles, featuring turn-based combat, intelligent AI opponents, and an extensible plugin system for additional content.

🔗 **Live Demo**
https://cardgame.alemdoscript.com.br/

🔗 **Storybook (UI & Scenarios)**
https://storybook-cardgame.alemdoscript.com.br/

---

## 📖 Overview

This project is a modern card battle game inspired by *Yu-Gi-Oh!*, focused on tactical decision-making, card positioning, and animated battles. Players collect cards, manage their personal library, and face AI-controlled opponents in intense duels.

The architecture is modular and extensible, allowing new cards, mechanics, and scenarios to be added through plugins.

---

## 🎮 Main Features

### 🏠 Main Screens
- **Home Screen** – Main entry point to the game
- **User Library** – View, manage, and organize owned cards
- **Help / FAQ Screen** – Game rules and mechanics
- **Battle Screens** – Full duel experience with animations

---

### ⚔️ Battle System
- Monster card battles with **Attack** and **Defense** modes
- Card positioning:
  - Attack Mode
  - Defense Mode
  - Face-down cards
- **AI-controlled opponent**
- Core actions:
  - Attack enemy cards
  - Defend and reposition cards
  - Draw cards from the deck
  - Activate magic cards
  - Direct attacks on player life points
- Animated battle resolution
- Life points system

---

### 🧠 Artificial Intelligence
- Enemy logic includes:
  - Choosing between card attacks and direct player attacks
  - Changing card positions strategically
  - Activating magic card effects
- Context-aware decisions based on the current board state

---

### 🧩 Plugin System
- Support for **additional content via plugins**
- Easily extend the game with:
  - New cards
  - New effects
  - Custom rules
  - Extra battle scenarios
- Designed for scalability and future expansions

---

## 📚 Storybook Scenarios

The project includes a full Storybook setup for UI components and gameplay simulations.

### ⚔️ Attack Scenarios
- AttackSimulation
- Attack Vs Attack Wins
- Attack Vs Attack Loses

---

### 🐲 Summon Scenarios
- Successful Attack Mode Summon
- Successful Defense Mode Summon
- Successful Face Down Attack Mode Summon
- Successful Face Down Defense Mode Summon

---

### 👹 Villain Actions
- Attack Player Direct
- Attack Player In Attack Mode And Wins
- Attack Player In Defense Mode And Wins
- Change Card Position
- Magic Card Effect

---

### 🧩 UI & Gameplay Components
- AbandonBattleModal
- ActiveFieldIndicator
- BattleAnimation
- BattleAnimationOverlay
- BattleScenario
- BoardGutter
- BoardSide
- Card
- FieldZone
- FieldZoneMenu
- GameBoard
- LifePoints
- OpponentHand
- PlayerHand
- SummonOverlay
- WelcomeScenario

---

## 🛠️ Architecture & Design

- Component-driven architecture
- Storybook for UI documentation and simulations
- Modular battle engine
- Plugin-based extensibility
- Designed for maintainability and long-term evolution

---

## 🚀 Future Improvements

- Advanced deck builder
- New card types and effects
- Multiple AI difficulty levels
- Sound effects and background music

---

## 🎴 Inspiration

Inspired by classic monster card games like **Yu-Gi-Oh!**, reimagined with a modern web-based architecture and extensibility at its core.

---

## 📄 License

This project is licensed under the MIT License.
