import { isNumeric } from "~/utils/isNumeric";
import type { NumberInfo } from "./types";

export function findNumbers(str: string) {
  const numbers = new Array<NumberInfo>();

  for (let i = 0; i < str.length; i++) {
    if (isNumeric(str[i])) {
      const start = i;
      let value = 0;
      for (; i < str.length && isNumeric(str[i]); i++) {
        value = value * 10 + Number(str[i]);
      }
      numbers.push({ value, start, end: i - 1 });
    }
  }

  return numbers;
}
