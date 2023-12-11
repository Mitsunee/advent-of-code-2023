import { test } from "uvu";
import * as assert from "uvu/assert";
import { getListOfPairs } from "./getListOfPairs";

test("generates full list with no duplicates", () => {
  assert.equal(getListOfPairs(2), [[1, 2]]);
  assert.equal(getListOfPairs(4), [
    [1, 2],
    [1, 3],
    [2, 3],
    [1, 4],
    [2, 4],
    [3, 4]
  ]);
});

test("it correctly handles float", () => {
  assert.equal(getListOfPairs(4.5), [
    [1, 2],
    [1, 3],
    [2, 3],
    [1, 4],
    [2, 4],
    [3, 4]
  ]);
});

test("it correctly returns empty array for n < 2", () => {
  assert.equal(getListOfPairs(1), []);
  assert.equal(getListOfPairs(0), []);
  assert.equal(getListOfPairs(-1), []);
});

test.run();
