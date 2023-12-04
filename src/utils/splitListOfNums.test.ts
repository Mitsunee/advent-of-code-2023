import { test } from "uvu";
import * as assert from "uvu/assert";
import { splitListOfNums } from "./splitListOfNums";

test("it correctly splits space-separated numbers", () => {
  assert.equal(splitListOfNums("1 2 3"), [1, 2, 3]);
  assert.equal(splitListOfNums(" 4 6 2"), [4, 6, 2], "trailing space");
  assert.equal(splitListOfNums("42"), [42], "single number");
});

test("it correctly splits numbers with custom deliminator", () => {
  assert.equal(splitListOfNums("1,2,3", ","), [1, 2, 3]);
  assert.equal(splitListOfNums(" 4,6 , 2", ","), [4, 6, 2], "trailing spaces");
  assert.equal(splitListOfNums("42", ","), [42], "single number");
});

test("it correctly handles non-digit characters as NaN", () => {
  assert.equal(splitListOfNums("1 a b 4"), [1, NaN, NaN, 4]);
  assert.equal(
    splitListOfNums("1,, ,3", ","),
    [1, NaN, NaN, 3],
    "empty strings"
  );
});

test.run();
