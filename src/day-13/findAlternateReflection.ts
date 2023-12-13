import type { PatternReflection } from "./findReflection";
import { findReflection } from "./findReflection";

const delim = "$";

export function findAlternateReflection(
  pattern: string[],
  reflection: PatternReflection
) {
  const patternStr = pattern.join(delim); // didn't wanna deal with arrays here

  for (let i = 0; i < patternStr.length; i++) {
    if (patternStr[i] == delim) continue; // don't flip line deliminators lol
    const newPattern = `${patternStr.slice(0, i)}${
      patternStr[i] == "." ? "#" : "."
    }${patternStr.slice(i + 1)}`.split(delim);
    const newReflection = findReflection(newPattern, reflection);
    if (newReflection) return newReflection;
  }
}
