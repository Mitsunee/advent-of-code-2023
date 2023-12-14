import { getValueOfGrid } from "./getValueOfGrid";
import { findHistoryRepetition } from "./findHistoryRepetition";

export const enum Direction {
  UP,
  DOWN,
  LEFT,
  RIGHT
}

function moveUp(grid: string[][]) {
  for (let y = 1; y < grid.length; y++) {
    for (let x = 0; x < grid[y].length; x++) {
      if (grid[y][x] != "O") continue;

      // traverse up until hitting edge of map or other rock
      let newY = y;
      while (newY > 0) {
        if (grid[newY - 1][x] != ".") break;
        newY--;
      }

      // change position in grid
      grid[y][x] = ".";
      grid[newY][x] = "O";
    }
  }

  return grid;
}

function moveDown(grid: string[][]) {
  for (let y = grid.length - 2; y >= 0; y--) {
    for (let x = 0; x < grid[y].length; x++) {
      if (grid[y][x] != "O") continue;

      // traverse down until hitting edge of map or other rock
      let newY = y;
      while (newY < grid.length - 1) {
        if (grid[newY + 1][x] != ".") break;
        newY++;
      }

      // change position in grid
      grid[y][x] = ".";
      grid[newY][x] = "O";
    }
  }

  return grid;
}

function moveLeft(input: string[][]) {
  return input.map(row => {
    for (let x = 1; x < row.length; x++) {
      if (row[x] != "O") continue;

      // traverse left until hitting edge of map or other rock
      let newX = x;
      while (newX > 0) {
        if (row[newX - 1] != ".") break;
        newX--;
      }

      // change position in row
      row[x] = ".";
      row[newX] = "O";
    }

    return row;
  });
}

function moveRight(input: string[][]) {
  return input.map(row => {
    for (let x = row.length - 2; x >= 0; x--) {
      if (row[x] != "O") continue;

      // traverse right until hitting edge of map or other rock
      let newX = x;
      while (newX < row.length - 1) {
        if (row[newX + 1] != ".") break;
        newX++;
      }

      // change position in row
      row[x] = ".";
      row[newX] = "O";
    }

    return row;
  });
}

export function moveGrid(input: string[], direction: Direction) {
  let grid = input.map(row => row.split(""));

  switch (direction) {
    case Direction.UP:
      grid = moveUp(grid);
      break;
    case Direction.DOWN:
      grid = moveDown(grid);
      break;
    case Direction.LEFT:
      grid = moveLeft(grid);
      break;
    case Direction.RIGHT:
      grid = moveRight(grid);
      break;
  }

  return grid.map(row => row.join(""));
}

export function cycleGrid(input: string[], amount = 1) {
  let grid = input.map(row => row.split(""));
  const history = new Array<number>();
  history.push(getValueOfGrid(grid));

  for (let i = 0; i < amount; i++) {
    grid = moveRight(moveDown(moveLeft(moveUp(grid))));
    history.push(getValueOfGrid(grid));

    // check for repetitions
    if (history.length > 5) {
      const repeating = findHistoryRepetition(history);
      if (!repeating) continue;
      const startAmount = history.length - repeating * 2;
      const newAmount = startAmount + ((amount - startAmount) % repeating);
      return cycleGrid(input, newAmount);
    }
  }

  return grid.map(row => row.join(""));
}
