import { splitListOfNums } from "~/utils/splitListOfNums";

export function findMapByTitle(startOfTitle: string, input: string[]) {
  const mapValues = new Array<number[]>();

  for (let line = 1; line < input.length; line++) {
    if (!input[line].startsWith(startOfTitle)) continue;
    const fullTitle = input[line].replace(/:$/, "");
    while (input[++line]?.trim()) {
      mapValues.push(splitListOfNums(input[line]));
    }
    return { title: fullTitle, values: mapValues };
  }

  return;
}
