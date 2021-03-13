const { isBoardFull, checkForWinner } = require('./utils');

const board = [
  ['', '', ''], 
  ['', '', ''], 
  ['', '', '']
];

let turn = 'X';

// Board to log out
// console.log(' 1 | 2 | 3');
// console.log('-----------');
// console.log(' 4 | 5 | 6');
// console.log('-----------');
// console.log(' 7 | 8 | 9');

// General flow
// Initalize state
// While the board is not full
  // Player puts down piece
  // Check winner
    // If they won end > print winner
    // If they didn't win
    // Next turn
// Print tie
