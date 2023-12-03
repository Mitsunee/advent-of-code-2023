import { test } from "uvu";
import * as assert from "uvu/assert";
import { extractNumbersStrict } from "./extractNumbersStrict";

test("it correctly extracts all numbers", () => {
  assert.equal(extractNumbersStrict("1abc2"), [1, 2]);
  assert.equal(extractNumbersStrict("pqr3stu8vwx"), [3, 8]);
  assert.equal(extractNumbersStrict("a1b2c3d4e5f"), [1, 2, 3, 4, 5]);
  assert.equal(extractNumbersStrict("treb7uchet"), [7]);
  assert.equal(extractNumbersStrict("no nums"), [], "no numbers");
});

test.run();
