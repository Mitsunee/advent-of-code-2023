import type { BoatRace } from "./parseInput";

export function runRace(race: BoatRace, timeHeld: number) {
  return timeHeld * (race.time - timeHeld);
}
