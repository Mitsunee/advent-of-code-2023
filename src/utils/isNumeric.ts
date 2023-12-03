export function isNumeric(str: string): str is `${number}` {
  return /^\d+$/.test(str);
}
