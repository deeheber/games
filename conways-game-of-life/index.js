const ROW = parseInt(process.env.ROW) || 3
const COLUMN = parseInt(process.env.COLUMN) || 3
const ROUNDS = parseInt(process.env.ROUNDS) || 1
const LIVE_CELLS = parseInt(process.env.LIVE_CELLS) || -1

// Init grid of cells
let liveCellCount = 0
const grid = []
for (let row = 0; row <= ROW; row++) {
  const currentRow = []
  for (let column = 0; column <= COLUMN; column++) {
    if (LIVE_CELLS === -1) {
      // init to all alive cells
      currentRow.push('*')
    } else if (liveCellCount < LIVE_CELLS) {
      currentRow.push('*')
      liveCellCount += 1
    } else {
      currentRow.push('-')
    }
  }

  grid.push(currentRow)
}

console.log('------------------------')
console.log(`Starting grid`)
console.log(grid)

function transition(grid) {
  // copy grid - we'll use this to traverse and reference neighbors
  const copy = []
  for (let i = 0; i < grid.length; i++) {
    copy[i] = grid[i].slice()
  }

  // loop through copy > check neighbors
  for (let row = 0; row < copy.length; row++) {
    for (let col = 0; col < copy[0].length; col++) {
      let liveNeighbors = 0
      const directions = [
        [0, -1],
        [0, 1],
        [1, 1],
        [-1, -1],
        [-1, 0],
        [1, 0],
        [1, -1],
        [-1, 1],
      ]

      directions.forEach(([x, y]) => {
        const newX = row + x
        const newY = col + y
        // check if neighbor exists on the grid
        // prettier-ignore
        if (newX >= 0 && newX <= ROW && newY >= 0 && newY <= COLUMN) {
          const neighbor = copy[newX][newY]
          if (neighbor === '*') {
            // live neigbor count it
            liveNeighbors += 1
          }
        }
      })

      if (liveNeighbors < 2) {
        // dies
        grid[row][col] = '-'
      } else if (liveNeighbors === 2 || liveNeighbors === 3) {
        // lives
        grid[row][col] = '*'
      } else if (liveNeighbors > 3) {
        // dies
        grid[row][col] = '-'
      }
    }
  }

  return grid
}

for (let counter = 0; counter < ROUNDS; counter++) {
  console.log('------------------------')
  console.log(`Round ${counter + 1}`)
  console.log(transition(grid))
  console.log('------------------------')
}
