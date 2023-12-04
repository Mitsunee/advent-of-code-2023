import { splitListOfNums } from "~/utils/splitListOfNums";
import type { CardInfo } from "./types";

export function analyzeCard(cardStr: string) {
  const listStart = cardStr.indexOf(": ");
  const cardId = +cardStr.slice(5, listStart);
  const [numbersWinning, numbersHave] = cardStr
    .slice(listStart + 2)
    .split(" | ")
    .map(str => splitListOfNums(str, / +/));

  const cardInfo: CardInfo = {
    id: cardId,
    winning: numbersWinning,
    have: numbersHave,
    instances: 1
  };

  return cardInfo;
}
