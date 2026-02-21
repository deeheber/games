# 🦠 Conway's Game of Life

A code recreation of [Conway's Game of Life](https://en.wikipedia.org/wiki/Conway%27s_Game_of_Life) — a zero-player game where the initial state of the board determines the rest of the game.

## Rules

1. Any live cell with fewer than two live neighbours dies (underpopulation)
2. Any live cell with two or three live neighbours lives on to the next generation
3. Any live cell with more than three live neighbours dies (overpopulation)
4. Any dead cell with exactly three live neighbours becomes a live cell (reproduction)

Dead cells are represented by `-` and live cells by `*`.

## 🚀 Getting started

1. Make sure you have [Node.js](https://nodejs.org/en/) v20.12.0 or later installed
2. `npm install`
3. `npm start` — runs the simulation
4. `npm test` — runs unit tests

## Configuration

By default this runs a 3x3 board for one round with all live cells. Customize via environment variables:

```sh
ROWS=5 COLUMNS=5 ROUNDS=10 LIVE_CELLS=7 npm start
```
