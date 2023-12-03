import { test } from "uvu";
import * as assert from "uvu/assert";
import { findNumbers } from "./findNumbers";

test("it finds the correct numbers from example", () => {
  assert.equal(findNumbers("467..114.."), [
    { value: 467, start: 0, end: 2 },
    { value: 114, start: 5, end: 7 }
  ]);
  assert.equal(findNumbers("...*......"), []);
  assert.equal(findNumbers("..35..633."), [
    { value: 35, start: 2, end: 3 },
    { value: 633, start: 6, end: 8 }
  ]);
  assert.equal(findNumbers("......#..."), []);
  assert.equal(findNumbers("617*......"), [{ value: 617, start: 0, end: 2 }]);
  assert.equal(findNumbers(".....+.58."), [{ value: 58, start: 7, end: 8 }]);
  assert.equal(findNumbers("..592....."), [{ value: 592, start: 2, end: 4 }]);
  assert.equal(findNumbers("......755."), [{ value: 755, start: 6, end: 8 }]);
  assert.equal(findNumbers("...$.*...."), []);
  assert.equal(findNumbers(".664.598.."), [
    { value: 664, start: 1, end: 3 },
    { value: 598, start: 5, end: 7 }
  ]);
});

test.run();
