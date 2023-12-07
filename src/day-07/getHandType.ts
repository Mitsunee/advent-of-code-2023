import type { CamelCardHand, CardCounts, CardName, HandType } from "./types";

export function getHandType(
  cards: CamelCardHand["cards"],
  cardCounts: CardCounts
): HandType {
  const uniqueCards = Object.keys(cardCounts) as CardName[];
  if (cardCounts[cards[0]] == 5) return "FiveMatch";
  if (uniqueCards.length == 5) return "NoMatch";

  for (const card of cards) {
    switch (cardCounts[card]) {
      case 2: {
        switch (uniqueCards.length) {
          case 2:
            return "FullHouse";
          case 3:
            return "TwoPair";
          case 4:
            return "OnePair";
          default:
            throw new Error(
              `Could not parse Card amounts for hand with at least one pair: ${JSON.stringify(
                cards
              )}`
            );
        }
      }
      case 3:
        return uniqueCards.length == 2 ? "FullHouse" : "ThreeMatch";
      case 4:
        return "FourMatch";
    }
  }

  throw new Error(
    `Could not parse Card amounts for hand: ${JSON.stringify(cards)}`
  );
}
