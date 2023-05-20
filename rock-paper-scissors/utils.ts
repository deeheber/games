import chalk from 'chalk'

type Choice = 'rock' | 'paper' | 'scissors'

function getComputerChoice(): Choice {
  // random number between 0 - 2
  const randomNum = Math.floor(Math.random() * Math.floor(3))

  switch (randomNum) {
    case 0:
      return 'rock'
    case 1:
      return 'paper'
    default:
      return 'scissors'
  }
}

function calculateWinner(
  user: Choice,
  computer: Choice
): 'user' | 'computer' | 'tie' {
  console.log(`You picked: ${user}`)
  console.log(`Computer picked: ${computer}`)

  if (user === 'rock') {
    if (computer === 'rock') {
      console.log(chalk.yellow("It's a tie!"))
      return 'tie'
    }

    if (computer === 'paper') {
      console.log(chalk.red('Paper covers rock.'))
      return 'computer'
    }

    if (computer === 'scissors') {
      console.log(chalk.green('Rock smashes scissors.'))
      return 'user'
    }
  }

  if (user === 'scissors') {
    if (computer === 'scissors') {
      console.log(chalk.yellow("It's a tie!"))
      return 'tie'
    }

    if (computer === 'paper') {
      console.log(chalk.green('Scissors cuts paper.'))
      return 'user'
    }

    if (computer === 'rock') {
      console.log(chalk.red('Rock smashes scissors.'))
      return 'computer'
    }
  }

  if (user === 'paper') {
    if (computer === 'paper') {
      console.log(chalk.yellow("It's a tie!"))
      return 'tie'
    }

    if (computer === 'rock') {
      console.log(chalk.green('Paper covers rock.'))
      return 'user'
    }

    if (computer === 'scissors') {
      console.log(chalk.red('Scissors cuts paper.'))
      return 'computer'
    }
  }

  throw new Error('Unrecognized choice.')
}

export { getComputerChoice, calculateWinner }
