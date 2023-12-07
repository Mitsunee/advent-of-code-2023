import { Command, Option } from "@commander-js/extra-typings";
import { getInputFileAsLines } from "~/utils/getInputFile";
import { analyzeHand } from "./analyzeHand";
import { sortHands, sortHandsWithJokerRule } from "./sortHands";

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
  if (isPartTwo) console.log("Using Joker Rule");
  const input = await getInputFileAsLines(opts.file);

  const hands = input.map(str => analyzeHand(str, isPartTwo));
  const sorter = isPartTwo ? sortHandsWithJokerRule : sortHands;
  hands.sort(sorter);

  const winnings = hands.reduce<number>((total, hand, idx) => {
    return total + (idx + 1) * hand.bid;
  }, 0);

  console.log(`Found ${hands.length} hands in input`);
  console.log(`Total Winnings: ${winnings}`);

  // DEBUG
  if (isPartTwo) {
    console.assert(winnings > 252818442, "We know it's more than this");
  } else {
    console.assert(
      winnings === 253313241,
      "We know part 1 is a different result"
    );
  }
}

main();
