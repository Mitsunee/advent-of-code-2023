import { test } from "uvu";
import * as assert from "uvu/assert";
import type { PatternReflection } from "./findReflection";
import { findReflection } from "./findReflection";

test("it finds horizontal reflection from example", () => {
  const pattern = [
    "#...##..#",
    "#....#..#",
    "..##..###",
    "#####.##.",
    "#####.##.",
    "..##..###",
    "#....#..#"
  ];

  assert.equal(findReflection(pattern), {
    direction: "horizontal",
    afterIdx: 3
  } satisfies PatternReflection);
});

test("it finds vertical reflection from example", () => {
  const pattern = [
    "#.##..##.",
    "..#.##.#.",
    "##......#",
    "##......#",
    "..#.##.#.",
    "..##..##.",
    "#.#.##.#."
  ];

  assert.equal(findReflection(pattern), {
    direction: "vertical",
    afterIdx: 4
  } satisfies PatternReflection);
});

test.run();
