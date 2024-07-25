export function findMedianSortedArrays(
  nums1: number[],
  nums2: number[]
): number {
  // [1, 2, 31, 32]
  // [10, 11, 12, 20, 21, 22]

  // h
  // - number of items in first half
  // - for even - equal to full / 2
  // - for odd - equal to (full - 1) / 2
  // h1 is between Math.max(0, l1 - h) and Math.min(h, l1)
  // h2 is between Math.max(0, l2 - h) and Math.min(h, l2)
  // h1 + h2 = h
  // do binary search for h1
  // we found the correct cutoff if both of these are fulfulled:
  // - h2 at max || nums1[h1] >= nums2[h2 - 1]
  // - h1 at max || nums2[h2] >= nums1[h1 - 1]
  // both cannot be false with given precondition because:
  //   if nums1[h1] is smaller than nums2[h2 - 1]
  //   then it cannot be that nums2[h2] (>= nums2[h2 - 1])
  //   is at the same time smaller than nums1[h1 - 1] (<= nums1[h1])
  // if one of the conditions is false:
  // - first is false - increase h1
  // - second is false - decrease h1
  // algorithm
  // - set start and end to limits of h1
  // - set mid = Math.floor((start + end) / 2)
  // - if first is false -> start = mid + 1; end unchanged
  // - if second is false -> end = mid - 1; start unchanged
  // - if both true, then you found your index
  // - it should never occur that end < start, only end === start, but make additional check for end <= start, and break the loop on it (return start as index)
  // result
  // - for even
  //   - represents the index of first value in upper half (either h1 or h2)
  //   - Math.min(nums1[h1], nums2[h2]) is the first value of upper half (ignore if h1 === l1 / h2 === l2)
  //   - Math.max(nums1[h1 - 1], nums2[h2 - 1]) is the last value of lower half (ignore if h1 === 0 / h2 === 0)
  // - for odd
  //   - represents the index of center (either h1 or h2)
  //   - Math.min(nums1[h1], nums2[h2]) is the first value of upper half (ignore if h1 === l1 / h2 === l2)

  const [h1, h2, even] = binarySearch(nums1, nums2);

  if (even) {
    const v1High = nums1[h1] ?? Number.MAX_SAFE_INTEGER;
    const v2High = nums2[h2] ?? Number.MAX_SAFE_INTEGER;
    const vHigh = Math.min(v1High, v2High);

    const v1Low = nums1[h1 - 1] ?? -Number.MAX_SAFE_INTEGER;
    const v2Low = nums2[h2 - 1] ?? -Number.MAX_SAFE_INTEGER;
    const vLow = Math.max(v1Low, v2Low);

    return (vLow + vHigh) / 2;
  } else {
    const v1 = nums1[h1] ?? Number.MAX_SAFE_INTEGER;
    const v2 = nums2[h2] ?? Number.MAX_SAFE_INTEGER;
    const vMedian = Math.min(v1, v2);
    return vMedian;
  }
}

function binarySearch(
  nums1: number[],
  nums2: number[]
): readonly [number, number, boolean] {
  const l1 = nums1.length;
  const l2 = nums2.length;
  const full = l1 + l2;

  const even = full % 2 === 0;

  const h = even ? full / 2 : (full - 1) / 2;

  const h1Min = Math.max(0, l1 - h - (even ? 0 : 1));
  const h1Max = Math.min(h, l1);
  // const h2Min = Math.max(0, l2 - h - (even ? 0 : 1));
  const h2Max = Math.min(h, l2);

  let start = h1Min;
  let end = h1Max;

  while (start <= end) {
    const h1 = Math.floor((start + end) / 2);
    const h2 = h - h1;

    const cond1 = h1 === h1Max || nums1[h1] >= nums2[h2 - 1];
    const cond2 = h2 === h2Max || nums2[h2] >= nums1[h1 - 1];

    if (cond1 && cond2) {
      return [h1, h2, even];
    } else if (!cond1) {
      start = h1 + 1;
    } else if (!cond2) {
      end = h1 - 1;
    } else {
      throw new Error("Should not happen (1).");
    }
  }

  throw new Error("Should not happen (2).");
}
