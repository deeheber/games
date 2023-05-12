import inquirer from 'inquirer'
import chalk from 'chalk'
import { getComputerChoice, calculateWinner } from './utils.js'
;(async function main() {
  const score = { computer: 0, user: 0, tie: 0 }
  let rounds = 0
  let prompt
  let computer

  do {
    prompt = await inquirer.prompt([
      {
        type: 'list',
        name: 'user',
        message: 'What will it be?',
        choices: ['rock', 'paper', 'scissors'],
      },
    ])

    const { user } = prompt
    computer = getComputerChoice()
    const winner = calculateWinner(user, computer)

    score[winner]++
    rounds++

    prompt = await inquirer.prompt([
      {
        type: 'confirm',
        name: 'playAgain',
        message: 'Would you like to play again?',
        default: true,
      },
    ])
  } while (prompt.playAgain)

  console.log('----------------------')
  console.log('Thanks for playing!')
  console.log('----------------------')
  console.log(`Computer: ${score.computer}`)
  console.log(`You: ${score.user}`)
  console.log(`Tie: ${score.tie}`)
  console.log(`Total rounds played: ${rounds}`)
  console.log('----------------------')

  if (score.user > score.computer) {
    console.log(chalk.green('Congratulations, you won overall!'))
  }

  if (score.computer > score.user) {
    console.log(
      chalk.red('Sorry, the computer beat you. Better luck next time.')
    )
  }

  if (score.computer === score.user) {
    console.log(chalk.yellow('It was a tie overall.'))
  }
})()
