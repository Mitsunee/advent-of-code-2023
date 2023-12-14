import { test } from "uvu";
import * as assert from "uvu/assert";
import { getValueOfGrid } from "./getValueOfGrid";

test("it correctly values example", () => {
  const grid = [
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
  ];
  assert.is(getValueOfGrid(grid), 136, "Test with string[]");
  assert.is(
    getValueOfGrid(grid.map(row => row.split(""))),
    136,
    "Test with string[][]"
  );
});

test.run();
