const { addPlayToBoard, checkForWinner } = require('./utils');

describe('addPlayToBoard', () => {
  // TODO add tests
});

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
