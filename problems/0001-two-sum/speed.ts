export function twoSum(nums: number[], target: number): number[] {
  const l = nums.length;

  const map = new Map<number, number[]>();
  for (let i = 0; i < l; i++) {
    const n = nums[i];
    const list = map.get(n);
    if (list === undefined) {
      map.set(n, [i]);
    } else {
      list.push(i);
    }
  }

  for (let i = 0; i < l; i++) {
    const first = nums[i];
    const second = target - first;
    const potentialSecondIndexes = map.get(second);
    if (potentialSecondIndexes === undefined) {
      continue;
    }

    const numIndexes = potentialSecondIndexes.length;
    for (let j = 0; j < numIndexes; j++) {
      if (potentialSecondIndexes[j] !== i) {
        return [i, potentialSecondIndexes[j]];
      }
    }
  }

  return [];
}
