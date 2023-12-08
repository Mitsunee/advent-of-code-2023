function greatestCommonDenominator(x: number, y: number): number {
  return y === 0 ? x : greatestCommonDenominator(y, x % y);
}

export function leastCommonMultiple(...numbers: number[]) {
  const result = numbers.reduce(
    (x, y) => (x * y) / greatestCommonDenominator(x, y)
  );
  if (isNaN(result)) return 0;
  return result;
}
