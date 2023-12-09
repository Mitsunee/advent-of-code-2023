import { test } from "uvu";
import * as assert from "uvu/assert";
import { predictNextValue } from "./predictNextValue";

test("it solves example tests", () => {
  assert.is(predictNextValue([0, 3, 6, 9, 12, 15]), 18);
  assert.is(predictNextValue([1, 3, 6, 10, 15, 21]), 28);
  assert.is(predictNextValue([10, 13, 16, 21, 30, 45]), 68);
});

test.run();
