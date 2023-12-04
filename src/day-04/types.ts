export interface CardInfo {
  id: number;
  /**
   * Numbers that win in the game
   */
  winning: number[];
  /**
   * Numbers on this card
   */
  have: number[];
  /**
   * See Part 2
   */
  instances: number;
}
