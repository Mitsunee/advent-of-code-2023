import { Command, Option } from "@commander-js/extra-typings";
import { getInputFileAsLines } from "~/utils/getInputFile";
import { parseInput } from "./parseInput";
import { isAcceptedPart } from "./isAcceptedPart";

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
  const { parts, workflows } = parseInput(input);
  let sum = 0;

  console.log(
    `Found ${parts.length} parts and ${
      Object.keys(workflows).length
    } workflows\n`
  );

  if (isPartTwo) {
    throw new Error("Unimplemented");
  }

  // Part 1
  for (let i = 0; i < parts.length; i++) {
    const part = parts[i];
    if (!isAcceptedPart(part, workflows)) {
      console.log(`Part ${i + 1} is not accepted`);
      continue;
    }

    const total = part.x + part.m + part.a + part.s;
    console.log(`Part ${i + 1} is accepted with total value: ${total}`);
    sum += total;
  }

  console.log(`\nTotal sum of all part values: ${sum}`);
}

main();
