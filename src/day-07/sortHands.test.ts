import { test } from "uvu";
import * as assert from "uvu/assert";
import { sortHands, sortHandsWithJokerRule } from "./sortHands";
import type { CamelCardHand } from "./types";

const HandA: CamelCardHand = {
  bid: 765,
  cards: ["3", "2", "T", "3", "K"],
  type: "OnePair"
};
const HandAJ = HandA;

const HandB: CamelCardHand = {
  bid: 684,
  cards: ["T", "5", "5", "J", "5"],
  type: "ThreeMatch"
};
const HandBJ: CamelCardHand = { ...HandB, type: "FourMatch" };

const HandC: CamelCardHand = {
  bid: 28,
  cards: ["K", "K", "6", "7", "7"],
  type: "TwoPair"
};
const HandCJ = HandC;

const HandD: CamelCardHand = {
  bid: 220,
  cards: ["K", "T", "J", "J", "T"],
  type: "TwoPair"
};
const HandDJ: CamelCardHand = { ...HandD, type: "FourMatch" };

const HandE: CamelCardHand = {
  bid: 483,
  cards: ["Q", "Q", "Q", "J", "A"],
  type: "ThreeMatch"
};
const HandEJ: CamelCardHand = { ...HandE, type: "FourMatch" };

test("it correctly sorts example hands", () => {
  assert.equal([HandA, HandB, HandC, HandD, HandE].sort(sortHands), [
    HandA,
    HandD,
    HandC,
    HandB,
    HandE
  ]);
});

test("it correct sorts example hands with joker rule", () => {
  assert.equal(
    [HandAJ, HandBJ, HandCJ, HandDJ, HandEJ].sort(sortHandsWithJokerRule),
    [HandAJ, HandCJ, HandBJ, HandEJ, HandDJ]
  );

  // this one's in the text
  const HandF: CamelCardHand = {
    bid: 0,
    cards: ["J", "K", "K", "K", "2"],
    type: "FourMatch"
  };
  const HandG: CamelCardHand = {
    bid: 0,
    cards: ["Q", "Q", "Q", "Q", "2"],
    type: "FourMatch"
  };
  assert.equal([HandG, HandF].sort(sortHandsWithJokerRule), [HandF, HandG]);
});

test.run();
