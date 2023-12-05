import { Command } from "@commander-js/extra-typings";
import { getInputFileAsLines } from "~/utils/getInputFile";
import { getSeedRanges } from "./getSeedsFromInput";
import { findMapByTitle } from "./findMapByTitle";
import { getNextMapKey } from "./getNextMapKey";
import { mapValue } from "./mapValue";

const program = new Command().requiredOption(
  "-f, --file <path>",
  "path to input file"
);

type MapType = ReturnType<typeof findMapByTitle>;
type InputRange = [number, number];

async function main() {
  program.parse();
  const opts = program.opts();
  const input = await getInputFileAsLines(opts.file);
  const inputRanges = getSeedRanges(input[0]).map(
    v => [v[0], v[0] + v[1] - 1] as InputRange
  );
  const maps: NonNullable<MapType>[] = [];
  let smallest = Number.MAX_SAFE_INTEGER;

  // find all maps from input
  {
    let currentKey = "seed-to";
    let map: MapType | undefined;

    while ((map = findMapByTitle(currentKey, input))) {
      console.log(`Found map ${map.title}`);
      maps.push(map);
      currentKey = getNextMapKey(map.title);
    }
  }

  for (const [start, end] of inputRanges) {
    console.log(`Bruteforcing seeds ${start} to ${end}`);
    for (let i = start; i <= end; i++) {
      const result = maps.reduce<number>(
        (val, map) => mapValue(val, map.values),
        i
      );
      if (result < smallest) {
        console.log(`New smallest result: ${result}`);
        smallest = result;
      }
    }
  }

  console.log(`Final smallest value: ${smallest}`);
}

main();
