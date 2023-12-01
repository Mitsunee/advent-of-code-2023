const numWords = [
  "one",
  "two",
  "three",
  "four",
  "five",
  "six",
  "seven",
  "eight",
  "nine"
];

/**
 * Extracts all numbers written as digit or number word from string
 * @param str Input string
 * @returns Array of numbers
 */
export function extractNumbers(str: string) {
  const numbers = new Array<number>();

  for (let i = 0; i < str.length; i++) {
    if (/^\d$/.test(str[i])) {
      numbers.push(+str[i]);
      continue;
    }

    // check words
    const remaining = str.slice(i);
    if (!/^[a-z]/.test(remaining)) continue; // skip other characters
    for (let j = 0; j < numWords.length; j++) {
      const word = numWords[j];
      if (remaining.startsWith(word)) {
        numbers.push(j + 1);
        // NOTE: this would be needed if overlap between numbers is not allowed?
        //i += word.length - 1;
        break;
      }
    }
  }

  return numbers;
}
