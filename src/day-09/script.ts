import { Command, Option } from "@commander-js/extra-typings";
import { getInputFileAsLines } from "~/utils/getInputFile";
import { splitListOfNums } from "~/utils/splitListOfNums";
import { predictNextValue } from "./predictNextValue";
import { predictPrevValue } from "./predictPrevValue";

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
  const predict = isPartTwo ? predictPrevValue : predictNextValue;

  const sequences = input.map(line => splitListOfNums(line));
  const result = sequences.reduce<number>((sum, seq) => {
    return sum + predict(seq);
  }, 0);

  console.log(`Result: ${result}`);
}

main();
