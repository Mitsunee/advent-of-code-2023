import { Command, Option } from "@commander-js/extra-typings";
import { getInputFileAsLines } from "~/utils/getInputFile";
import { findReflection } from "./findReflection";
import { getReflectionSummary } from "./getReflectionSummary";
import { findAlternateReflection } from "./findAlternateReflection";

const program = new Command()
  .requiredOption("-f, --file <path>", "path to input file")
  .addOption(
    new Option("-p, --part <choice>", "Part 1 or 2").choices([
      "1",
      "2"
    ] as const)
  );

function separatePatterns(input: string[]) {
  const patterns = new Array<string[]>();

  for (let i = 0; i < input.length; i++) {
    const pattern = new Array<string>();
    for (; i < input.length; i++) {
      if (!input[i]) break;
      pattern.push(input[i]);
    }
    patterns.push(pattern);
  }

  return patterns;
}

async function main() {
  program.parse();
  const opts = program.opts();
  const isPartTwo = opts.part == "2";
  const input = await getInputFileAsLines(opts.file);
  const patterns = separatePatterns(input);
  console.log(`Found ${patterns.length} patterns`);

  let sum = 0;

  for (let i = 0; i < patterns.length; i++) {
    const pattern = patterns[i];
    const reflection = findReflection(pattern);
    if (!reflection) {
      throw new Error(`Found no reflection in pattern ${i + 1}`);
    }

    if (isPartTwo) {
      // Is Part 2, bruteforce for new reflection where one . or # is inverted
      const altReflection = findAlternateReflection(pattern, reflection);
      if (!altReflection) {
        throw new Error(
          `Could not find alternate reflection for pattern ${i + 1}`
        );
      }

      // updateSummary
      sum += getReflectionSummary(altReflection);
    } else {
      // Is Part 1, simply update summary with this reflection
      // update summary
      sum += getReflectionSummary(reflection);
    }
  }

  console.log(`Total pattern Summary: ${sum}`);
}

main();
