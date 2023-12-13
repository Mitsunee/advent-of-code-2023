/**
 * Rotates pattern so a vertical reflection can be found with the algorith
 * searching for a horizontal reflection
 * ```
 * 123456789
 *     ><
 * #.##..##.
 * ..#.##.#.
 * ##......#
 * ##......#
 * ..#.##.#.
 * ..##..##.
 * #.#.##.#.
 *
 * to
 *
 * 1 #.##..#
 * 2 ..##...
 * 3 ##..###
 * 4 #....#. \/
 * 5 .#..#.# /\
 * 6 .#..#.#
 * 7 #....#.
 * 8 ##..###
 * 9 ..##...
 * ```
 */
export function rotatePattern(pattern: string[]) {
  const len = pattern[0].length;
  const newPattern: string[] = Array(len).fill("");

  for (const row of pattern) {
    for (let i = 0; i < row.length; i++) {
      newPattern[i] += row[i];
    }
  }

  return newPattern;
}
