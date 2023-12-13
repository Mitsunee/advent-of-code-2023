import type { PatternReflection } from "./findReflection";

export function getReflectionSummary(reflection: PatternReflection) {
  return (
    (reflection.afterIdx + 1) * (reflection.direction == "horizontal" ? 100 : 1)
  );
}
