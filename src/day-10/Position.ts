import { scanTile } from "./scanTile";

export type PositionStr = `${number};${number}`;

export class Position {
  x: number;
  y: number;

  constructor(x = 0, y = 0) {
    this.x = x;
    this.y = y;
  }

  scan(input: string[]) {
    return scanTile(input[this.y][this.x]);
  }

  toString() {
    return `${this.x};${this.y}` as const;
  }

  static fromString(str: PositionStr) {
    const [x, y] = str.split(";");
    return new Position(+x, +y);
  }
}
