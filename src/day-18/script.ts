import { Command, Option } from "@commander-js/extra-typings";
import { getInputFileAsLines } from "~/utils/getInputFile";
import { parseInstruction } from "./parseInstruction";
import { DiggerGrid } from "./DiggerGrid";
import { Direction } from "./types";

const program = new Command()
  .requiredOption("-f, --file <path>", "path to input file")
  .addOption(
    new Option(
      "-p, --part <choice>",
      "Part 1, 2 or debug (wikipedia example)"
    ).choices(["1", "2", "debug"] as const)
  )
  .addOption(
    new Option("--print", "Print grid when done (not supported in part 2)")
  );

// TODO: move to separate file
function shoeLace(coords: [number, number][]) {
  // shoutout to Tipa for pointing me at wikipedia page for this algorithm :3
  // see https://gamepad.club/@Tipa/111602172381821299
  let xA = coords[0][0];
  let yA = coords[0][1];
  let area = 0;

  for (let i = 1; i <= coords.length; i++) {
    const [xB, yB] = coords[i == coords.length ? 0 : i];
    area += xA * yB;
    area -= yA * xB;
    // after
    xA = xB;
    yA = yB;
  }

  area /= 2;
  return area;
}

async function main() {
  program.parse();
  const opts = program.opts();

  // TODO: refactor this into a unit test
  if (opts.part == "debug") {
    // see https://en.wikipedia.org/wiki/Shoelace_formula#Example
    console.log(
      shoeLace([
        [1, 6],
        [3, 1],
        [7, 2],
        [4, 4],
        [8, 5]
      ])
    );
    process.exit(0);
  }

  const isPartTwo = opts.part == "2";
  const input = await getInputFileAsLines(opts.file);
  const instructions = input.map(line => parseInstruction(line, isPartTwo));
  // Part 2 can only be done with math because the numbers are too big
  if (isPartTwo) {
    let x = 0;
    let y = 0;
    const coords: [number, number][] = instructions.map(
      ({ direction, amount }) => {
        switch (direction) {
          case Direction.UP:
            y -= amount;
            break;
          case Direction.DOWN:
            y += amount;
            break;
          case Direction.LEFT:
            x -= amount;
            break;
          case Direction.RIGHT:
            x += amount;
            break;
        }
        return [x, y];
      }
    );

    const area = shoeLace(coords);
    console.log({ area });
    process.exit(0);
  }

  // part 1 can be done with DiggerGrid class (I don't wanna delete this :c)
  const grid = new DiggerGrid();

  for (const instruction of instructions) {
    grid.dig(instruction.direction, instruction.amount);
  }

  grid.fill();
  const stringified = grid.stringify();
  const tiles = stringified.replace(/[^#]+/g, "").length;

  if (opts.print) {
    console.log(`${stringified}\n`);
  }

  console.log(` Width: ${grid.width}`);
  console.log(`Height: ${grid.height}`);
  console.log(`Dug a total of ${tiles} tiles`);
}

main();
