/**
 * Generates list of all possible number pairs from 1 to n (inclusive)
 * @param n Last digit to include
 * @returns Array of Tuples
 */
export function getListOfPairs(n: number) {
  if (n < 2) return [];
  const output = new Array<[number, number]>();

  for (let i = 2; i <= n; i++) {
    for (let j = 1; j < i; j++) {
      output.push([j, i]);
    }
  }

  return output;
}
