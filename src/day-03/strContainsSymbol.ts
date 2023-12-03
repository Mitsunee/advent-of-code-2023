/**
 * Tests if a string contains a "symbol" as per instructions of AoC 2023 Day 3
 * @param str input string
 * @returns boolean
 */
export function strContainsSymbol(str: string) {
  return /[^0-9.]/.test(str);
}
