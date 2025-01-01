//최상위 값만 비교
// 1. 두 값이 정확히 같은지 확인 (참조가 같은 경우)
// 2. 둘 중 하나라도 객체가 아닌 경우 처리
// 3. 객체의 키 개수가 다른 경우 처리
// 4. 모든 키에 대해 얕은 비교 수행

export function shallowEquals<T>(objA: T, objB: T): boolean {
  // 1. 두 값이 참조가 같은 경우
  if (objA === objB) {
    return true;
  }

  // 2. 둘 중 하나가 객체가 아닌 경우
  if (typeof objA !== "object" || typeof objB !== "object") {
    return false;
  }

  // 3. null 처리
  if (objA === null || objB === null) {
    return false;
  }

  // 4. 배열 여부 확인
  const isArrayA = Array.isArray(objA);
  const isArrayB = Array.isArray(objB);

  if (isArrayA !== isArrayB) {
    return false; // 하나는 배열이고 다른 하나는 객체인 경우 다름
  }

  // 5. 배열일 경우 얕은 비교
  if (isArrayA && isArrayB) {
    if (objA.length !== objB.length) {
      return false;
    }

    return objA.every((item, index) => objB[index] === item);
  }

  // 6. 객체일 경우 얕은 비교
  const keysA = Object.keys(objA);
  const keysB = Object.keys(objB);

  if (keysA.length !== keysB.length) {
    return false; // 키 개수가 다른 경우
  }

  return keysA.every(
    (key) =>
      (objA as Record<string, unknown>)[key] ===
      (objB as Record<string, unknown>)[key],
  );
}
