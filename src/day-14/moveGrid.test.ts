import { test } from "uvu";
import * as assert from "uvu/assert";
import { Direction, cycleGrid, moveGrid } from "./moveGrid";

const input = [
  "O....#....",
  "O.OO#....#",
  ".....##...",
  "OO.#O....O",
  ".O.....O#.",
  "O.#..O.#.#",
  "..O..#O..O",
  ".......O..",
  "#....###..",
  "#OO..#...."
];

test("it correctly transforms example in up direction", () => {
  assert.equal(moveGrid(input, Direction.UP), [
    "OOOO.#.O..",
    "OO..#....#",
    "OO..O##..O",
    "O..#.OO...",
    "........#.",
    "..#....#.#",
    "..O..#.O.O",
    "..O.......",
    "#....###..",
    "#....#...."
  ]);
});

test("it correctly transform example in down direction", () => {
  assert.equal(moveGrid(input, Direction.DOWN), [
    ".....#....",
    "....#....#",
    "...O.##...",
    "...#......",
    "O.O....O#O",
    "O.#..O.#.#",
    "O....#....",
    "OO....OO..",
    "#OO..###..",
    "#OO.O#...O"
  ]);
});

test("it correctly transform example in left direction", () => {
  assert.equal(moveGrid(input, Direction.LEFT), [
    "O....#....",
    "OOO.#....#",
    ".....##...",
    "OO.#OO....",
    "OO......#.",
    "O.#O...#.#",
    "O....#OO..",
    "O.........",
    "#....###..",
    "#OO..#...."
  ]);
});

test("it correctly transform example in right direction", () => {
  assert.equal(moveGrid(input, Direction.RIGHT), [
    "....O#....",
    ".OOO#....#",
    ".....##...",
    ".OO#....OO",
    "......OO#.",
    ".O#...O#.#",
    "....O#..OO",
    ".........O",
    "#....###..",
    "#..OO#...."
  ]);
});

test("it correctly cycles example input", () => {
  assert.equal(cycleGrid(input, 1), [
    ".....#....",
    "....#...O#",
    "...OO##...",
    ".OO#......",
    ".....OOO#.",
    ".O#...O#.#",
    "....O#....",
    "......OOOO",
    "#...O###..",
    "#..OO#...."
  ]);
  assert.equal(cycleGrid(input, 2), [
    ".....#....",
    "....#...O#",
    ".....##...",
    "..O#......",
    ".....OOO#.",
    ".O#...O#.#",
    "....O#...O",
    ".......OOO",
    "#..OO###..",
    "#.OOO#...O"
  ]);
  assert.equal(cycleGrid(input, 3), [
    ".....#....",
    "....#...O#",
    ".....##...",
    "..O#......",
    ".....OOO#.",
    ".O#...O#.#",
    "....O#...O",
    ".......OOO",
    "#...O###.O",
    "#.OOO#...O"
  ]);
});

test.run();
