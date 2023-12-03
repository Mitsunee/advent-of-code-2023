import { getInputFileFromArg } from "~/utils/getInputFileFromArg";
import { extractNumbers } from "./extractNumbers";
import { extractNumbersStrict } from "./extractNumbersStrict";

// TODO: better arg handling maybe?

async function main() {
  if (process.argv[2] == "--help") {
    console.log(
      `Arguments:\n\tpath [part]\n\npath: Path to input file\npart: Either 1 or 2 (default: 1)`
    );
    return;
  }
  const extractor =
    process.argv[3] == "2" ? extractNumbers : extractNumbersStrict;
  const input = await getInputFileFromArg();
  const result = input.split("\n").reduce((res, line) => {
    const numbers = extractor(line);
    if (numbers.length < 1) return res;
    const val = numbers[0] * 10 + numbers[numbers.length - 1];
    return res + val;
  }, 0);
  console.log(result);
}

main();
