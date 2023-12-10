import { Command, Option } from "@commander-js/extra-typings";
import { getInputFileAsLines } from "~/utils/getInputFile";
import type { PositionStr } from "./Position";
import { Position } from "./Position";
import { Direction, Tile } from "./types";
import { scanTile } from "./scanTile";
import { getNewDirection } from "./getNewDirection";

const program = new Command()
  .requiredOption("-f, --file <path>", "path to input file")
  .addOption(
    new Option("-p, --part <choice>", "Part 1 or 2").choices([
      "1",
      "2"
    ] as const)
  );

async function main() {
  program.parse();
  const opts = program.opts();
  const isPartTwo = opts.part == "2";
  const input = await getInputFileAsLines(opts.file);
  const startingPos = new Position();
  const distances: Partial<Record<PositionStr, number>> = {};
  const width = input[0].length;
  const height = input.length;
  let temp: Tile;

  function traverseMap(startX: number, startY: number, startDir: Direction) {
    let temp: Tile;
    let distance = 1;
    const pos = new Position(startX, startY);
    let direction = startDir;
    while ((temp = pos.scan(input)) != Tile.START) {
      if (pos.x < 0 || pos.x >= width) {
        throw new Error(`Went off map horizontally`);
      }

      if (pos.y < 0 || pos.y >= height) {
        throw new Error(`Went off map vertically`);
      }

      distances[pos.toString()] = Math.min(
        distances[pos.toString()] ?? Number.MAX_SAFE_INTEGER,
        distance
      );

      const newDirection = getNewDirection(temp, direction);

      switch (newDirection) {
        case Direction.UP:
          pos.y--;
          break;
        case Direction.DOWN:
          pos.y++;
          break;
        case Direction.LEFT:
          pos.x--;
          break;
        case Direction.RIGHT:
          pos.x++;
          break;
      }

      // after
      distance++;
      direction = newDirection;
    }
    return distance - 1;
  }

  // find starting position
  for (let y = 0; y < height; y++) {
    const x = input[y].indexOf("S");
    if (x < 0) continue;
    startingPos.x = x;
    startingPos.y = y;
    break;
  }

  console.log(`Starting at: ${startingPos.toString()}`);

  // check up
  if (
    startingPos.y > 0 &&
    (temp = scanTile(input[startingPos.y - 1][startingPos.x])) &&
    (temp == Tile.SOUTH_EAST ||
      temp == Tile.SOUTH_WEST ||
      temp == Tile.VERTICAL)
  ) {
    console.log("Traversing North");
    const len = traverseMap(startingPos.x, startingPos.y - 1, Direction.UP);
    console.log(`North: ${len}`);
  } else {
    console.log(`Cannot travel North`);
  }

  // check down
  if (
    startingPos.y < height &&
    (temp = scanTile(input[startingPos.y + 1][startingPos.x])) &&
    (temp == Tile.NORTH_WEST ||
      temp == Tile.NORTH_EAST ||
      temp == Tile.VERTICAL)
  ) {
    console.log("Traversing South");
    const len = traverseMap(startingPos.x, startingPos.y + 1, Direction.DOWN);
    console.log(`South: ${len}`);
  } else {
    console.log(`Cannot travel South`);
  }

  // check right
  if (
    startingPos.x < width &&
    (temp = scanTile(input[startingPos.y][startingPos.x + 1])) &&
    (temp == Tile.NORTH_WEST ||
      temp == Tile.SOUTH_WEST ||
      temp == Tile.HORIZONTAL)
  ) {
    console.log(`Traversing West`);
    const len = traverseMap(startingPos.x + 1, startingPos.y, Direction.RIGHT);
    console.log(`West: ${len}`);
  } else {
    console.log(`Cannot travel West`);
  }

  // check left
  if (
    startingPos.x > 0 &&
    (temp = scanTile(input[startingPos.y][startingPos.x - 1])) &&
    (temp == Tile.NORTH_EAST ||
      temp == Tile.SOUTH_EAST ||
      temp == Tile.HORIZONTAL)
  ) {
    console.log(`Traversing East`);
    const len = traverseMap(startingPos.x - 1, startingPos.y, Direction.LEFT);
    console.log(`East: ${len}`);
  } else {
    console.log(`Cannot travel East`);
  }

  if (isPartTwo) {
    // Part 2: find all enclosed tiles
    throw new Error("Unimplemented");
  } else {
    // Part 1: find max distance
    const maxDist: { distance: number; x: number; y: number } = {
      distance: 0,
      x: startingPos.x,
      y: startingPos.y
    };
    for (let y = 0; y < height; y++) {
      for (let x = 0; x < width; x++) {
        const dist = distances[`${x};${y}`] ?? -1;
        if (dist <= maxDist.distance) continue;
        maxDist.distance = dist;
        maxDist.x = x;
        maxDist.y = y;
      }
    }

    console.log(`Max distance is ${maxDist.distance}`);
  }
}

main();
