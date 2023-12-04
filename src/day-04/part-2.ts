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
  const cards = input.map(cardStr => analyzeCard(cardStr));
  let sum = 0;

  // winning more cards
  for (let i = 0; i < cards.length; i++) {
    const card = cards[i];
    const sharedNums = getSharedNums(card.winning, card.have);
    for (let j = i + 1; j <= i + sharedNums && j < cards.length; j++) {
      cards[j].instances += card.instances;
    }
    console.log(`Card ${card.id} has ${card.instances} instances`);
    sum += card.instances;
  }

  console.log(`\nFinal Sum: ${sum}`);
}

main();
