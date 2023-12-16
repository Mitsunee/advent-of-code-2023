/* eslint-disable no-fallthrough */
import { Direction, DirectionToName } from "./types";

/**
 * Gets new directions based on tile
 * @param tile Tile as string
 * @param direction Travel direction the tile is entered from
 * @returns Array of directions
 */
export function getNewDirection(
  tile: string,
  direction: Direction
): Direction[] {
  switch (tile) {
    case ".":
      return [direction];
    case "/":
      switch (direction) {
        case Direction.UP:
          return [Direction.RIGHT];
        case Direction.DOWN:
          return [Direction.LEFT];
        case Direction.LEFT:
          return [Direction.DOWN];
        case Direction.RIGHT:
          return [Direction.UP];
      }
    case "\\":
      switch (direction) {
        case Direction.UP:
          return [Direction.LEFT];
        case Direction.DOWN:
          return [Direction.RIGHT];
        case Direction.LEFT:
          return [Direction.UP];
        case Direction.RIGHT:
          return [Direction.DOWN];
      }
    case "|":
      switch (direction) {
        case Direction.UP:
        case Direction.DOWN:
          return [direction];
        case Direction.LEFT:
        case Direction.RIGHT:
          return [Direction.UP, Direction.DOWN];
      }
    case "-":
      switch (direction) {
        case Direction.UP:
        case Direction.DOWN:
          return [Direction.LEFT, Direction.RIGHT];
        case Direction.LEFT:
        case Direction.RIGHT:
          return [direction];
      }
    default: {
      throw new Error(
        `Unsupported Tile or Direction:\n${JSON.stringify(
          { tile, direction: DirectionToName[direction] || direction },
          null,
          2
        )}`
      );
    }
  }
}
