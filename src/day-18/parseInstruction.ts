import type { DiggerInstruction } from "./types";
import { Direction } from "./types";

function parseDirection(dirStr: string) {
  switch (dirStr) {
    case "U":
      return Direction.UP;
    case "D":
      return Direction.DOWN;
    case "L":
      return Direction.LEFT;
    case "R":
      return Direction.RIGHT;
    default:
      throw new Error(`Could not parse direction: ${dirStr}`);
  }
}

function parsePartTwo(notAColour: string) {
  let direction: Direction;
  const amount = Number(`0x${notAColour.slice(0, -1)}`);
  if (isNaN(amount)) {
    throw new Error(`Could not parse part 2 instruction amount: ${notAColour}`);
  }

  switch (notAColour[5]) {
    case "0":
      direction = Direction.RIGHT;
      break;
    case "1":
      direction = Direction.DOWN;
      break;
    case "2":
      direction = Direction.LEFT;
      break;
    case "3":
      direction = Direction.UP;
      break;
    default:
      throw new Error(
        `Could not parse part 2 instruction direction: ${notAColour}`
      );
  }

  return { direction, amount };
}

export function parseInstruction(
  instructionStr: string,
  isPartTwo: boolean
): DiggerInstruction {
  const match = instructionStr.match(/([URLD]) (\d+) \(#([a-f0-9]{5}[0-3])\)/);
  if (!match) {
    throw new Error(`Could not parse instruction: ${instructionStr}`);
  }

  return isPartTwo
    ? parsePartTwo(match[3])
    : {
        direction: parseDirection(match[1]),
        amount: Number(match[2])
      };
}
