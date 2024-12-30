/**
 * 얕은 비교를 수행하는 함수
 * @param objA 비교할 첫 번째 값
 * @param objB 비교할 두 번째 값
 * @returns 두 값이 얕은 수준에서 동일하면 true, 그렇지 않으면 false를 반환
 */
export function shallowEquals<T>(objA: T, objB: T): boolean {
  // 1. 두 값이 정확히 같은지 확인 (참조가 같은 경우)
  if (objA === objB) {
    return true;
  }
  // 2. 둘 중 하나라도 객체가 아닌 경우 처리
  if (
    objA == null ||
    objB == null ||
    typeof objA !== "object" ||
    typeof objB !== "object"
  ) {
    return false;
  }
  // 3. 객체의 키 개수가 다른 경우 처리
  const keysA = Object.keys(objA);
  const keysB = Object.keys(objB);

  if (keysA.length !== keysB.length) {
    return false;
  }

  // 4. 모든 키에 대해 얕은 비교 수행
  for (const key of keysA) {
    if (
      !Object.prototype.hasOwnProperty.call(objB, key) ||
      (objA as Record<string, unknown>)[key] !==
        (objB as Record<string, unknown>)[key]
    ) {
      return false;
    }
  }

  return true;
}
