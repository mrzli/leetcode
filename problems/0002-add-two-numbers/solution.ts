class ListNode {
  val: number;
  next: ListNode | null;
  constructor(val?: number, next?: ListNode | null) {
    this.val = val === undefined ? 0 : val;
    this.next = next === undefined ? null : next;
  }
}

export function addTwoNumbers(
  l1: ListNode | null,
  l2: ListNode | null
): ListNode | null {
  return addTwoNumbersImpl(l1, l2, 0);
}

function addTwoNumbersImpl(
  l1: ListNode | null,
  l2: ListNode | null,
  carry: number
): ListNode | null {
  const d1 = l1?.val ?? 0;
  const d2 = l2?.val ?? 0;
  const sum = d1 + d2 + carry;
  const d = sum % 10;
  const newCarry = Math.floor(sum / 10);

  const newL1 = l1?.next ?? null;
  const newL2 = l2?.next ?? null;

  const restNode =
    newL1 !== null || newL2 !== null
      ? addTwoNumbersImpl(newL1, newL2, newCarry)
      : newCarry > 0
      ? new ListNode(newCarry)
      : null;

  return new ListNode(d, restNode);
}
