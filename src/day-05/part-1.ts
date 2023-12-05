import { Command } from "@commander-js/extra-typings";
import { getInputFileAsLines } from "~/utils/getInputFile";
import { getSeeds } from "./getSeedsFromInput";
import { findMapByTitle } from "./findMapByTitle";
import { getNextMapKey } from "./getNextMapKey";
import { mapValue } from "./mapValue";

const program = new Command().requiredOption(
  "-f, --file <path>",
  "path to input file"
);

async function main() {
  program.parse();
  const opts = program.opts();
  const input = await getInputFileAsLines(opts.file);
  const currentValues = getSeeds(input[0]);
  let currentMapKey = "seed-to-";
  let map: ReturnType<typeof findMapByTitle>;

  while ((map = findMapByTitle(currentMapKey, input))) {
    console.log(`Current values: ${currentValues.join(" ")}\n`);
    console.log(`Processing map '${map.title}'`);

    for (let i = 0; i < currentValues.length; i++) {
      currentValues[i] = mapValue(currentValues[i], map.values);
    }

    currentMapKey = getNextMapKey(map.title);
  }

  console.log(`\nFinal values: ${currentValues.join(" ")}`);
  console.log(`Smallest value: ${Math.min.apply(null, currentValues)}`);
}

main();
