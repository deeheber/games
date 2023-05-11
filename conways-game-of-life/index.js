/**
 * 1. setup 2d grid
 * 2. init the values in the grid (can be random)
 * 3. funciton takes in grid
 *  - copy grid
 *  - traverse grid and determine if cell is live or dead at the end of the round
 *  - return grid
 *
 * alive > *
 * dead > -
 */
const ROW = 3;
const COLUMN = 3;
// Init grid of cells
const grid = [];
for (let row = 0; row <= 3; row++) {
  const currentRow = [];
  for (let column = 0; column <= 3; column++) {
    currentRow.push("*");
  }

  grid.push(currentRow);
}

function transition(grid) {
  // copy grid - we'll use this to traverse and reference neighbors
  const copy = [];

  for (let i = 0; i < grid.length; i++) {
    copy[i] = grid[i].slice();
  }

  // loop through copy > check neighbors
  /**
   * - Any live cell at time T with < 2 live neighbors dies (by underpopulation)
   * - Any live cell at time T  with exactly 2 or 3 live neighbors survives
   * - Any live cell at time T with > 3 live neighbors dies (by overpopulation)
   * - Any dead cell with exactly 3 live neighbors becomes alive (by reproduction)
   */

  for (let row = 0; row < copy.length; row++) {
    for (let col = 0; col < copy[0].length; col++) {
      let liveNeighbors = 0;
      const directions = [
        [0, -1],
        [0, 1],
        [1, 1],
        [-1, -1],
        [-1, 0],
        [1, 0],
        [1, -1],
        [-1, 1],
      ];

      directions.forEach(([x, y]) => {
        const newX = row + x;
        const newY = col + y;
        // check if neighbor exists on the grid
        // prettier-ignore
        if (newX >= 0 && newX <= ROW && newY >= 0 && newY <= COLUMN) {
          const neighbor = copy[newX][newY]
          if (neighbor === '*') {
            // live neigbor count it
            liveNeighbors += 1
          }
        }
      });
      // TODO
      // less than 2 dies (-)
      // 2 or 3 (*)
      // greater than 3 (-)
      // exactly 3 (*)
      console.log(liveNeighbors);
    }
  }

  // return grid
}

console.log(transition(grid));
