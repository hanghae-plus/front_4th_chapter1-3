/**
 * 두 객체가 완전히 동일한지 비교하는 함수
 * @param objA 비교할 첫 번째 객체
 * @param objB 비교할 두 번째 객체
 * @returns 두 객체가 완전히 동일하면 true, 그렇지 않으면 false
 */
export function shallowEquals<T>(objA: T, objB: T): boolean {
  // 참조 비교
  if (objA === objB) return true;

  // 둘 중 하나라도 객체가 아니면 비교하지 않음
  if (typeof objA !== "object" || typeof objB !== "object") return false;

  // null 비교
  if (objA === null || objB === null) return false;

  // 두 객체의 키 개수가 다르면 비교하지 않음
  const keysA = Object.keys(objA);
  const keysB = Object.keys(objB);
  if (keysA.length !== keysB.length) return false;

  // 두 객체의 키 개수가 같으면 비교
  for (const key of keysA) {
    // 두 객체에 키가 없거나 키의 값이 다르면 비교하지 않음
    if (
      !Object.prototype.hasOwnProperty.call(objB, key) ||
      objA[key as keyof typeof objA] !== objB[key as keyof typeof objB]
    ) {
      return false;
    }
  }

  return true;
}
