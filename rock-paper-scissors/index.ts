import { select, confirm } from '@inquirer/prompts'
import { styleText } from 'node:util'
import { getComputerChoice, calculateWinner } from './utils.js'
;(async function main() {
  const score = { computer: 0, user: 0, tie: 0 }
  let rounds = 0
  let playAgain

  do {
    const user = await select({
      message: 'What will it be?',
      choices: [
        { value: 'rock' as const },
        { value: 'paper' as const },
        { value: 'scissors' as const },
      ],
    })

    const computer = getComputerChoice()
    const winner = calculateWinner(user, computer)

    score[winner]++
    rounds++

    playAgain = await confirm({
      message: 'Would you like to play again?',
      default: true,
    })
  } while (playAgain)

  console.log('----------------------')
  console.log('Thanks for playing!')
  console.log('----------------------')
  console.log(`Computer: ${score.computer}`)
  console.log(`You: ${score.user}`)
  console.log(`Tie: ${score.tie}`)
  console.log(`Total rounds played: ${rounds}`)
  console.log('----------------------')

  if (score.user > score.computer) {
    console.log(styleText('green', 'Congratulations, you won overall!'))
  }

  if (score.computer > score.user) {
    console.log(
      styleText('red', 'Sorry, the computer beat you. Better luck next time.')
    )
  }

  if (score.computer === score.user) {
    console.log(styleText('yellow', 'It was a tie overall.'))
  }
})()
