// 두 값의 얕은 비교를 수행합니다
export function shallowEquals<T extends object>(objA: T, objB: T): boolean {
  // 1. 두 값이 정확히 같은지 확인 (참조가 같은 경우)
  if (objA === objB) {
    return true;
  }

  // 2. 타입 체크 - null도 함께 처리
  // (typeof null === "object"이지만, null은 falsy value이므로
  // 조건문에서 false로 평가됩니다)
  if (!objA || !objB || typeof objA !== "object" || typeof objB !== "object") {
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
    if (objA[key as keyof T] !== objB[key as keyof T]) {
      return false;
    }
  }
  return true;
}
