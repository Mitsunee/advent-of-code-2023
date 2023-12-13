import { rotatePattern } from "./rotatePattern";

export interface PatternReflection {
  direction: "horizontal" | "vertical";
  afterIdx: number;
}

function findHorizontalReflection(pattern: string[], ignoreIdx?: number) {
  const idx = pattern.findIndex((_, idx, pattern) => {
    if (idx + 1 == pattern.length) return false; // don't try for last row
    if (pattern[idx] != pattern[idx + 1]) return false;
    if (idx == ignoreIdx) return false;

    // loop where i is distance from starting pair
    for (let i = 1; idx - i >= 0; i++) {
      const idxUp = idx - i;
      const idxDown = idx + 1 + i;
      if (!pattern[idxUp] || !pattern[idxDown]) return true; // reached end of pattern
      if (pattern[idxUp] != pattern[idxDown]) return false; // this pair doesn't reflect
    }

    return true;
  });

  if (idx >= 0) {
    return {
      direction: "horizontal",
      afterIdx: idx
    } satisfies PatternReflection;
  }
}

export function findReflection(pattern: string[], ignore?: PatternReflection) {
  let result: PatternReflection | undefined;

  // try for horizontal reflection
  result = findHorizontalReflection(
    pattern,
    ignore?.direction == "horizontal" ? ignore.afterIdx : undefined
  );
  if (result) return result;

  // try for vertical reflection
  const rotated = rotatePattern(pattern);
  result = findHorizontalReflection(
    rotated,
    ignore?.direction == "vertical" ? ignore.afterIdx : undefined
  );
  if (result) return { ...result, direction: "vertical" as const };
}
