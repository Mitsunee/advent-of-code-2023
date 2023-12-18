import { Direction } from "./types";
import { List } from "@foxkit/list";

export interface DiggerGridPosition {
  x: number;
  y: number;
}

type PosStr = `${number};${number}`;
type PosTuple = [number, number];

export class DiggerGrid {
  grid: string[][];
  #width = 1;
  #height = 1;
  pos: DiggerGridPosition;

  constructor() {
    this.grid = [["#"]];
    this.pos = { x: 0, y: 0 };
  }

  get width() {
    return this.#width;
  }

  get height() {
    return this.#height;
  }

  /**
   * Expands grid by given amount in given direction. When expanding up or left
   * the digger position is also updated to reflect the expansion
   * @param direction Direction to expand towards
   * @param amount Amount of tiles to expand by
   */
  expand(direction: Direction, amount: number) {
    if (amount < 1) return this;
    switch (direction) {
      case Direction.UP:
        for (let i = 0; i < amount; i++)
          this.grid.unshift(Array(this.#width).fill("."));
        this.pos.y += amount; // update position
        break;
      case Direction.DOWN:
        for (let i = 0; i < amount; i++)
          this.grid.push(Array(this.#width).fill("."));
        break;
      case Direction.LEFT:
        for (let row = 0; row < this.#height; row++) {
          for (let i = 0; i < amount; i++) this.grid[row].unshift(".");
        }
        this.pos.x += amount; // update position
        break;
      case Direction.RIGHT:
        for (let row = 0; row < this.#height; row++) {
          for (let i = 0; i < amount; i++) this.grid[row].push(".");
        }
        break;
    }

    this.#height = this.grid.length; // update height
    this.#width = this.grid[0].length; // update width

    return this;
  }

  /**
   * Makes sure there is plenty of space to perform a digging operation
   * @param direction Direction to dig towards
   * @param amount Amount of Tiles to dig
   */
  prepareDig(direction: Direction, amount: number) {
    switch (direction) {
      case Direction.UP:
        return this.expand(direction, amount - this.pos.y);
      case Direction.DOWN:
        return this.expand(direction, amount - this.#height + this.pos.y + 1);
      case Direction.LEFT:
        return this.expand(direction, amount - this.pos.x);
      case Direction.RIGHT:
        return this.expand(direction, amount - this.#width + this.pos.x + 1);
    }
  }

  dig(direction: Direction, amount: number) {
    if (amount < 1) return this;
    this.prepareDig(direction, amount);
    for (let i = 0; i < amount; i++) {
      switch (direction) {
        case Direction.UP:
          this.pos.y--;
          break;
        case Direction.DOWN:
          this.pos.y++;
          break;
        case Direction.LEFT:
          this.pos.x--;
          break;
        case Direction.RIGHT:
          this.pos.x++;
          break;
      }
      this.grid[this.pos.y][this.pos.x] = "#";
    }

    return this;
  }

  // I'd love to see a visualization of this
  private fillFindProtected() {
    const protectedTiles: Partial<Record<PosStr, boolean>> = {};
    const queue = new List<PosTuple>();
    const queued = new Set<PosStr>();

    const addToQueue = ([x, y]: PosTuple) => {
      const key: PosStr = `${x};${y}`;
      if (queued.has(key)) return;
      queue.push([x, y]);
      queued.add(key);
    };

    // protect tiles around the edge
    for (let y = 0; y < this.#height; y++) {
      if (y == 0 || y == this.#height - 1) {
        for (let x = 0; x < this.#width; x++) {
          if (this.grid[y][x] == ".") addToQueue([x, y]);
        }
      } else {
        if (this.grid[y][0] == ".") addToQueue([0, y]);
        if (this.grid[y][this.#width - 1] == ".") {
          addToQueue([this.#width - 1, y]);
        }
      }
    }

    const protect = ([x, y]: PosTuple) => {
      const key: PosStr = `${x};${y}`;
      protectedTiles[key] = true;

      if (y > 0 && this.grid[y - 1][x] == ".") {
        addToQueue([x, y - 1]);
      }
      if (x > 0 && this.grid[y][x - 1] == ".") {
        addToQueue([x - 1, y]);
      }
      if (y + 1 < this.#height && this.grid[y + 1][x] == ".") {
        addToQueue([x, y + 1]);
      }
      if (x + 1 < this.#width && this.grid[y][x + 1] == ".") {
        addToQueue([x + 1, y]);
      }
    };

    // work through queue
    let curr: PosTuple | undefined;
    while ((curr = queue.shift())) {
      protect(curr);
    }

    return protectedTiles;
  }

  /**
   * Assumes the grid path contains a loop and attempts to fill it
   */
  fill() {
    const protectedTiles = this.fillFindProtected();
    for (let y = 1; y < this.#height - 1; y++) {
      for (let x = 1; x < this.#width - 1; x++) {
        if (this.grid[y][x] == "." && !protectedTiles[`${x};${y}`]) {
          this.grid[y][x] = "#";
        }
      }
    }
  }

  stringify(includePos?: boolean) {
    return this.grid
      .map((row, y) => {
        // usecase for Array.prototype.with right here
        if (includePos && y == this.pos.y) {
          const clone = [...row];
          clone[this.pos.x] = "P";
          return clone.join("");
        }
        return row.join("");
      })
      .join("\n");
  }
}
