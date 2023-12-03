import { test } from "uvu";
import * as assert from "uvu/assert";
import { extractNumbers } from "./extractNumbers";

test("it correctly extracts numbers", () => {
  assert.equal(extractNumbers("1abc2"), [1, 2]);
  assert.equal(extractNumbers("pqr3stu8vwx"), [3, 8]);
  assert.equal(extractNumbers("a1b2c3d4e5f"), [1, 2, 3, 4, 5]);
  assert.equal(extractNumbers("treb7uchet"), [7]);
  assert.equal(extractNumbers("no nums"), [], "no numbers");
});

test("it correctly extracts number words as well", () => {
  assert.equal(extractNumbers("two1nine"), [2, 1, 9]);
  assert.equal(extractNumbers("eightwothree"), [8, 2, 3]);
  assert.equal(extractNumbers("abcone2threexyz"), [1, 2, 3]);
  assert.equal(extractNumbers("xtwone3four"), [2, 1, 3, 4]);
  assert.equal(extractNumbers("4nineeightseven2"), [4, 9, 8, 7, 2]);
  assert.equal(extractNumbers("zoneight234"), [1, 8, 2, 3, 4]);
  assert.equal(extractNumbers("7pqrstsixteen"), [7, 6]);
});

test.run();
