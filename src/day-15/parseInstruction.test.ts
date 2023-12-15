import { test } from "uvu";
import * as assert from "uvu/assert";
import type { Instruction } from "./parseInstruction";
import { parseInstruction } from "./parseInstruction";

test("it correctly parses instructions from example", () => {
  assert.equal(parseInstruction("rn=1"), {
    label: "rn",
    operation: "=",
    focalLength: 1
  } satisfies Instruction);
  assert.equal(parseInstruction("cm-"), {
    label: "cm",
    operation: "-"
  } satisfies Instruction);
  assert.equal(parseInstruction("qp=3"), {
    label: "qp",
    operation: "=",
    focalLength: 3
  } satisfies Instruction);
  assert.equal(parseInstruction("cm=2"), {
    label: "cm",
    operation: "=",
    focalLength: 2
  } satisfies Instruction);
  assert.equal(parseInstruction("qp-"), {
    label: "qp",
    operation: "-"
  } satisfies Instruction);
  assert.equal(parseInstruction("pc=4"), {
    label: "pc",
    operation: "=",
    focalLength: 4
  } satisfies Instruction);
  assert.equal(parseInstruction("ot=9"), {
    label: "ot",
    operation: "=",
    focalLength: 9
  } satisfies Instruction);
  assert.equal(parseInstruction("ab=5"), {
    label: "ab",
    operation: "=",
    focalLength: 5
  } satisfies Instruction);
  assert.equal(parseInstruction("pc-"), {
    label: "pc",
    operation: "-"
  } satisfies Instruction);
  assert.equal(parseInstruction("pc=6"), {
    label: "pc",
    operation: "=",
    focalLength: 6
  } satisfies Instruction);
  assert.equal(parseInstruction("ot=7"), {
    label: "ot",
    operation: "=",
    focalLength: 7
  } satisfies Instruction);
});

test.run();
