export interface BoatRace {
  time: number;
  distance: number;
}

function parserPartOne(input: string[]) {
  function parseInputLine(line: string) {
    return line
      .replace(/\s{2,}/g, ",")
      .split(",")
      .slice(1);
  }

  const races = new Array<BoatRace>();
  const times = parseInputLine(input[0]);
  const distances = parseInputLine(input[1]);

  if (times.length != distances.length) {
    throw new Error("Invalid Input data");
  }

  for (let i = 0; i < times.length; i++) {
    races.push({
      time: +times[i],
      distance: +distances[i]
    });
  }

  return races;
}

function parserPartTwo(input: string[]) {
  function parseInputLine(line: string) {
    const normalized = line.replace(/\s/g, "");
    const endOfLabel = normalized.indexOf(":");
    return Number(normalized.slice(endOfLabel + 1));
  }

  const race: BoatRace = {
    time: parseInputLine(input[0]),
    distance: parseInputLine(input[1])
  };

  return [race];
}

export function parseInput(input: string[], isPartTwo: boolean) {
  const parser = isPartTwo ? parserPartTwo : parserPartOne;
  return parser(input);
}
