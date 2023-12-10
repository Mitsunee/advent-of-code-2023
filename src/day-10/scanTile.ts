import { Tile } from "./types";

export function scanTile(tile: string) {
  switch (tile) {
    case "S":
      return Tile.START;
    case "-":
      return Tile.HORIZONTAL;
    case "|":
      return Tile.VERTICAL;
    case "L":
      return Tile.NORTH_EAST;
    case "J":
      return Tile.NORTH_WEST;
    case "7":
      return Tile.SOUTH_WEST;
    case "F":
      return Tile.SOUTH_EAST;
    default:
      return Tile.BLANK;
  }
}
