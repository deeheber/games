import inquirer from 'inquirer'
import chalk from 'chalk'

import { Deck } from './deck'

async function main() {
  console.log(chalk.green('------ Starting the game ------'))

  const deck = new Deck()

  // Randomize the shuffle
  const numShuffle = Math.floor(Math.random() * 10) + 1
  for (let i = 0; i < numShuffle; i++) {
    deck.shuffle()
  }

  /* Init player + dealer hands
   * Deal 2 cards to player + dealer */
  const player = []
  const dealer = []

  for (let i = 0; i < 2; i++) {
    player.push(deck.drawCard())
  }

  for (let i = 0; i < 2; i++) {
    dealer.push(deck.drawCard())
  }

  /** Player turn */
  let continuePlayerTurn = true
  while (continuePlayerTurn) {
    console.log(chalk.blue(`Your hand: ${JSON.stringify(player, null, 2)}`))

    const prompt = await inquirer.prompt([
      {
        type: 'confirm',
        name: 'hit',
        message: 'Would you like to hit?',
        default: true,
      },
    ])

    // player chose to stay
    if (!prompt.hit) {
      continuePlayerTurn = false
      break
    }

    player.push(deck.drawCard())

    /* TODO put this in a seperate function to reuse for dealer score calculation */
    // Calculate current player score
    const tens = 'JQK'
    let score = 0

    for (const card of player) {
      /**
       * Appeasing TS
       * This won't happen bc we pull cards from the top
       */
      if (typeof card === 'number') {
        return
      }

      if (tens.includes(card.value)) {
        score += 10
      } else if (card.value === 'A') {
        // either 1 or 11
        const scoreWithEleven = score + 11
        if (scoreWithEleven > 21) {
          score += 1
        } else {
          score += 11
        }
      } else {
        score += Number(card.value)
      }

      if (score > 21) {
        console.log(chalk.red(`You lose with score ${score}`))
        console.log(chalk.red(`Your hand: ${JSON.stringify(player, null, 2)}`))
        continuePlayerTurn = false
      }
    }
  }
  /*
   * TODO: Dealer turn
   * Bust === true > game ends + dealer loses
   * Check for Blackjack
   * Hit or stay (automate)
   * Hit === true > draw card
   * Stay === true > dealer wins
   *
   * Output stats / winner
   */
}

main()
