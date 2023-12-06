import { Command, Option } from "@commander-js/extra-typings";
import { getInputFileAsLines } from "~/utils/getInputFile";
import { parseInput } from "./parseInput";
import { runRace } from "./runRace";

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
  const isPartTwo = opts.part === "2";
  const input = await getInputFileAsLines(opts.file);
  const races = parseInput(input, isPartTwo);
  let result = 1;

  if (!isPartTwo) console.log(`Found ${races.length} races in data\n`);

  for (let i = 0; i < races.length; i++) {
    const race = races[i];
    let timeHeld = 0;
    let validResults = 0;
    for (; runRace(race, timeHeld) <= race.distance; timeHeld++); // skip forward until the first winning result
    for (; timeHeld <= race.time; timeHeld++) {
      if (runRace(race, timeHeld) <= race.distance) break; // found next failing result
      validResults++;
    }

    console.log(`Race ${i} has ${validResults} winning results`);
    result *= validResults;
  }

  if (!isPartTwo) {
    console.log(`\nFactor of each races winning results: ${result}`);
  }
}

main();
