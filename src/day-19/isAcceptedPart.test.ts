import { test } from "uvu";
import * as assert from "uvu/assert";
import { isAcceptedPart } from "./isAcceptedPart";
import type { PartWorkflowMap } from "./types";

const workflows: PartWorkflowMap = {
  px: {
    name: "px",
    steps: [
      { key: "a", comparison: "smaller", value: 2006, to: "qkq" },
      { key: "m", comparison: "larger", value: 2090, to: "A" },
      "rfg"
    ]
  },
  pv: {
    name: "pv",
    steps: [{ key: "a", comparison: "larger", value: 1716, to: "R" }, "A"]
  },
  lnx: {
    name: "lnx",
    steps: [{ key: "m", comparison: "larger", value: 1548, to: "A" }, "A"]
  },
  rfg: {
    name: "rfg",
    steps: [
      { key: "s", comparison: "smaller", value: 537, to: "gd" },
      { key: "x", comparison: "larger", value: 2440, to: "R" },
      "A"
    ]
  },
  qs: {
    name: "qs",
    steps: [{ key: "s", comparison: "larger", value: 3448, to: "A" }, "lnx"]
  },
  qkq: {
    name: "qkq",
    steps: [{ key: "x", comparison: "smaller", value: 1416, to: "A" }, "crn"]
  },
  crn: {
    name: "crn",
    steps: [{ key: "x", comparison: "larger", value: 2662, to: "A" }, "R"]
  },
  in: {
    name: "in",
    steps: [{ key: "s", comparison: "smaller", value: 1351, to: "px" }, "qqz"]
  },
  qqz: {
    name: "qqz",
    steps: [
      { key: "s", comparison: "larger", value: 2770, to: "qs" },
      { key: "m", comparison: "smaller", value: 1801, to: "hdj" },
      "R"
    ]
  },
  gd: {
    name: "gd",
    steps: [{ key: "a", comparison: "larger", value: 3333, to: "R" }, "R"]
  },
  hdj: {
    name: "hdj",
    steps: [{ key: "m", comparison: "larger", value: 838, to: "A" }, "pv"]
  }
};

test("it correctly analyzes the parts from example", () => {
  assert.ok(
    isAcceptedPart({ x: 787, m: 2655, a: 1222, s: 2876 }, workflows),
    "Part 1 correctly processed"
  );
  assert.not(
    isAcceptedPart({ x: 1679, m: 44, a: 2067, s: 496 }, workflows),
    "Part 2 correctly processed"
  );
  assert.ok(
    isAcceptedPart({ x: 2036, m: 264, a: 79, s: 2244 }, workflows),
    "Part 3 correctly processed"
  );
  assert.not(
    isAcceptedPart({ x: 2461, m: 1339, a: 466, s: 291 }, workflows),
    "Part 4 correctly processed"
  );
  assert.ok(
    isAcceptedPart({ x: 2127, m: 1623, a: 2188, s: 1013 }, workflows),
    "Part 5 correctly processed"
  );
});

test.run();
