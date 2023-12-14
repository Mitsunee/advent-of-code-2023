export function findHistoryRepetition(history: number[]) {
  const mid = Math.floor(history.length / 2);
  for (let i = 2; i <= mid; i++) {
    const rightSlice = history.slice(-1 * i);
    if (rightSlice.every(n => n == rightSlice[0])) continue; // skip if all numbers are the same
    const right = rightSlice.join(",");
    const left = history.slice(-2 * i, -1 * i).join(",");
    if (right == left) return i;
  }
}
