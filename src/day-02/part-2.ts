import { Command } from "@commander-js/extra-typings";
import { getInputFileAsLines } from "~/utils/getInputFile";
import { analyzeGame } from "./analyzeGame";
import { getGamePower } from "./getGamePower";

const program = new Command().requiredOption(
  "-f, --file <path>",
  "path to input file"
);

async function main() {
  program.parse();
  const opts = program.opts();
  const games = await getInputFileAsLines(opts.file);
  let sum = 0;

  console.log(`Adding game power of all games...\n`);

  for (const gameStr of games) {
    if (gameStr === "") continue; // skip empty lines
    const game = analyzeGame(gameStr);
    const gamePower = getGamePower(game.cubes);
    console.log(`Game ${game.id}: ${gamePower}`);
    sum += gamePower;
  }

  console.log(`\nFinal sum of IDs: ${sum}`);
}

main();
