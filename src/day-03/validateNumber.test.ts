import { test } from "uvu";
import * as assert from "uvu/assert";
import { validateNumber } from "./validateNumber";

// prettier-ignore
const numbers = [
// 0123456789
  "467..114..", // 0
  "...*......", // 1
  "..35..633.", // 2
  "......#...", // 3
  "617*......"  // 4
];

test("validates good numbers", () => {
  assert.ok(
    validateNumber({ value: 467, start: 0, end: 2 }, 0, numbers),
    "467"
  );
  assert.ok(validateNumber({ value: 35, start: 2, end: 3 }, 2, numbers), "35");
  assert.ok(
    validateNumber({ value: 617, start: 0, end: 2 }, 4, numbers),
    "617"
  );
});

test("invalidates bad numbers", () => {
  assert.not(validateNumber({ value: 114, start: 5, end: 7 }, 0, numbers));
});

test.run();
