export const enum Direction {
  UP,
  DOWN,
  LEFT,
  RIGHT
}

export interface DiggerInstruction {
  direction: Direction;
  amount: number;
}
