export function getNextMapKey(currentMap: string) {
  return currentMap.split("-to-")[1].replace(/ map:?$/, "");
}
