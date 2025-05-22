import { Card, Cards } from "./cards";

export class Game {
    private _playerFunds: number;
    public cards: Cards;


    constructor(playerFunds: number) {
        this._playerFunds = playerFunds
        this.cards = new Cards();
    }

    set playerFunds(funds: number) {
        this._playerFunds = funds
    }

    get playerFunds(): number {
        return this._playerFunds
    }

    start(): void {
        this.cards.createNewCards()
        for (const card of this.cards.cards) {
            console.log(`${card.symbol}${card.rank}\n`)
        }
    }
}