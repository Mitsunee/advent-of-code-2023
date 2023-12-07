export const CardStrength = {
  "2": 0,
  "3": 1,
  "4": 2,
  "5": 3,
  "6": 4,
  "7": 5,
  "8": 6,
  "9": 7,
  T: 8,
  J: 9,
  Q: 10,
  K: 11,
  A: 12
} as const;

export type CardName = Extract<keyof typeof CardStrength, string>;

export function isCardName(str: string): str is CardName {
  return /^[2-9AKQJT]$/.test(str);
}

export const HandStrength = {
  NoMatch: 0,
  OnePair: 1,
  TwoPair: 2,
  ThreeMatch: 3,
  FullHouse: 4,
  FourMatch: 5,
  FiveMatch: 6
} as const;

export type HandType = Extract<keyof typeof HandStrength, string>;

export interface CamelCardHand {
  /**
   * Bid of the Hand as number
   */
  bid: number;
  /**
   * Cards in Hand (in order) as tuple
   */
  cards: CardName[] & { 0: CardName; length: 5 };
  /**
   * Strength of card pairs
   */
  type: HandType;
}

export type CardCounts = Partial<Record<CardName, number>>;
