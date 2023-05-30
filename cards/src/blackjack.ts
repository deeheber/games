import inquirer from 'inquirer'
import chalk from 'chalk'

import { Card, Deck } from './deck'

function calculateScore(hand: Card[]): number {
  const tens = 'JQK'
  let score = 0
  let numAces = 0

  for (const card of hand) {
    if (tens.includes(card.value)) {
      score += 10
    } else if (card.value === 'A') {
      numAces++
      // Aces are worth 1 by default
      score += 1
    } else {
      score += Number(card.value)
    }
  }

  // Add aces
  for (let i = 0; i < numAces; i++) {
    if (score + 10 <= 21) {
      // Add 10 if it doesn't bust
      // Makes the Ace worth 11
      score += 10
    }
  }

  return score
}

async function main() {
  console.log(chalk.yellow('------ Starting the game ------'))

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
  let playerScore: number = calculateScore(player)
  while (true) {
    console.log('Your score: ', playerScore)
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
    playerScore = calculateScore(player)

    if (playerScore > 21) {
      console.log(chalk.red(`You bust with score ${playerScore}`))
      console.log(chalk.red(`Your hand: ${JSON.stringify(player, null, 2)}`))
      process.exit(0)
    }
  }

  console.log('-----------------------------------')
  console.log('Your score: ', playerScore)
  console.log(chalk.blue(`Your hand: ${JSON.stringify(player, null, 2)}`))
  console.log('-----------------------------------')
  console.log(chalk.yellow('Dealer turn'))

  /** Dealer turn */
  let dealerScore: number = calculateScore(dealer)
  while (true) {
    console.log(chalk.yellow(`Dealer hand: ${JSON.stringify(dealer, null, 2)}`))

    if (dealerScore <= playerScore) {
      // Dealer hits
      dealer.push(deck.drawCard())
    } else {
      // dealer chose to stay + wins
      dealerScore = calculateScore(dealer)
      break
    }

    // Calculate dealer current score
    dealerScore = calculateScore(dealer)

    if (dealerScore > 21) {
      console.log('-----------------------------------')
      console.log(chalk.red(`Dealer busts with score ${dealerScore}`))
      console.log(chalk.green(`Player wins with score ${playerScore}`))
      console.log('-----------------------------------')
      console.log(chalk.red(`Dealer hand: ${JSON.stringify(dealer, null, 2)}`))
      console.log(
        chalk.green(`Player hand: ${JSON.stringify(player, null, 2)}`)
      )
      console.log('-----------------------------------')
      process.exit(0)
    }
  }

  console.log('-----------------------------------')
  console.log(chalk.green(`Dealer wins with score ${dealerScore}`))
  console.log(chalk.red(`Player loses with score ${playerScore}`))
  console.log('-----------------------------------')
  console.log(chalk.green(`Dealer hand: ${JSON.stringify(dealer, null, 2)}`))
  console.log(chalk.red(`Player hand: ${JSON.stringify(player, null, 2)}`))
  console.log('-----------------------------------')
}

main()
