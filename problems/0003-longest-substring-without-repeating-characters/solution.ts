export function lengthOfLongestSubstring(s: string): number {
  let i = 0;
  let j = 0;

  let max = 0;

  const currChars = new Set<string>();

  while (j < s.length) {
    const c2 = s[j];
    if (currChars.has(c2)) {
      const diff = j - i;
      if (diff > max) {
        max = diff;
      }

      currChars.delete(s[i]);
      i++;
    } else {
      currChars.add(c2);
      j++;
    }
  }

  const diff = j - i;
  if (diff > max) {
    max = diff;
  }

  return max;
}
