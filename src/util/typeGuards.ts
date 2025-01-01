/**
 * @param target
 * @returns target이 object이며 null이 아닐 경우 `true` 그렇지 않을 경우 `false`.
 */
export function isNonNullObject(target: unknown): target is object {
  return typeof target === "object" && target !== null;
}
