import { test } from "uvu";
import * as assert from "uvu/assert";
import { mapValue } from "./mapValue";

test("it maps example correctly", () => {
  const mapValues = [
    [50, 98, 2],
    [52, 50, 48]
  ];
  assert.is(mapValue(79, mapValues), 81);
  assert.is(mapValue(14, mapValues), 14);
  assert.is(mapValue(55, mapValues), 57);
  assert.is(mapValue(13, mapValues), 13);
  assert.is(mapValue(97, mapValues), 99);
  assert.is(mapValue(98, mapValues), 50);
  assert.is(mapValue(99, mapValues), 51);
});

test.run();
