interface RemovalInstruction {
  label: string;
  operation: "-";
  focalLength?: undefined;
}

interface InsertionInstruction {
  label: string;
  operation: "=";
  focalLength: number;
}

export type Instruction = RemovalInstruction | InsertionInstruction;

export function parseInstruction(instructStr: string) {
  let instruction: Instruction;
  const match = instructStr.match(/^([a-z]+)(-$|=\d+$)/);
  if (!match) {
    throw new Error(`Could not parse instruction '${instructStr}'`);
  }

  if (match[2] == "-") {
    instruction = { label: match[1], operation: "-" };
  } else {
    instruction = {
      label: match[1],
      operation: "=",
      focalLength: Number(match[2].slice(1))
    };
    if (isNaN(instruction.focalLength)) {
      throw new Error(
        `Could not parse focal length of instruction '${instructStr}'`
      );
    }
  }

  return instruction;
}
