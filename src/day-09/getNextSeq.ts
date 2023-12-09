export function getNextSeq(seq: number[]) {
  return seq.slice(0, -1).map((_, i) => seq[i + 1] - seq[i]);
}
