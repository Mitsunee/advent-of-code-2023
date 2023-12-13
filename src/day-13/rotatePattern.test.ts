import { test } from "uvu";
import * as assert from "uvu/assert";
import { rotatePattern } from "./rotatePattern";

const pattern = [
  "#.##..##.",
  "..#.##.#.",
  "##......#",
  "##......#",
  "..#.##.#.",
  "..##..##.",
  "#.#.##.#."
];

const expected = [
  "#.##..#",
  "..##...",
  "##..###",
  "#....#.",
  ".#..#.#",
  ".#..#.#",
  "#....#.",
  "##..###",
  "..##..."
];

test("it rotates example pattern", () => {
  assert.equal(rotatePattern(pattern), expected);
});

test.run();
