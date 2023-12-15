import { Command, Option } from "@commander-js/extra-typings";
import { getInputFileAsLines } from "~/utils/getInputFile";
import { hashString } from "./hashString";
import type { Lens } from "./types";
import { List } from "@foxkit/list";
import { parseInstruction } from "./parseInstruction";

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
  const [input] = await getInputFileAsLines(opts.file); // input is expected to be single-line!
  const values = input.split(",");
  let sum = 0;
  console.log(
    `Found ${values.length} ${isPartTwo ? "instructions" : "values"}`
  );

  if (isPartTwo) {
    const boxes = Array.from({ length: 256 }, () => new List<Lens>());

    for (const value of values) {
      const instruction = parseInstruction(value);
      const box = boxes[hashString(instruction.label)];

      if (instruction.operation == "=") {
        const lens = box.find(lens => lens.label == instruction.label);
        if (!lens) {
          box.push({
            label: instruction.label,
            focalLength: instruction.focalLength
          });
        } else {
          lens.focalLength = instruction.focalLength;
        }
      } else {
        const lensIdx = box.findIndex(lens => lens.label == instruction.label);
        if (lensIdx >= 0) {
          box.remove(lensIdx, 1);
        }
      }
    }

    boxes.forEach((box, boxIdx) => {
      box.forEach((lens, lensIdx) => {
        const power = (boxIdx + 1) * (lensIdx + 1) * lens.focalLength;
        console.log(`Lens ${lens.label} in Box #${boxIdx + 1}: ${power}`);
        sum += power;
      });
    });
  } else {
    for (const value of values) {
      sum += hashString(value);
    }
  }

  console.log(`\nTotal sum: ${sum}`);
}

main();
