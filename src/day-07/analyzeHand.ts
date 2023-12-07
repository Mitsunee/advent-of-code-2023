import { isNumeric } from "~/utils/isNumeric";
import type { CamelCardHand, CardName, CardCounts } from "./types";
import { isCardName } from "./types";
import { getHandType } from "./getHandType";

function typeGuardTuple(arr: CardName[]): arr is CamelCardHand["cards"] {
  return arr.length == 5;
}

function getCardsTupleFromStr(cardsStr: string) {
  const cards = new Array<CardName>();

  for (let i = 0; i < cardsStr.length; i++) {
    const card = cardsStr[i];
    if (!isCardName(card)) {
      throw new Error(`Invalid card ${card} in hand: '${cardsStr}'`);
    }

    cards.push(card);
  }

  if (!typeGuardTuple(cards)) {
    throw new Error(`Incorrect amount of cards in hand: '${cardsStr}'`);
  }

  return cards;
}

function getCardCounts(cards: CamelCardHand["cards"], joker: CardName = "J") {
  const cardCounts: CardCounts = {};

  for (const card of cards) {
    const key = card == "J" ? joker : card;
    cardCounts[key] = (cardCounts[key] ?? 0) + 1;
  }

  return cardCounts;
}

function getTypeWithJokerRule(
  cards: CamelCardHand["cards"]
): CamelCardHand["type"] {
  const counts = getCardCounts(cards);
  // return early with initial counts if no jokers found
  if ((counts.J || 0) == 0) return getHandType(cards, counts);

  let joker: CardName = "J";
  const countEntries = Object.entries(counts) as [CardName, number][];

  for (let i = 4; i > 0; i--) {
    const entry = countEntries.find(entry => entry[1] == i && entry[0] != "J");
    if (!entry) continue;
    joker = entry[0];
    break;
  }

  const countsReplaced = getCardCounts(cards, joker);
  const cardsReplaced = cards.map(card =>
    card == "J" ? joker : card
  ) as CamelCardHand["cards"];
  const type = getHandType(cardsReplaced, countsReplaced);

  // DEBUG:
  /* console.log(
    `${cards.join("")} | joker: ${joker} | replaced: ${cardsReplaced.join(
      ""
    )} | type: ${type.padEnd(10, " ")}`
  ); */

  return type;
}

export function analyzeHand(input: string, jokerRule: boolean) {
  const [cardsStr, bidStr] = input.split(" ");
  if (cardsStr.length != 5 || !isNumeric(bidStr)) {
    throw new Error(`Invalid input: '${input}'`);
  }
  const cards = getCardsTupleFromStr(cardsStr);
  let type: CamelCardHand["type"];

  if (jokerRule) {
    type = getTypeWithJokerRule(cards);
  } else {
    const counts = getCardCounts(cards);
    type = getHandType(cards, counts);
  }

  const hand: CamelCardHand = {
    bid: Number(bidStr),
    cards,
    type
  };

  return hand;
}
