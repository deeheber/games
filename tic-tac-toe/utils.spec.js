const { checkForWinner, printBoard, validatePrompt } = require('./utils')

describe('checkForWinner', () => {
  let played
  beforeEach(() => {
    played = { X: new Set(), O: new Set() }
  })

  it('Declares X as the winner', () => {
    played['X'].add(1)
    played['X'].add(2)
    played['X'].add(3)

    expect(checkForWinner(played['X'])).toBe(true)
  })

  it('Declares O as the winner', () => {
    played['O'].add(1)
    played['O'].add(7)
    played['O'].add(4)

    expect(checkForWinner(played['O'])).toBe(true)
  })

  it('Declares O has not won (yet)', () => {
    played['O'].add(1)
    played['O'].add(9)
    played['X'].add(4)

    expect(checkForWinner(played['O'])).toBe(false)
  })

  it('Declares X has not won (yet)', () => {
    played['X'].add(1)
    played['X'].add(2)
    played['O'].add(9)
    played['X'].add(4)

    expect(checkForWinner(played['X'])).toBe(false)
  })
})

describe('printBoard', () => {
  beforeEach(() => {
    console.log = jest.fn()
  })

  it('Prints empty board', () => {
    const board = [
      ['', '', ''],
      ['', '', ''],
      ['', '', ''],
    ]

    printBoard(board)

    expect(console.log).toHaveBeenCalledWith(`
    1 | 2 | 3
    -----------
    4 | 5 | 6
    -----------
    7 | 8 | 9
  `)
  })

  it('Prints full board', () => {
    const board = [
      ['H', 'I', '.'],
      ['T', 'H', 'E'],
      ['R', 'E', '!'],
    ]

    printBoard(board)

    expect(console.log).toHaveBeenCalledWith(`
    H | I | .
    -----------
    T | H | E
    -----------
    R | E | !
  `)
  })

  it('Prints partially full board', () => {
    const board = [
      ['X', '', 'O'],
      ['', 'X', 'O'],
      ['', '', 'X'],
    ]

    printBoard(board)

    expect(console.log).toHaveBeenCalledWith(`
    X | 2 | O
    -----------
    4 | X | O
    -----------
    7 | 8 | X
  `)
  })
})

describe('validatePrompt', () => {
  const played = { X: new Set(), O: new Set() }

  it('Passes validation', () => {
    expect(() => validatePrompt(6, played)).not.toThrow()
  })

  it('Errors on high number', () => {
    expect(() => validatePrompt(20, played)).toThrow(
      'Number must be in range 1 - 9'
    )
  })

  it('Errors on low number', () => {
    expect(() => validatePrompt(-1, played)).toThrow(
      'Number must be in range 1 - 9'
    )
  })

  it('Errors on played square', () => {
    played['X'].add(1)
    expect(() => validatePrompt(1, played)).toThrow(
      'Square 1 has already been played. Select another square'
    )
  })
})
