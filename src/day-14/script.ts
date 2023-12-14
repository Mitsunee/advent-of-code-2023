import { Command, Option } from "@commander-js/extra-typings";
import { getInputFileAsLines } from "~/utils/getInputFile";
import { Direction, cycleGrid, moveGrid } from "./moveGrid";
import { getValueOfGrid } from "./getValueOfGrid";

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
  const transformed = isPartTwo
    ? cycleGrid(input, 1000000000)
    : moveGrid(input, Direction.UP);
  const value = getValueOfGrid(transformed);
  console.log(`Total load: ${value}`);
}

main();
