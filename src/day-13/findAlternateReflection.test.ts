import { test } from "uvu";
import * as assert from "uvu/assert";
import type { PatternReflection } from "./findReflection";
import { findReflection } from "./findReflection";
import { findAlternateReflection } from "./findAlternateReflection";

const patternA = [
  "#.##..##.",
  "..#.##.#.",
  "##......#",
  "##......#",
  "..#.##.#.",
  "..##..##.",
  "#.#.##.#."
];

const patternB = [
  "#...##..#",
  "#....#..#",
  "..##..###",
  "#####.##.",
  "#####.##.",
  "..##..###",
  "#....#..#"
];

test("it finds new horizontal reflections from examples", () => {
  assert.equal(findAlternateReflection(patternA, findReflection(patternA)!), {
    direction: "horizontal",
    afterIdx: 2
  } satisfies PatternReflection);
  assert.equal(findAlternateReflection(patternB, findReflection(patternB)!), {
    direction: "horizontal",
    afterIdx: 0
  } satisfies PatternReflection);
});

test.run();
