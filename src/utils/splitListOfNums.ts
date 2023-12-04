export function splitListOfNums(
  str: string,
  deliminator: string | RegExp = " "
) {
  return str
    .trim()
    .split(deliminator)
    .map(n => {
      const trimmed = n.trim();
      if (trimmed === "") return NaN;
      return Number(trimmed);
    });
}
