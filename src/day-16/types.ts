export const enum Direction {
  UP,
  DOWN,
  LEFT,
  RIGHT
}

export const DirectionToName = {
  [Direction.UP]: "up" as const,
  [Direction.DOWN]: "down" as const,
  [Direction.LEFT]: "left" as const,
  [Direction.RIGHT]: "right" as const
} satisfies Record<Direction, string>;
export type DirectionName = (typeof DirectionToName)[Direction];

/**
 * Memo of Tile in GridTraverser with coordinates x and y, as well
 * as checklist for which direction this tile has been entered from
 * before
 */
export type EnergizedTileMemo = {
  x: number;
  y: number;
} & Partial<Record<DirectionName, true>>;

export type Tile = "." | "/" | "\\" | "|" | "-";
export type TileKey = `${number};${number}`;
export type TileMap = Partial<Record<TileKey, EnergizedTileMemo>>;
