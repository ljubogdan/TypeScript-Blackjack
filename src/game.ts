import { Card, Cards } from "./cards";
import { shuffleArray } from "./utils";
import PromptSync from "prompt-sync";

export enum Status {
    Win,
    Loss,
    Draw,
    NoFunds,
    Blackjack
}

type person = "player" | "dealer"
type action = "hit" | "stand"

const prompt = PromptSync()

export class Game {
    private _playerFunds: number;
    public playerBet: number;
    public cards: Cards;

    public playersCards: Card[];
    public dealersCards: Card[];

    public playerTotal: number;
    public dealerTotal: number;


    constructor(playerFunds: number) {
        this._playerFunds = playerFunds
        this.playerBet = 0
        this.cards = new Cards()

        this.playersCards = []
        this.dealersCards = []

        this.playerTotal = 0
        this.dealerTotal = 0
    }

    set playerFunds(funds: number) {
        this._playerFunds = funds
    }

    get playerFunds(): number {
        return this._playerFunds
    }

    calculateTotal(x: person): void {
        if (x === "player") {
            this.playerTotal = 0
            let acesAdded = 0
            for (const card of this.playersCards) {
                if (Array.isArray(card.value)) {
                    acesAdded += 1
                    this.playerTotal += 11
                } else {
                    this.playerTotal += card.value
                }
            } // subtract 10 for every ace thats over 21
            while (this.playerTotal > 21 && acesAdded > 0) {
                this.playerTotal -= 10
                acesAdded -= 1
            } 
        } else {
            this.dealerTotal = 0
            let acesAdded = 0
            for (const card of this.dealersCards) {
                if (Array.isArray(card.value)) {
                    acesAdded += 1
                    this.dealerTotal += 11
                } else {
                    this.dealerTotal += card.value
                }
            }
            while (this.dealerTotal > 21 && acesAdded > 0) {
                this.dealerTotal -= 10
                acesAdded -= 1
            } 
        }
    }

    givePlayer() { // pick a random card from deck and give player
        const randomCard = this.cards.cards[Math.floor(Math.random() * this.cards.cards.length)];
        this.playersCards.push(randomCard)
        const index = this.cards.cards.indexOf(randomCard)
        if (index > -1) this.cards.cards.splice(index, 1)
    }

    giveDealer() { // pick a random card from deck and give dealer
        const randomCard = this.cards.cards[Math.floor(Math.random() * this.cards.cards.length)];
        this.dealersCards.push(randomCard)
        const index = this.cards.cards.indexOf(randomCard)
        if (index > -1) this.cards.cards.splice(index, 1)
    }

    betting(): void {
        console.log(`Player's funds: $${this._playerFunds}`)

        while (true) {
            const bet = prompt("Enter your bet: ")
            const betNumber = Number(bet.slice(1))
            if (betNumber > this._playerFunds) {
                continue
            } else {
                this.playerBet = betNumber
                this._playerFunds -= betNumber
                break
            }
        }
    }

    start(): Status {
        if (this._playerFunds === 0) return Status.NoFunds;

        this.cards.createNewCards()
        shuffleArray(this.cards.cards)

        this.betting()
        // ==============================================================
        
        for (let i = 0; i < 2; i++) {
            this.givePlayer()
            this.giveDealer()
        }

        this.calculateTotal("player")
        this.calculateTotal("dealer")

        console.log(`Your hand: ${this.playersCards.map(card => `${card.rank}${card.symbol}`).join(", ")} (Total: ${this.playerTotal})`);
        console.log(`Dealer's hand: ${this.dealersCards[0].rank}${this.dealersCards[0].symbol}, [hidden]`)
        
        while (true) {
            let action = prompt("Your action (hit/stand): ")
            if (action === "stand") break
            this.givePlayer()
            this.calculateTotal("player")
            console.log(`Your hand: ${this.playersCards.map(card => `${card.rank}${card.symbol}`).join(", ")} (Total: ${this.playerTotal})`);
            if (this.playerTotal > 21) return Status.Loss
        }

        this.calculateTotal("dealer")
        console.log(`Dealer's hand: ${this.dealersCards.map(card => `${card.rank}${card.symbol}`).join(", ")} (Total: ${this.dealerTotal})`);

        if (this.playerTotal === 21 && this.dealerTotal !== 21) return Status.Blackjack
        else if (this.playerTotal === 21 && this.dealerTotal === 21) return Status.Draw
        while (this.dealerTotal < 17) { // wont happen if 17 and above
            console.log("Dealer hits!")
            this.giveDealer()
            this.calculateTotal("dealer")
            console.log(`Dealer's hand: ${this.dealersCards.map(card => `${card.rank}${card.symbol}`).join(", ")} (Total: ${this.dealerTotal})`);
            if (this.dealerTotal > 21) {
                console.log("Dealer busts!")
                return Status.Win
            }
        }

        if (this.playerTotal > this.dealerTotal) return Status.Win
        else if (this.playerTotal === this.dealerTotal) return Status.Draw
        else return Status.Loss
    }

    restart() { // sets game fresh
        this.playerBet = 0

        this.playerTotal = 0
        this.dealerTotal = 0
        this.playersCards.length = 0
        this.dealersCards.length = 0
    }
}