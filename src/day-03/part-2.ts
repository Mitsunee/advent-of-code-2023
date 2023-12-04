import { Command } from "@commander-js/extra-typings";
import { getInputFileAsLines } from "~/utils/getInputFile";
import { findValidGears } from "./findValidGears";

const program = new Command().requiredOption(
  "-f, --file <path>",
  "path to input file"
);

async function main() {
  program.parse();
  const opts = program.opts();
  const lines = await getInputFileAsLines(opts.file);
  const sum = findValidGears(lines).reduce((sum, val) => sum + val, 0);

  console.log(`Final sum: ${sum}`);
}

main();
