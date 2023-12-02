import { test } from "uvu";
import * as assert from "uvu/assert";
import { analyzeGame, analyzeGameSample } from "./analyzeGame";

test("it returns correct game id", () => {
  assert.is(analyzeGame("Game 64: 1 red").id, 64);
  assert.is(analyzeGame("Game 42: 1 red, 1 blue").id, 42);
  assert.is(analyzeGame("Game 15: 1 red, 2 blue; 4 green").id, 15);
  assert.throws(() => analyzeGame("Game 6"));
  assert.throws(() => analyzeGame("Ga: 6"));
});

test("it analyzes samples correctly", () => {
  assert.equal(analyzeGameSample("1 red, 2 blue"), { red: 1, blue: 2 });
  assert.equal(analyzeGameSample("42 green, 2 blue"), { blue: 2, green: 42 });
});

test("it gets the minimum viable cube amounts for each game", () => {
  assert.equal(
    analyzeGame("Game 1: 3 blue, 4 red; 1 red, 2 green, 6 blue; 2 green"),
    { id: 1, cubes: { red: 4, green: 2, blue: 6 } }
  );
  assert.equal(
    analyzeGame(
      "Game 3: 8 green, 6 blue, 20 red; 5 blue, 4 red, 13 green; 5 green, 1 red"
    ),
    { id: 3, cubes: { red: 20, green: 13, blue: 6 } }
  );
  assert.equal(
    analyzeGame(
      "Game 4: 1 green, 3 red, 6 blue; 3 green, 6 red; 3 green, 15 blue, 14 red"
    ),
    { id: 4, cubes: { red: 14, green: 3, blue: 15 } }
  );
});

test.run();
