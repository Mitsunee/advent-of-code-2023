import { getNextSeq } from "./getNextSeq";

export function predictPrevValue(seq: number[]): number {
  if (seq.every(n => n == 0)) return 0; // base case;
  const nextSeq = getNextSeq(seq);
  const nextSeqPrevVal = predictPrevValue(nextSeq);
  const result = seq[0] - nextSeqPrevVal;

  /*   // DEBUG
  const nMax = Math.max.apply(null, seq);
  const w = nMax.toString().length;
  const prettyPrint = (s: number[]) =>
    s.map(n => n.toString().padStart(w, " ")).join(" ".repeat(w + 2));
  console.log(prettyPrint(seq));
  console.log(`${" ".repeat(w + 1)}${prettyPrint(nextSeq)}`);
  console.log(`Predicted for next seq: ${nextSeqPrevVal}`);
  console.log(`Predicted for curr seq: ${result}\n`); */

  return result;
}
