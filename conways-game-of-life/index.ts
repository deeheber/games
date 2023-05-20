const ROWS = process.env.ROWS ? parseInt(process.env.ROWS) : 3
const COLUMNS = process.env.COLUMNS ? parseInt(process.env.COLUMNS) : 3
const ROUNDS = process.env.ROUNDS ? parseInt(process.env.ROUNDS) : 1
const LIVE_CELLS = process.env.LIVE_CELLS
  ? parseInt(process.env.LIVE_CELLS)
  : -1

function createGrid(): string[][] {
  // Init grid of cells
  let liveCellCount = 0
  const grid = []
  for (let row = 0; row < ROWS; row++) {
    const currentRow = []
    for (let column = 0; column < COLUMNS; column++) {
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

  return grid
}

function transition(grid: string[][]) {
  // copy grid - we'll use this to traverse and reference neighbors
  const copy: string[][] = []
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
        [1, -1],
        [1, 0],
        [1, 1],
        [-1, -1],
        [-1, 0],
        [-1, 1],
      ]

      directions.forEach(([x, y]) => {
        const newX = row + x
        const newY = col + y
        // check if neighbor exists on the grid
        // prettier-ignore
        if (newX >= 0 && newX < ROWS && newY >= 0 && newY < COLUMNS) {
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

const grid = createGrid()

for (let counter = 0; counter < ROUNDS; counter++) {
  console.log('------------------------')
  console.log(`Round ${counter + 1}`)
  console.log(transition(grid))
  console.log('------------------------')
}

exports.createGrid = createGrid
exports.transition = transition
