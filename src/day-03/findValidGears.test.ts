import { test } from "uvu";
import * as assert from "uvu/assert";
import { findValidGears } from "./findValidGears";

test("it finds valid gears", () => {
  const inputA = ["467..114..", "...*......", "..35..633."];
  assert.equal(findValidGears(inputA, true), [16345]);
  const inputB = ["...$.*755.", ".664.598.."];
  assert.equal(findValidGears(inputB, true), [451490]);
  const inputC = ["..755*.$..", ".664.598.."];
  assert.equal(findValidGears(inputC, true), [451490]);
});

test("it ignores bad gears", () => {
  const input = ["617*......", ".....*.58.", "..592....."];
  assert.equal(findValidGears(input, true), []);
});

test.run();
