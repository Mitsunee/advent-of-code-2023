import { test } from "uvu";
import * as assert from "uvu/assert";
import { hashString } from "./hashString";

test("it correctly hashes examples", () => {
  assert.is(hashString("rn=1"), 30);
  assert.is(hashString("cm-"), 253);
  assert.is(hashString("qp=3"), 97);
  assert.is(hashString("cm=2"), 47);
  assert.is(hashString("qp-"), 14);
  assert.is(hashString("pc=4"), 180);
  assert.is(hashString("ot=9"), 9);
  assert.is(hashString("ab=5"), 197);
  assert.is(hashString("pc-"), 48);
  assert.is(hashString("pc=6"), 214);
  assert.is(hashString("ot=7"), 231);
});

test.run();
