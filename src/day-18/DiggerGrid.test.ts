import { test } from "uvu";
import * as assert from "uvu/assert";
import { DiggerGrid } from "./DiggerGrid";
import { Direction } from "./types";

test("it can expand up, adjusting position", () => {
  const grid = new DiggerGrid();
  grid.expand(Direction.UP, 1);
  assert.equal(grid.pos, { x: 0, y: 1 });
  assert.is(grid.height, 2, "new height");
  assert.is(grid.width, 1, "new width");
  grid.expand(Direction.UP, 5);
  assert.equal(grid.pos, { x: 0, y: 6 });
  assert.is(grid.height, 7, "new height");
  assert.is(grid.width, 1, "new width");
});

test("it can expand down, keeping position", () => {
  const grid = new DiggerGrid();
  grid.expand(Direction.DOWN, 1);
  assert.equal(grid.pos, { x: 0, y: 0 });
  assert.is(grid.height, 2, "new height");
  assert.is(grid.width, 1, "new width");
  grid.expand(Direction.DOWN, 5);
  assert.equal(grid.pos, { x: 0, y: 0 });
  assert.is(grid.height, 7, "new height");
  assert.is(grid.width, 1, "new width");
});

test("it can expand left, adjusting position", () => {
  const grid = new DiggerGrid();
  grid.expand(Direction.LEFT, 1);
  assert.equal(grid.pos, { x: 1, y: 0 });
  assert.is(grid.height, 1, "new height");
  assert.is(grid.width, 2, "new width");
  grid.expand(Direction.LEFT, 5);
  assert.equal(grid.pos, { x: 6, y: 0 });
  assert.is(grid.height, 1, "new height");
  assert.is(grid.width, 7, "new width");
});

test("it can expand right, keeping position", () => {
  const grid = new DiggerGrid();
  grid.expand(Direction.RIGHT, 1);
  assert.equal(grid.pos, { x: 0, y: 0 });
  assert.is(grid.height, 1, "new height");
  assert.is(grid.width, 2, "new width");
  grid.expand(Direction.RIGHT, 5);
  assert.equal(grid.pos, { x: 0, y: 0 });
  assert.is(grid.height, 1, "new height");
  assert.is(grid.width, 7, "new width");
});

test("it correctly prepares digging operation that would reach outside of grid (up direction)", () => {
  const grid = new DiggerGrid();
  grid.expand(Direction.UP, 1);
  grid.prepareDig(Direction.UP, 5);
  assert.equal(grid.pos, { x: 0, y: 5 });
  assert.is(grid.height, 6, "new height");
  assert.is(grid.width, 1, "new width");
});

test("it correctly prepares digging operation that would reach outside of grid (down direction)", () => {
  const grid = new DiggerGrid();
  grid.expand(Direction.DOWN, 1);
  grid.prepareDig(Direction.DOWN, 5);
  assert.equal(grid.pos, { x: 0, y: 0 });
  assert.is(grid.height, 6, "new height");
  assert.is(grid.width, 1, "new width");
});

test("it correctly prepares digging operation that would reach outside of grid (left direction)", () => {
  const grid = new DiggerGrid();
  grid.expand(Direction.LEFT, 1);
  grid.prepareDig(Direction.LEFT, 5);
  assert.equal(grid.pos, { x: 5, y: 0 });
  assert.is(grid.height, 1, "new height");
  assert.is(grid.width, 6, "new width");
});

test("it correctly prepares digging operation that would reach outside of grid (right direction)", () => {
  const grid = new DiggerGrid();
  grid.expand(Direction.RIGHT, 1);
  grid.prepareDig(Direction.RIGHT, 5);
  assert.equal(grid.pos, { x: 0, y: 0 });
  assert.is(grid.height, 1, "new height");
  assert.is(grid.width, 6, "new width");
});

test("diggy diggy hole", () => {
  const grid = new DiggerGrid();
  grid
    .expand(Direction.RIGHT, 1)
    .expand(Direction.UP, 2)
    .dig(Direction.LEFT, 1)
    .dig(Direction.UP, 2)
    .dig(Direction.RIGHT, 5)
    .dig(Direction.UP, 2)
    .dig(Direction.LEFT, 2)
    .dig(Direction.DOWN, 6);
  assert.equal(grid.pos, { x: 3, y: 6 });
  assert.is(grid.height, 7, "new height");
  assert.is(grid.width, 6, "new width");
  assert.is(
    grid.stringify(true),
    `...###\n...#.#\n######\n#..#..\n##.#..\n...#..\n...P..`
  );
});

test.run();
