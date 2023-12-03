import { test } from "uvu";
import * as assert from "uvu/assert";
import { strContainsSymbol } from "./strContainsSymbol";

test("finds symbols", () => {
  assert.ok(strContainsSymbol("...$...."));
  assert.ok(strContainsSymbol("&"));
  assert.ok(strContainsSymbol("%.....&..."));
});

test("it correctly handles a dot-only string", () => {
  assert.not(strContainsSymbol("........"));
});

test("it correctly handles a string with only digits and dots", () => {
  assert.not(strContainsSymbol("...3...6..."));
  assert.not(strContainsSymbol("893475"));
});

test("it correctly handles empty string", () => {
  assert.not(strContainsSymbol(""));
});

test.run();
