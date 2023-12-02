import { Command } from "@commander-js/extra-typings";
import { getInputFileFromArg } from "~/utils/getInputFileFromArg";
import { optionTypeNumber } from "~/utils/optionTypeNumber";
import { analyzeGame } from "./analyzeGame";

const program = new Command()
  .requiredOption("-f, --file <path>", "path to input file")
  .requiredOption("-r, --red <number>", "amount of red cubes", optionTypeNumber)
  .requiredOption(
    "-b, --blue <number>",
    "amount of blue cubes",
    optionTypeNumber
  )
  .requiredOption(
    "-g, --green <number>",
    "amount of green cubes",
    optionTypeNumber
  );

async function main() {
  program.parse();
  const opts = program.opts();
  const input = await getInputFileFromArg(opts.file);
  const games = input.split("\n");
  let sum = 0;

  console.log(
    `Checking for games with no more than ${opts.red} red cubes, ${opts.blue} blue cubes and ${opts.green} green cubes...\n`
  );

  for (const gameStr of games) {
    if (gameStr === "") continue; // skip empty lines
    const game = analyzeGame(gameStr);
    if (
      game.cubes.red <= opts.red &&
      game.cubes.blue <= opts.blue &&
      game.cubes.green <= opts.green
    ) {
      console.log(`Game id ${game.id} passes: ${JSON.stringify(game.cubes)}`);
      sum += game.id;
    }
  }

  console.log(`\nFinal sum of IDs: ${sum}`);
}

main();
