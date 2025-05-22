# Blackjack Card Game (TypeScript)

A simple command-line Blackjack (21) game written in TypeScript using Node.js.

---

## Table of Contents

- [Project Description](#project-description)  
- [Game Rules](#game-rules)  
- [How to Run](#how-to-run)  
- [Technologies](#technologies)  
- [Features](#features)  
- [Gameplay Examples](#gameplay-examples)  
- [Author](#author)  

---

## Project Description

This is a simplified version of Blackjack with no options like splitting, doubling down, or surrendering. The player can only choose to "hit" (take a card) or "stand" (stop). The goal is to get as close to 21 as possible without going over.

---

## Game Rules

- Uses a standard 52-card deck.  
- Number cards (2-10) are worth their face value.  
- Jack, Queen, King are worth 10.  
- Ace can be worth 1 or 11, whichever benefits the player more.  
- Player starts with $100 bankroll.  
- Before each round, player places a bet.  
- Player and dealer are dealt two cards each; dealer’s second card is hidden.  
- If player gets Blackjack (Ace + 10-value card) initially, they win 3:2 payout unless dealer also has Blackjack.  
- Player chooses to "hit" or "stand".  
- Dealer reveals hidden card after player stands and must hit until reaching 17 or more.  
- Winner is the one closest to 21 without busting.  
- Tie ("push") returns player's bet.

---

## How to Run

1. Clone the repository:  

    git clone <repository-url>

2. Install dependencies:  

    npm install

3. Start the game:  

    npm start


---

## Technologies

- TypeScript  
- Node.js  
- prompt-sync (for user input)

---

## Features

- Command-line interface gameplay.  
- Betting system with bankroll tracking.  
- Automatic card shuffling.  
- Player input for "hit" or "stand".  
- Correct hand value calculation including Ace flexibility.  
- Automated dealer play following standard Blackjack rules.  
- Outcome determination with win, loss, and push scenarios.

---

## Gameplay Examples

- Player wins by reaching 21.  
- Player gets Blackjack and wins 3:2 payout.  
- Player busts by going over 21.  
- Dealer busts and player wins.  
- Push (tie) returns player's bet.

---

## Author

Bogdan Ljubinković

