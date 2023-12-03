/**
 * Extracts all numeric digits from string
 * @param str Input string
 * @returns Array of numbers
 */
export function extractNumbersStrict(str: string) {
  const numbers = new Array<number>();

  for (let i = 0; i < str.length; i++) {
    const val = str[i];
    if (/^\d$/.test(val)) numbers.push(+val);
  }

  return numbers;
}
