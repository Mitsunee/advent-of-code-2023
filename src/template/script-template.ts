import { Command, Option } from "@commander-js/extra-typings";
import { getInputFileAsLines } from "~/utils/getInputFile";

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
  if (isPartTwo) throw new Error("Unimplemented"); // NOTE: remove when doing part 2
  const _input = await getInputFileAsLines(opts.file);

  // remove _ above
  // code goes here
  // glhf
}

main();
