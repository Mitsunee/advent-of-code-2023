import { test } from "uvu";
import * as assert from "uvu/assert";
import { getHandType } from "./getHandType";

test("it correctly gets types of example hands", () => {
  assert.is(
    getHandType(["3", "2", "T", "3", "K"], { "3": 2, "2": 1, T: 1, K: 1 }),
    "OnePair"
  );
  assert.is(
    getHandType(["T", "5", "5", "J", "5"], { T: 1, "5": 3, J: 1 }),
    "ThreeMatch"
  );
  assert.is(
    getHandType(["K", "K", "6", "7", "7"], { K: 2, "6": 1, "7": 2 }),
    "TwoPair"
  );
  assert.is(
    getHandType(["K", "T", "J", "J", "T"], { K: 1, T: 2, J: 2 }),
    "TwoPair"
  );
  assert.is(
    getHandType(["Q", "Q", "Q", "J", "A"], { Q: 3, J: 1, A: 1 }),
    "ThreeMatch"
  );
});

test("further examples with other types", () => {
  assert.is(getHandType(["2", "2", "2", "2", "2"], { "2": 5 }), "FiveMatch");
  assert.is(
    getHandType(["2", "T", "T", "2", "T"], { "2": 2, T: 3 }),
    "FullHouse"
  );
  assert.is(
    getHandType(["T", "T", "T", "2", "T"], { "2": 1, T: 4 }),
    "FourMatch"
  );
  assert.is(
    getHandType(["2", "3", "Q", "K", "A"], {
      "2": 1,
      "3": 1,
      Q: 1,
      K: 1,
      A: 1
    }),
    "NoMatch"
  );
});

test.run();
