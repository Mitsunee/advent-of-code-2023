import { test } from "uvu";
import * as assert from "uvu/assert";
import { predictPrevValue } from "./predictPrevValue";

test("it solves example test", () => {
  assert.is(predictPrevValue([10, 13, 16, 21, 30, 45]), 5);
});

test.run();
