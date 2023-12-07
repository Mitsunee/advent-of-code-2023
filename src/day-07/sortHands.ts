import type { CamelCardHand } from "./types";
import { CardStrength, HandStrength } from "./types";

export function sortHands(a: CamelCardHand, b: CamelCardHand): number {
  const strengthA = HandStrength[a.type];
  const strengthB = HandStrength[b.type];

  if (strengthA != strengthB) return strengthA - strengthB;

  for (let i = 0; i < a.cards.length; i++) {
    const cardStrengthA = CardStrength[a.cards[i]];
    const cardStrengthB = CardStrength[b.cards[i]];
    if (cardStrengthA == cardStrengthB) continue;
    return cardStrengthA - cardStrengthB;
  }

  return 0;
}

export function sortHandsWithJokerRule(
  a: CamelCardHand,
  b: CamelCardHand
): number {
  const strengthA = HandStrength[a.type];
  const strengthB = HandStrength[b.type];

  if (strengthA != strengthB) return strengthA - strengthB;

  for (let i = 0; i < a.cards.length; i++) {
    let cardStrengthA = CardStrength[a.cards[i]];
    if (cardStrengthA == 9) cardStrengthA = 0;
    else if (cardStrengthA < 9) cardStrengthA++;

    let cardStrengthB = CardStrength[b.cards[i]];
    if (cardStrengthB == 9) cardStrengthB = 0;
    else if (cardStrengthB < 9) cardStrengthB++;

    if (cardStrengthA == cardStrengthB) continue;
    return cardStrengthA - cardStrengthB;
  }

  return 0;
}
