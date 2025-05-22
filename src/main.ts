import { Game, Status } from './game'

function main() {
    const game = new Game(100)

    whileloop:
    while (true) {
        let result = game.start() 

        switch(result) {
            case Status.Blackjack:
                console.log("Blackjack!")
                game.playerFunds += game.playerBet * 1.5
                break
            case Status.Win:
                console.log("Player wins!")
                game.playerFunds += game.playerBet * 2
                break
            case Status.Loss:
                console.log("Dealer wins!")
                break
            case Status.Draw:
                console.log("Draw!")
                game.playerFunds += game.playerBet
                break
            case Status.NoFunds:
                console.log("No funds!")
                break whileloop
        }

        console.log()
        game.restart()
    }

    console.log("Thanks for playing!")
}

main()