export function hashString(str: string) {
  let res = 0;
  for (let i = 0; i < str.length; i++) {
    res = ((res + str.charCodeAt(i)) * 17) % 256;
  }
  return res;
}
