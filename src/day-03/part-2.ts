import { Command } from "@commander-js/extra-typings";
import { getInputFileFromArg } from "~/utils/getInputFileFromArg";
import { findValidGears } from "./findValidGears";

const program = new Command().requiredOption(
  "-f, --file <path>",
  "path to input file"
);

async function main() {
  program.parse();
  const opts = program.opts();
  const input = await getInputFileFromArg(opts.file);
  const lines = input.split("\n");
  const sum = findValidGears(lines).reduce((sum, val) => sum + val, 0);

  console.log(`Final sum: ${sum}`);
}

main();
