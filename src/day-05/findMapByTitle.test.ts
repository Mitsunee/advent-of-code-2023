import { test } from "uvu";
import * as assert from "uvu/assert";
import { findMapByTitle } from "./findMapByTitle";

const input = [
  "seeds: 79 14 55 13",
  "",
  "seed-to-soil map:",
  "50 98 2",
  "52 50 48",
  "",
  "soil-to-fertilizer map:",
  "0 15 37",
  "37 52 2",
  "39 0 15",
  "",
  "fertilizer-to-water map:",
  "49 53 8",
  "0 11 42",
  "42 0 7",
  "57 7 4"
];

test("it parses maps from example", () => {
  assert.equal(findMapByTitle("seed-to-", input), {
    title: "seed-to-soil map",
    values: [
      [50, 98, 2],
      [52, 50, 48]
    ]
  });
  assert.equal(findMapByTitle("fertilizer-to", input), {
    title: "fertilizer-to-water map",
    values: [
      [49, 53, 8],
      [0, 11, 42],
      [42, 0, 7],
      [57, 7, 4]
    ]
  });
});

test("it handles map not existing in input correctly", () => {
  assert.not(findMapByTitle("water-to", input));
});

test.run();
