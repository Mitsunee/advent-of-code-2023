export function mapValue(value: number, map: number[][]) {
  const range = map.find(
    range => range[1] <= value && range[1] + range[2] - 1 >= value
  );
  if (!range) return value;

  const [dest, src] = range;
  const diff = dest - src;
  return value + diff;
}
