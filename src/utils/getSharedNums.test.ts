import { test } from "uvu";
import * as assert from "uvu/assert";
import { getSharedNums } from "./getSharedNums";

test("it correctly counts shared numbers", () => {
  assert.is(getSharedNums([1, 2, 3], [1, 2]), 2);
  assert.is(getSharedNums([1, 2, 3], [4, 5, 6]), 0, "no overlap");
  assert.is(getSharedNums([0, 0, 5], [0, 1]), 1, "duplicate number");
  assert.is(getSharedNums([], [1]), 0, "one array empty");
  assert.is(getSharedNums([1], []), 0, "other array empty");
  assert.is(getSharedNums([], []), 0, "both arrays empty");
});

test.run();
