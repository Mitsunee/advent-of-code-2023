import { InvalidArgumentError } from "@commander-js/extra-typings";

export function optionTypeNumber(value: string) {
  const numVal = parseInt(value);
  if (isNaN(numVal)) throw new InvalidArgumentError("Value must be integer");
  return numVal;
}
