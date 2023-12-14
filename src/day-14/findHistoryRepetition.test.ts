import { test } from "uvu";
import * as assert from "uvu/assert";
import { findHistoryRepetition } from "./findHistoryRepetition";

test("it finds repetitions", () => {
  assert.not(findHistoryRepetition([1, 2, 3, 4, 5]));
  assert.is(findHistoryRepetition([9, 8, 7, 1, 2, 3, 1, 2, 3]), 3);
});

test("it ignores repetitions of the same number", () => {
  assert.is(
    findHistoryRepetition([9, 8, 7, 1, 2, 3, 3, 3, 3, 1, 2, 3, 3, 3, 3]),
    6
  );
});

test.run();
