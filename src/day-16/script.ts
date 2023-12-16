import { Command, Option } from "@commander-js/extra-typings";
import { getInputFileAsLines } from "~/utils/getInputFile";
import { GridTraverser } from "./GridTraverser";
import { Direction } from "./types";

const program = new Command()
  .requiredOption("-f, --file <path>", "path to input file")
  .addOption(
    new Option("-p, --part <choice>", "Part 1 or 2").choices([
      "1",
      "2"
    ] as const)
  )
  .addOption(new Option("--pretty", "Prettyprint grid when done"));

async function main() {
  program.parse();
  const opts = program.opts();
  const isPartTwo = opts.part == "2";
  const input = await getInputFileAsLines(opts.file);
  const traverser = new GridTraverser(input);
  // use traverser
  traverser.traverse(0, 0, Direction.RIGHT);
  const best = {
    x: 0,
    y: 0,
    direction: Direction.RIGHT,
    val: traverser.visitedTiles
  };

  function trial(x: number, y: number, direction: Direction) {
    traverser.resetMemo();
    traverser.traverse(x, y, direction);
    const val = traverser.visitedTiles;
    if (val > best.val) Object.assign(best, { x, y, direction, val });
  }

  if (isPartTwo) {
    const yMax = input.length - 1;
    const xMax = input[0].length - 1;
    // try rest of combinations
    for (let y = 0; y <= yMax; y++) {
      if (y > 0) trial(0, y, Direction.RIGHT); // left edge
      trial(xMax, y, Direction.LEFT); // right edge
    }
    for (let x = 0; x <= xMax; x++) {
      trial(x, 0, Direction.DOWN); // top edge
      trial(x, yMax, Direction.UP); // bottom edge
    }

    // redo best trial to set it for output
    // (haha tech debt from implementing prettyprint during part 1)
    trial(best.x, best.y, best.direction);
  }

  // output
  if (opts.pretty) {
    process.stdout.write("\n");
    traverser.prettyPrint();
  }
  console.log(`\nEnergized Tiles: ${traverser.visitedTiles}`);
}

main();
