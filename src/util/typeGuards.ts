/**
 * @param target
 * @returns target이 object이며 null이 아닐 경우 `true` 그렇지 않을 경우 `false`.
 */
export function isNonNullObject(target: unknown): target is object {
  return typeof target === "object" && target !== null;
}

/**
 * 주어진 객체에 특정 키가 자체 속성으로 존재하는지 확인한다.
 * @param {unknown} object - 검사할 대상
 * @param {string} key - 객체에서 존재 여부를 확인할 키.
 * @returns {object is Record<string, unknown>} - 대상이 `object`타입이며,
 *   `key`가 해당 객체의 자체 속성일 경우 `true` 그렇지 않으면 `false`
 */
export function hasOwnKey(
  object: unknown,
  key: string,
): object is Record<string, unknown> {
  if (!isNonNullObject(object)) return false;
  return Object.prototype.hasOwnProperty.call(object, key);
}
