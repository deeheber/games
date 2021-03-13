function isBoardFull (board) {
  for (let x = 0; x < board.length; x++) {
    for (let y = 0; y < board[0].length; y++) {
      if (board[x][y] === '') {
        return false;
      }
    }
  }

  return true;
}

function checkForWinner (player, board) {
  /**
   * Potential future improvement
   * Could refactor to memoize the played squares
   * so we won't have to traverse the entire 2d 
   * array each time.
   */
  if (player !== 'X' && player !== 'O') {
    throw new Error(`Invalid player: ${player}`);
  }
  const played = [];
  let counter = 1;

  for (let x = 0; x < board.length; x++) {
    for (let y = 0; y < board[0].length; y++) {
      if (board[x][y] === player) {
        played.push(counter);
      }
      counter++
    }
  }

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
    if (played.includes(a) && played.includes(b) && played.includes(c)) {
      winner = true;
    }
  });

  return winner;
}

module.exports = {
  isBoardFull,
  checkForWinner
};