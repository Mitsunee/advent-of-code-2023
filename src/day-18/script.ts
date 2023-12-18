import { Command, Option } from "@commander-js/extra-typings";
import { getInputFileAsLines } from "~/utils/getInputFile";
import { parseInstruction } from "./parseInstruction";
import { DiggerGrid } from "./DiggerGrid";

const program = new Command()
  .requiredOption("-f, --file <path>", "path to input file")
  .addOption(
    new Option("-p, --part <choice>", "Part 1 or 2").choices([
      "1",
      "2"
    ] as const)
  )
  .addOption(new Option("--print", "Print grid when done"));

async function main() {
  program.parse();
  const opts = program.opts();
  const isPartTwo = opts.part == "2";
  const input = await getInputFileAsLines(opts.file);
  const instructions = input.map(line => parseInstruction(line, isPartTwo));
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
