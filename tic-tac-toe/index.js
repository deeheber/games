const inquirer = require('inquirer');
const { addPlayToBoard, checkForWinner, validatePrompt } = require('./utils');

(async function main () {
  const board = [
    ['', '', ''],
    ['', '', ''],
    ['', '', '']
  ];

  // TODO see if I can just refer to the board to see what squares have been played
  let played = [];
  let turn = 'X';
  let winner = false;
  let prompt;
  
  // TODO add a cool ascii art type of intro/instructions here
  console.log('Welcome to tic-tac-toe.');
  console.log(' 1 | 2 | 3');
  console.log('-----------');
  console.log(' 4 | 5 | 6');
  console.log('-----------');
  console.log(' 7 | 8 | 9');

  do {
    // TODO nicely print the board here
    console.log('testing ', board);

    try {
      prompt = await inquirer
        .prompt([{
          type: 'number',
          name: 'selection',
          message: `Player ${turn}, please make your choice`,
        }]);

      validatePrompt(prompt.selection, played);
    } catch (err) {
      console.log(err.message);
      continue;
    }

    // mark square as played
    played.push(prompt.selection);
    // TODO error handling
    const { x, y } = addPlayToBoard(prompt.selection, board);
    board[x][y] = turn;

    // check to see if they won
    if (checkForWinner(turn, board)) {
      winner = turn;
      break;
    }

    // switch turn to next player
    if (turn === 'X') {
      turn = 'O';
    } else if (turn === 'O') {
      turn = 'X';
    } else {
      throw new Error(`Invalid turn type: ${turn}`);
    }
  } while (played.length < 9);
  // TODO better logging graphics
  console.log('game over board ', board);
  if (winner) {
    console.log(`Winner is ${winner}`);
  } else {
    console.log('It was a tie!');
  }
})()
