/**
 * Returns array of numbers shared between two arrays
 * @param a Array of Numbers
 * @param b Array of Numbers
 * @returns Array of shared Numbers
 */
export function getSharedNums(a: number[], b: number[]) {
  const checkedNums = new Set<number>();
  return a.reduce((shared, num) => {
    if (checkedNums.has(num)) return shared;
    checkedNums.add(num);
    if (b.includes(num)) return shared + 1;
    return shared;
  }, 0);
}
