import { Command } from "@commander-js/extra-typings";
import { getInputFileAsLines } from "~/utils/getInputFile";
import { analyzeCard } from "./analyzeCard";
import { getSharedNums } from "~/utils/getSharedNums";

const program = new Command().requiredOption(
  "-f, --file <path>",
  "path to input file"
);

async function main() {
  program.parse();
  const opts = program.opts();
  const input = await getInputFileAsLines(opts.file);
  const cards = input.slice(0, -1).map(cardStr => analyzeCard(cardStr));
  let sum = 0;

  for (const card of cards) {
    const sharedNums = getSharedNums(card.winning, card.have);
    const points = sharedNums < 1 ? 0 : Math.pow(2, sharedNums - 1);
    console.log(
      `Card ${card.id} has ${sharedNums} winning numbers (${points} points)`
    );
    sum += points;
  }

  console.log(`\nFinal Sum: ${sum}`);
}

main();
