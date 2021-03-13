const { isBoardFull, checkForWinner } = require('./utils');

describe('checkForWinner', () => {
  it('winner found 1', () => {
    const board1 = [
      ['X', 'X', 'X'], 
      ['', '', ''], 
      ['O', 'O', '']
    ];
    const first = checkForWinner('X', board1);

    expect(first).toEqual(true);
  });

  it('winner found 2', () => {
    const board2 = [
      ['O', 'X', ''], 
      ['', 'O', ''], 
      ['X', '', 'O']
    ];
    const second = checkForWinner('O', board2);

    expect(second).toEqual(true);
  });

  it('winner found 3', () => {
    const board3 = [
      ['O', '', 'X'], 
      ['O', '', 'X'], 
      ['', '', 'X']
    ];
    const third = checkForWinner('X', board3);

    expect(third).toEqual(true);
  });

  it('winner not found 1', () => {
    const board1 = [
      ['X', 'X', 'X'], 
      ['', '', ''], 
      ['O', 'O', '']
    ];
    const first = checkForWinner('O', board1);

    expect(first).toEqual(false);
  });

  it('winner not found 2', () => {
    const board1 = [
      ['X', 'X', ''], 
      ['', 'X', ''], 
      ['O', 'O', '']
    ];
    const first = checkForWinner('X', board1);

    expect(first).toEqual(false);
  });

  it('winner not found 3', () => {
    const board1 = [
      ['', '', ''], 
      ['', 'O', ''], 
      ['', '', '']
    ];
    const first = checkForWinner('X', board1);

    expect(first).toEqual(false);
  });

  it('errors when player is not X nor O', () => {
    try {
      checkForWinner('T', 'something');
    } catch (err) {
      expect(err.message).toEqual('Invalid player: T');
    }
  });
});

describe('isBoardFull', () => {
  it('board is full', () => {
    const board = [
      ['O', 'X', 'X'], 
      ['O', 'O', 'X'], 
      ['X', 'X', 'O']
    ];

    expect(isBoardFull(board)).toEqual(true);
  });

  it('board is empty', () => {
    const board = [
      ['', '', ''], 
      ['', '', ''], 
      ['', '', '']
    ];

    expect(isBoardFull(board)).toEqual(false);
  });

  it('board is partially full', () => {
    const board = [
      ['X', 'O', ''], 
      ['O', '', ''], 
      ['', 'X', 'X']
    ];

    expect(isBoardFull(board)).toEqual(false);
  });
});