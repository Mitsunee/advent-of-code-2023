import { test } from "uvu";
import * as assert from "uvu/assert";
import { parseInstruction } from "./parseInstruction";
import { Direction } from "./types";

test("it correctly parses instructions from example (part 1)", () => {
  assert.equal(parseInstruction("R 6 (#70c710)", false), {
    direction: Direction.RIGHT,
    amount: 6
  });
  assert.equal(parseInstruction("D 5 (#0dc571)", false), {
    direction: Direction.DOWN,
    amount: 5
  });
  assert.equal(parseInstruction("L 2 (#5713f0)", false), {
    direction: Direction.LEFT,
    amount: 2
  });
  assert.equal(parseInstruction("D 2 (#d2c081)", false), {
    direction: Direction.DOWN,
    amount: 2
  });
  assert.equal(parseInstruction("R 2 (#59c680)", false), {
    direction: Direction.RIGHT,
    amount: 2
  });
  assert.equal(parseInstruction("D 2 (#411b91)", false), {
    direction: Direction.DOWN,
    amount: 2
  });
  assert.equal(parseInstruction("L 5 (#8ceee2)", false), {
    direction: Direction.LEFT,
    amount: 5
  });
  assert.equal(parseInstruction("U 2 (#caa173)", false), {
    direction: Direction.UP,
    amount: 2
  });
  assert.equal(parseInstruction("L 1 (#1b58a2)", false), {
    direction: Direction.LEFT,
    amount: 1
  });
  assert.equal(parseInstruction("U 2 (#caa171)", false), {
    direction: Direction.UP,
    amount: 2
  });
  assert.equal(parseInstruction("R 2 (#7807d2)", false), {
    direction: Direction.RIGHT,
    amount: 2
  });
  assert.equal(parseInstruction("U 3 (#a77fa3)", false), {
    direction: Direction.UP,
    amount: 3
  });
  assert.equal(parseInstruction("L 2 (#015232)", false), {
    direction: Direction.LEFT,
    amount: 2
  });
  assert.equal(parseInstruction("U 2 (#7a21e3)", false), {
    direction: Direction.UP,
    amount: 2
  });
});

test("it correctly parses instructions from example (part 2)", () => {
  assert.equal(parseInstruction("R 6 (#70c710)", true), {
    direction: Direction.RIGHT,
    amount: 461937
  });
  assert.equal(parseInstruction("D 5 (#0dc571)", true), {
    direction: Direction.DOWN,
    amount: 56407
  });
  assert.equal(parseInstruction("L 2 (#5713f0)", true), {
    direction: Direction.RIGHT,
    amount: 356671
  });
  assert.equal(parseInstruction("D 2 (#d2c081)", true), {
    direction: Direction.DOWN,
    amount: 863240
  });
  assert.equal(parseInstruction("R 2 (#59c680)", true), {
    direction: Direction.RIGHT,
    amount: 367720
  });
  assert.equal(parseInstruction("D 2 (#411b91)", true), {
    direction: Direction.DOWN,
    amount: 266681
  });
  assert.equal(parseInstruction("L 5 (#8ceee2)", true), {
    direction: Direction.LEFT,
    amount: 577262
  });
  assert.equal(parseInstruction("U 2 (#caa173)", true), {
    direction: Direction.UP,
    amount: 829975
  });
  assert.equal(parseInstruction("L 1 (#1b58a2)", true), {
    direction: Direction.LEFT,
    amount: 112010
  });
  assert.equal(parseInstruction("U 2 (#caa171)", true), {
    direction: Direction.DOWN,
    amount: 829975
  });
  assert.equal(parseInstruction("R 2 (#7807d2)", true), {
    direction: Direction.LEFT,
    amount: 491645
  });
  assert.equal(parseInstruction("U 3 (#a77fa3)", true), {
    direction: Direction.UP,
    amount: 686074
  });
  assert.equal(parseInstruction("L 2 (#015232)", true), {
    direction: Direction.LEFT,
    amount: 5411
  });
  assert.equal(parseInstruction("U 2 (#7a21e3)", true), {
    direction: Direction.UP,
    amount: 500254
  });
});

test.run();
