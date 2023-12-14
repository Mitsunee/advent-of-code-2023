export function getValueOfGrid(input: string[] | string[][]) {
  return input.reduce<number>((sum, row, idx) => {
    const rowValue = input.length - idx;
    const rowUnits = Array.isArray(row)
      ? row.filter(v => v == "O").length
      : row.replace(/[^O]/g, "").length;
    return sum + rowUnits * rowValue;
  }, 0);
}
