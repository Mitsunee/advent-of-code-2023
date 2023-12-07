import { test } from "uvu";
import * as assert from "uvu/assert";
import type { CamelCardHand } from "./types";
import { analyzeHand } from "./analyzeHand";

test("it analyzes cards from example", () => {
  assert.equal(analyzeHand("32T3K 765", false), {
    bid: 765,
    cards: ["3", "2", "T", "3", "K"],
    type: "OnePair"
  } satisfies CamelCardHand);
  assert.equal(analyzeHand("T55J5 684", false), {
    bid: 684,
    cards: ["T", "5", "5", "J", "5"],
    type: "ThreeMatch"
  } satisfies CamelCardHand);
  assert.equal(analyzeHand("KK677 28", false), {
    bid: 28,
    cards: ["K", "K", "6", "7", "7"],
    type: "TwoPair"
  } satisfies CamelCardHand);
  assert.equal(analyzeHand("KTJJT 220", false), {
    bid: 220,
    cards: ["K", "T", "J", "J", "T"],
    type: "TwoPair"
  } satisfies CamelCardHand);
  assert.equal(analyzeHand("QQQJA 483", false), {
    bid: 483,
    cards: ["Q", "Q", "Q", "J", "A"],
    type: "ThreeMatch"
  } satisfies CamelCardHand);
});

test("it analyzes cards from example with joker ruler", () => {
  // this one's in the text
  assert.equal(analyzeHand("QJJQ2 0", true), {
    bid: 0,
    cards: ["Q", "J", "J", "Q", "2"],
    type: "FourMatch"
  });

  assert.equal(analyzeHand("32T3K 765", true), {
    bid: 765,
    cards: ["3", "2", "T", "3", "K"],
    type: "OnePair"
  } satisfies CamelCardHand);
  assert.equal(analyzeHand("T55J5 684", true), {
    bid: 684,
    cards: ["T", "5", "5", "J", "5"],
    type: "FourMatch"
  } satisfies CamelCardHand);
  assert.equal(analyzeHand("KK677 28", true), {
    bid: 28,
    cards: ["K", "K", "6", "7", "7"],
    type: "TwoPair"
  } satisfies CamelCardHand);
  assert.equal(analyzeHand("KTJJT 220", true), {
    bid: 220,
    cards: ["K", "T", "J", "J", "T"],
    type: "FourMatch"
  } satisfies CamelCardHand);
  assert.equal(analyzeHand("QQQJA 483", true), {
    bid: 483,
    cards: ["Q", "Q", "Q", "J", "A"],
    type: "FourMatch"
  } satisfies CamelCardHand);
});

test("special case with joker rule: no initial pairs", () => {
  assert.equal(analyzeHand("K6J9Q 42", true), {
    bid: 42,
    cards: ["K", "6", "J", "9", "Q"],
    type: "OnePair"
  } satisfies CamelCardHand);
});

test.run();
