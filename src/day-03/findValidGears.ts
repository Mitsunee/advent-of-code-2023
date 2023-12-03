import { findNumbers } from "./findNumbers";
import type { NumberInfo } from "./types";

export function findValidGears(lines: string[], silent = false) {
  const gears = new Array<number>();
  const lineNumbersCache = new Array<NumberInfo[] | undefined>(lines.length);

  for (let lineIdx = 0; lineIdx < lines.length; lineIdx++) {
    const line = lines[lineIdx];
    const start = line.indexOf("*"); // find *
    if (start < 0) continue; // skip line if no *

    for (let pos = start; pos < line.length; pos++) {
      if (line[pos] !== "*") continue;
      const adjacentNumbers = new Array<NumberInfo>();

      // check same row
      (lineNumbersCache[lineIdx] ??= findNumbers(line))
        .filter(number => number.end == pos - 1 || number.start == pos + 1)
        .forEach(number => adjacentNumbers.push(number));

      // check row above if applicable
      if (lineIdx > 0) {
        (lineNumbersCache[lineIdx - 1] ??= findNumbers(lines[lineIdx - 1]))
          .filter(number => number.start <= pos + 1 && number.end >= pos - 1)
          .forEach(number => adjacentNumbers.push(number));
      }

      // check row below if applicable
      if (lineIdx + 1 < lines.length) {
        (lineNumbersCache[lineIdx + 1] ??= findNumbers(lines[lineIdx + 1]))
          .filter(number => number.start <= pos + 1 && number.end >= pos - 1)
          .forEach(number => adjacentNumbers.push(number));
      }

      if (adjacentNumbers.length !== 2) continue;
      const pow = adjacentNumbers[0].value * adjacentNumbers[1].value;
      if (!silent) {
        console.log(
          `Found valid gear in line ${lineIdx} (pos: ${pos}) with power ${pow}`
        );
      }
      gears.push(pow);
    }
  }

  return gears;
}
