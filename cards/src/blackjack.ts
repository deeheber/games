import inquirer from 'inquirer'
import chalk from 'chalk'

import { Card, Deck } from './deck'

function calculateScore(hand: Card[]): number {
  const tens = 'JQK'
  let score = 0

  for (const card of hand) {
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
  }

  return score
}

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
    dealer.push(deck.drawCard())
  }

  /** Player turn */
  let playerScore: number
  while (true) {
    console.log(chalk.blue(`Your hand: ${JSON.stringify(player, null, 2)}`))

    const prompt = await inquirer.prompt([
      {
        type: 'confirm',
        name: 'hit',
        message: 'Would you like to hit?',
        default: true,
      },
    ])

    if (prompt.hit) {
      player.push(deck.drawCard())
    } else {
      // player chose to stay
      playerScore = calculateScore(player)
      break
    }

    // Calculate current player score
    const score = calculateScore(player)

    if (score > 21) {
      console.log(chalk.red(`You lose with score ${score}`))
      console.log(chalk.red(`Your hand: ${JSON.stringify(player, null, 2)}`))
      process.exit(0)
    }
  }

  console.log('playerScore', playerScore)
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
