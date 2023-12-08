import { Command, Option } from "@commander-js/extra-typings";
import { getInputFileAsLines } from "~/utils/getInputFile";
import { parseInput } from "./parseInput";
import { leastCommonMultiple } from "~/utils/leastCommonMultiple";
import { createMapTraverser } from "./traverseMap";

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
  const { instructions, lookup } = parseInput(input);
  const traverseMap = createMapTraverser(instructions, lookup);

  console.log(
    `Found ${instructions.length} instructions and ${lookup.size} Map Nodes`
  );

  if (isPartTwo) {
    const startingNodes = Array.from(lookup.values()).filter(node =>
      node.name.endsWith("A")
    );
    console.log(`Found ${startingNodes.length} starting nodes:`);
    console.log(`${startingNodes.map(node => node.name).join(", ")}`);
    const stepsToFinish = startingNodes.map(node => {
      const steps = traverseMap(node, name => name.endsWith("Z"));
      console.log(`Node ${node.name} needs ${steps} to finish`);
      return steps;
    });
    const result = leastCommonMultiple(...stepsToFinish);
    console.log(`${result} steps taken`);
  } else {
    const start = lookup.get("AAA");
    if (!start) throw new Error("Could not find starting node 'AAA'");
    const result = traverseMap(start, "ZZZ");
    console.log(`${result} steps taken`);
  }
}

main();
