export function twoSum(nums: number[], target: number): number[] {
  const l = nums.length;
  for (let i = 0; i < l; i++) {
    const first = nums[i];

    for (let j = i + 1; j < l; j++) {
      if (first + nums[j] === target) {
        return [i, j];
      }
    }
  }

  return [];
}
