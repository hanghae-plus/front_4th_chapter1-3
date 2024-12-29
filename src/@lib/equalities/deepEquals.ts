// 두 값의 깊은 비교를 수행합니다
export function deepEquals<T>(objA: T, objB: T): boolean {
  // 1. 두 값이 정확히 같은지 확인 (참조가 같은 경우)
  if (objA === objB) {
    return true;
  }

  // 2. 둘 중 하나라도 객체가 아닌 경우 처리
  if (
    typeof objA !== "object" ||
    objA === null ||
    typeof objB !== "object" ||
    objB === null
  ) {
    return false;
  }

  // 3. 배열인 경우 처리
  if (Array.isArray(objA) && Array.isArray(objB)) {
    if (!Array.isArray(objB) || objA.length !== objB.length) {
      return false;
    }

    for (let i = 0; i < objA.length; i++) {
      if (!deepEquals(objA[i], objB[i])) {
        return false;
      }
    }
    return true;
  }

  // 4. 객체의 키 개수가 다른 경우 처리
  const keysA = Object.keys(objA as object);
  const keysB = Object.keys(objB as object);
  if (keysA.length !== keysB.length) {
    return false;
  }

  // 5. 모든 키에 대해 깊은 비교 수행
  for (const key of keysA) {
    if (
      // Q. hasOwn에 에러가 발생합니다 어떻게 수정해야 좋을까요
      !Object.hasOwn(objB as object, key) ||
      !deepEquals((objA as any)[key], (objB as any)[key])
    ) {
      return false;
    }
  }
  return true;
}
