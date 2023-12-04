import { Command } from "@commander-js/extra-typings";
import { getInputFileAsLines } from "~/utils/getInputFile";
import { findNumbers } from "./findNumbers";
import { validateNumber } from "./validateNumber";

const program = new Command().requiredOption(
  "-f, --file <path>",
  "path to input file"
);

async function main() {
  program.parse();
  const opts = program.opts();
  const lines = await getInputFileAsLines(opts.file);
  let sum = 0;

  for (let i = 0; i < lines.length; i++) {
    findNumbers(lines[i])
      .filter(info => validateNumber(info, i, lines))
      .forEach(info => {
        console.log(
          `Found valid number ${info.value} in line ${i} from ${info.start} to ${info.end}`
        );
        sum += info.value;
      });
  }

  console.log(`Final sum: ${sum}`);
}

main();
