const symbols: readonly string[] = ["♠", "♥", "♦", "♣"];
const ranks: readonly string[] = ["2", "3", "4", "5", "6", "7", "8", "9", "10", "J", "Q", "K", "A"];

import { createHybridArray } from "./utils";

const symbolsRanks : string[] = createHybridArray(symbols, ranks)

//================================================================

import { determineValue } from "./utils";

export class Card {
    readonly value: number | number[]

    constructor(
        public readonly symbol: string,
        public readonly rank: string
    ) {
        this.value = determineValue(this.rank)
    }
}

export class Cards {
    public cards : Card[] = []

    createNewCards() : void {
        this.cards.length = 0
        for (const symbolRank of symbolsRanks) {
            const symbol = symbolRank[0]
            const rank = symbolRank.slice(1);

            this.cards.push(new Card(symbol, rank))
        }
    }
}
