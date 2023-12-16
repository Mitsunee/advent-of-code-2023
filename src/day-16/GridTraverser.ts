import col from "picocolors";
import { getNewDirection } from "./getNewDirection";
import type { TileKey, TileMap } from "./types";
import { DirectionToName, Direction } from "./types";

export class GridTraverser {
  grid: string[];
  memo: TileMap = {};

  constructor(grid: string[]) {
    this.grid = grid;
  }

  get visitedTiles() {
    return Object.values(this.memo).length;
  }

  private static getMemoKey(x: number, y: number): TileKey {
    return `${x};${y}`;
  }

  resetMemo() {
    this.memo = {};
  }

  traverse(x: number, y: number, direction: Direction) {
    const tileKey = GridTraverser.getMemoKey(x, y);
    const tile = this.grid[y][x];
    const dirKey = DirectionToName[direction];
    const memo = (this.memo[tileKey] ??= { x, y });

    // skip if this tile was traveled in this direction before
    if (memo[dirKey]) return;

    // set direction as traveled and get new direction based on tile
    memo[dirKey] = true;
    const directions = getNewDirection(tile, direction);

    // traverse in the new directions
    for (const newDirection of directions) {
      switch (newDirection) {
        case Direction.UP:
          if (y <= 0) continue; // went off map, byebye
          this.traverse(x, y - 1, newDirection);
          break;
        case Direction.DOWN:
          if (y + 1 >= this.grid.length) continue;
          this.traverse(x, y + 1, newDirection);
          break;
        case Direction.LEFT:
          if (x <= 0) continue;
          this.traverse(x - 1, y, newDirection);
          break;
        case Direction.RIGHT:
          if (x + 1 >= this.grid[y].length) continue;
          this.traverse(x + 1, y, newDirection);
          break;
      }
    }
  }

  prettyPrint() {
    for (let y = 0; y < this.grid.length; y++) {
      for (let x = 0; x < this.grid[y].length; x++) {
        const key = GridTraverser.getMemoKey(x, y);
        const tile = this.grid[y][x];
        process.stdout.write(
          this.memo[key] ? col.bgYellow(col.black(tile)) : tile
        );
      }
      process.stdout.write("\n");
    }
  }
}
