import { test } from "uvu";
import { is } from "uvu/assert";
import { leastCommonMultiple } from "./leastCommonMultiple";

test("it gets correct results", () => {
  is(leastCommonMultiple(21, 6), 42);
  is(leastCommonMultiple(12, 7), 84);
  is(leastCommonMultiple(1, 3, 4, 5), 60);
});

test("it handles 0s in input correctly", () => {
  is(leastCommonMultiple(0, 3), 0);
  is(leastCommonMultiple(0, 0), 0);
});

test.run();
