import type { Colour, CubeAmounts } from "./types";

function isValidColour(str: string): str is Colour {
  return str == "red" || str == "blue" || str == "green";
}

export function analyzeGameSampleValue(str: string) {
  const [amountStr, colour] = str.split(" ");
  const amount = +amountStr;
  if (isNaN(amount) || !isValidColour(colour)) {
    throw new Error(`Could not parse sample '${str}'`);
  }
  return { colour, amount };
}

export function analyzeGameSample(str: string) {
  const vals = str.split(",").map(v => v.trim());
  const amounts: Partial<CubeAmounts> = {};

  for (const val of vals) {
    const { colour, amount } = analyzeGameSampleValue(val);
    amounts[colour] = (amounts[colour] || 0) + amount; // should this be Math.max?
  }

  return amounts;
}

export function analyzeGame(gameStr: string) {
  const listStart = gameStr.indexOf(": ");
  if (listStart < 6) {
    throw new Error(`Could not find start of list for game '${gameStr}'`);
  }

  const gameId = +gameStr.slice(5, listStart);
  if (isNaN(gameId)) {
    throw new Error(`Could not parse game id for game '${gameStr}'`);
  }

  const cubes: CubeAmounts = gameStr
    .slice(listStart + 2)
    .split("; ")
    .reduce(
      (totals, gameSampleStr) => {
        const gameSample = analyzeGameSample(gameSampleStr);
        totals.red = Math.max(gameSample.red || 0, totals.red);
        totals.blue = Math.max(gameSample.blue || 0, totals.blue);
        totals.green = Math.max(gameSample.green || 0, totals.green);
        return totals;
      },
      { red: 0, blue: 0, green: 0 }
    );

  return { id: gameId, cubes };
}
