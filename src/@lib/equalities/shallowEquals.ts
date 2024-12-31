/**
 * 두 객체가 얕은 의미에서 같은지 비교하는 함수
 * @param objA 비교할 첫 번째 객체
 * @param objB 비교할 두 번째 객체
 * @returns 두 객체가 같으면 true, 그렇지 않으면 false
 */
export function shallowEquals<T>(objA: T, objB: T): boolean {
  // 참조 비교
  if (objA === objB) {
    return true;
  }

  // 객체 타입 및 null 체크
  if (!objA || !objB || typeof objA !== "object" || typeof objB !== "object") {
    return false;
  }

  // 키 개수 및 값 비교
  const keysA = Object.keys(objA);
  return (
    keysA.length === Object.keys(objB).length &&
    keysA.every(
      (key) =>
        (objA as Record<string, unknown>)[key] ===
        (objB as Record<string, unknown>)[key],
    )
  );
}
