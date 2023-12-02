import type { CubeAmounts } from "./types";

export function getGamePower(cubes: CubeAmounts) {
  return cubes.red * cubes.green * cubes.blue;
}
