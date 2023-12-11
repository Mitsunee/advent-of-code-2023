import { Command } from "@commander-js/extra-typings";
import { getInputFileAsLines } from "~/utils/getInputFile";
import { optionTypeNumber } from "~/utils/optionTypeNumber";
import { getListOfPairs } from "./getListOfPairs";

const program = new Command()
  .requiredOption("-f, --file <path>", "path to input file")
  .requiredOption(
    "-e, --expand-by <number>",
    "Amount by which to expand empty rows/cols (use 2 for part 1, 1000000 for part 2)",
    optionTypeNumber
  );

async function main() {
  program.parse();
  const opts = program.opts();
  const input = await getInputFileAsLines(opts.file);
  const expansionFactor = opts.expandBy < 1 ? 1000000 : opts.expandBy;
  console.log(`Expanding empty rows/cols by ${expansionFactor}`);

  const emptyCols = new Array<number>();
  const emptyRows = new Array<number>();
  const galaxies = new Array<[number, number]>();

  // find empty rows and galaxies
  for (let y = 0; y < input.length; y++) {
    const row = input[y];
    if (row.includes("#")) {
      for (let x = 0; x < row.length; x++) {
        if (row[x] == "#") galaxies.push([x, y]);
      }
    } else {
      emptyRows.push(y);
    }
  }

  // find empty columns
  for (let x = 0; x < input[0].length; x++) {
    if (input.every(row => row[x] == ".")) emptyCols.push(x);
  }

  console.log(
    `Found ${emptyRows.length} empty rows and ${emptyCols.length} empty columns`
  );
  const pairs = getListOfPairs(galaxies.length);
  console.log(`Found ${galaxies.length} galaxies (${pairs.length} pairs)`);
  let sumOfDistances = 0;

  for (const [idxA, idxB] of pairs) {
    const a = galaxies[idxA - 1];
    const b = galaxies[idxB - 1];
    const distance =
      // horizontal distance
      Math.max(a[0], b[0]) -
      Math.min(a[0], b[0]) +
      // vertical distance
      Math.max(a[1], b[1]) -
      Math.min(a[1], b[1]) +
      // adjust for empty columns
      emptyCols.filter(
        col => col > Math.min(a[0], b[0]) && col < Math.max(a[0], b[0])
      ).length *
        (expansionFactor - 1) +
      // adjust for empty rows
      emptyRows.filter(
        row => row > Math.min(a[1], b[1]) && row < Math.max(a[1], b[1])
      ).length *
        (expansionFactor - 1);

    console.log(
      `Distance between Galaxy #${idxA} (${JSON.stringify(
        a
      )}) and #${idxB} (${JSON.stringify(b)}): ${distance}`
    );
    sumOfDistances += distance;
  }

  console.log(`Total sum of distances between all pairs: ${sumOfDistances}`);
}

main();
