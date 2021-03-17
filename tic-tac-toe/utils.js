function checkForWinner (played) {
  const winningCombos = [
    [1, 2, 3],
    [4, 5, 6],
    [7, 8, 9],
    [1, 4, 7],
    [2, 5, 8],
    [3, 6, 9],
    [1, 5, 9]
  ];
  let winner = false;

  winningCombos.forEach(([a, b, c]) => {
    if (played.has(a) && played.has(b) && played.has(c)) {
      winner = true;
    }
  });

  return winner;
}

function printBoard (board) {
  console.log(`
  ${board[0][0] || 1} | ${board[0][1] || 2} | ${board[0][2] || 3} 
  -----------
  ${board[1][0] || 4} | ${board[1][1] || 5} | ${board[1][2] || 6}
  -----------
  ${board[2][0] || 7} | ${board[2][1] || 8} | ${board[2][2] || 9}
`);
}

function validatePrompt (input, played) {
  // I didn't like inquirer's built in validator
  if (input > 9 || input < 1) {
    throw new Error('Number must be in range 1 - 9');
  }

  if (played['X'].has(input) || played['O'].has(input)) {
    throw new Error(`Square ${input} has already been played. Select another square`);
  }
}

module.exports = {
  checkForWinner,
  printBoard,
  validatePrompt
};