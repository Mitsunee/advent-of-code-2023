import { strContainsSymbol } from "./strContainsSymbol";
import type { NumberInfo } from "./types";

export function validateNumber(
  info: NumberInfo,
  lineIdx: number,
  input: string[]
) {
  const line = input[lineIdx];
  const sliceStart = Math.max(0, info.start - 1);
  const sliceEnd = info.end + 2; // + 2 because this idx is exclusive while info.end is inclusive

  // check to the left (if applicable)
  if (info.start - 1 >= 0 && strContainsSymbol(line[info.start - 1])) {
    return true;
  }

  // check to the right (if applicable)
  if (info.end + 1 < line.length && strContainsSymbol(line[info.end + 1])) {
    return true;
  }

  // check line before (if applicable)
  if (
    lineIdx > 0 &&
    strContainsSymbol(input[lineIdx - 1].slice(sliceStart, sliceEnd))
  ) {
    return true;
  }

  // check line after (if applicable)
  if (
    lineIdx + 1 < input.length &&
    strContainsSymbol(input[lineIdx + 1].slice(sliceStart, sliceEnd))
  ) {
    return true;
  }

  // all checks failed
  return false;
}
