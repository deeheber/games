global.console = { ...global.console, log: jest.fn() }

describe("Conway's Game of Life", () => {
  const env = process.env

  beforeEach(() => {
    jest.resetModules()
    process.env = { ...env }
  })

  afterEach(() => {
    process.env = env
  })

  describe('createGrid', () => {
    it('should create a grid', () => {
      const myModule = require('./index')
      const grid = myModule.createGrid()

      expect(grid).toEqual([
        ['*', '*', '*'],
        ['*', '*', '*'],
        ['*', '*', '*'],
      ])
    })

    it('should create a grid with 10 rows and 7 columns', () => {
      process.env.ROWS = '10'
      process.env.COLUMNS = '7'

      const myModule = require('./index')
      const grid = myModule.createGrid()

      expect(grid).toEqual([
        ['*', '*', '*', '*', '*', '*', '*'],
        ['*', '*', '*', '*', '*', '*', '*'],
        ['*', '*', '*', '*', '*', '*', '*'],
        ['*', '*', '*', '*', '*', '*', '*'],
        ['*', '*', '*', '*', '*', '*', '*'],
        ['*', '*', '*', '*', '*', '*', '*'],
        ['*', '*', '*', '*', '*', '*', '*'],
        ['*', '*', '*', '*', '*', '*', '*'],
        ['*', '*', '*', '*', '*', '*', '*'],
        ['*', '*', '*', '*', '*', '*', '*'],
      ])
    })

    it('should create a grid with 2 rows and 2 columns and 1 live cell', () => {
      process.env.ROWS = '2'
      process.env.COLUMNS = '2'
      process.env.LIVE_CELLS = '1'

      const myModule = require('./index')
      const grid = myModule.createGrid()

      expect(grid).toEqual([
        ['*', '-'],
        ['-', '-'],
      ])
    })
  })

  describe('transition', () => {
    it('should transition a 3x3 grid', () => {
      const myModule = require('./index')
      const grid = myModule.createGrid()
      const newGrid = myModule.transition(grid)

      expect(newGrid).toEqual([
        ['*', '-', '*'],
        ['-', '-', '-'],
        ['*', '-', '*'],
      ])
    })

    it('should transition a 5x7 grid with 15 live cells', () => {
      process.env.ROWS = '5'
      process.env.COLUMNS = '7'
      process.env.LIVE_CELLS = '15'

      const myModule = require('./index')
      const grid = myModule.createGrid()
      const newGrid = myModule.transition(grid)

      expect(newGrid).toEqual([
        ['*', '-', '-', '-', '-', '-', '*'],
        ['-', '-', '-', '-', '-', '-', '*'],
        ['*', '-', '*', '*', '*', '*', '*'],
        ['-', '-', '-', '-', '-', '-', '-'],
        ['-', '-', '-', '-', '-', '-', '-'],
      ])
    })
  })
})
