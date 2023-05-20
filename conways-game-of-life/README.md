# Conway's Game of Life

## How to play the game

This is a code recreation of [Conway's Game of Life](https://en.wikipedia.org/wiki/Conway%27s_Game_of_Life). It is a zero player game where the initial state of the board determines the rest of the game.

Rules:

1. Any live cell with fewer than two live neighbours dies, as if by underpopulation.
2. Any live cell with two or three live neighbours lives on to the next generation.
3. Any live cell with more than three live neighbours dies, as if by overpopulation.
4. Any dead cell with exactly three live neighbours becomes a live cell, as if by reproduction.

For the sake of this game, a dead cell is represented by `-` and a live cell is represented by `*`.

## Instructions

1. Make sure you have [NodeJS](https://nodejs.org/en/) installed
2. `npm install` to install your dependencies
3. `npm start` begins the game
4. `npm test` runs unit tests

By default this will be a 3 x 3 board. It will also do one round and default to a grid with all live cells. You can change the size of the board, number of rounds, and number of live cells at the start by passing in arguments to the command line.

Example: `ROWS=5 COLUMNS=5 ROUNDS=10 LIVE_CELLS=7 node index.js` will create a 5 x 5 board and run 10 rounds.
