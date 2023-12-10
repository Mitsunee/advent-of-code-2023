import { Direction, Tile } from "./types";

export function getNewDirection(tile: Tile, direction: Direction): Direction {
  const e = new Error(
    `Incorrectly entering ${tile} tile from direction ${direction}`
  );

  switch (tile) {
    case Tile.VERTICAL: {
      // |
      switch (direction) {
        case Direction.UP:
        case Direction.DOWN:
          return direction;
        default:
          throw e;
      }
    }
    case Tile.HORIZONTAL: {
      // -
      switch (direction) {
        case Direction.LEFT:
        case Direction.RIGHT:
          return direction;
        default:
          throw e;
      }
    }
    case Tile.NORTH_EAST: {
      // L
      switch (direction) {
        case Direction.DOWN:
          return Direction.RIGHT;
        case Direction.LEFT:
          return Direction.UP;
        default:
          throw e;
      }
    }
    case Tile.NORTH_WEST: {
      // J
      switch (direction) {
        case Direction.DOWN:
          return Direction.LEFT;
        case Direction.RIGHT:
          return Direction.UP;
        default:
          throw e;
      }
    }
    case Tile.SOUTH_WEST: {
      // 7
      switch (direction) {
        case Direction.UP:
          return Direction.LEFT;
        case Direction.RIGHT:
          return Direction.DOWN;
        default:
          throw e;
      }
    }
    case Tile.SOUTH_EAST: {
      // F
      switch (direction) {
        case Direction.UP:
          return Direction.RIGHT;
        case Direction.LEFT:
          return Direction.DOWN;
        default:
          throw e;
      }
    }
    default: {
      throw new Error(`Start and Blank tiles have no travel direction`);
    }
  }
}
