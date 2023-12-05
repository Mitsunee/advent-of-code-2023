import { splitListOfNums } from "~/utils/splitListOfNums";

export function getSeeds(input: string) {
  if (!input.startsWith("seeds: ")) throw new Error("Bad input");
  return splitListOfNums(input.slice(7));
}

export function getSeedRanges(input: string) {
  const values = getSeeds(input);
  if (values.length % 2) {
    console.warn(`Uneven amount of members in seeds input list`);
  }

  const ranges = new Array<[number, number]>();
  for (let i = 0; i + 1 < values.length; i += 2) {
    ranges.push([values[i], values[i + 1]]);
  }

  return ranges;
}
