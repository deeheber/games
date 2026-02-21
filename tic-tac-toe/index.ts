import { number } from '@inquirer/prompts'
import { styleText } from 'node:util'
import { checkForWinner, printBoard, validatePrompt } from './utils.js'
;(async function main() {
  const numToArray: Record<number, Array<number>> = {
    1: [0, 0],
    2: [0, 1],
    3: [0, 2],
    4: [1, 0],
    5: [1, 1],
    6: [1, 2],
    7: [2, 0],
    8: [2, 1],
    9: [2, 2],
  }

  const board: string[][] = [
    ['', '', ''],
    ['', '', ''],
    ['', '', ''],
  ]

  let played: Record<string, Set<number>> = {
    X: new Set(),
    O: new Set(),
  }
  let currentPlayer = 'X'
  let winner: string | null = null
  let selection: number | undefined

  // TODO add a cool ascii art type of intro/instructions here
  console.log(styleText('blue', 'Welcome to tic-tac-toe.'))
  console.log(
    styleText('blue', 'Get three in a row across, up/down, or diagonal and you win!')
  )
  console.log(styleText('blue', 'Select 1 - 9 to get started'))

  do {
    printBoard(board)

    try {
      selection = await number({
        message: `Player ${currentPlayer}, please make your choice`,
      })

      validatePrompt(selection, played)
    } catch (err: any) {
      console.log(err.message)
      continue
    }

    // Mark square as played
    played[currentPlayer].add(selection!)
    const [x, y] = numToArray[selection!]
    board[x][y] = currentPlayer

    // Check to see if they won
    if (checkForWinner(played[currentPlayer])) {
      winner = currentPlayer
      break
    }

    // Switch to next player
    currentPlayer === 'X' ? (currentPlayer = 'O') : (currentPlayer = 'X')
  } while (played['X'].size + played['O'].size < 9)
  // TODO better print graphics here
  printBoard(board)

  if (winner) {
    console.log(styleText('green', `Winner is ${winner}`))
  } else {
    console.log(styleText('yellow', 'It was a tie!'))
  }
})()
