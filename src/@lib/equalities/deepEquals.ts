export function deepEquals<T>(objA: T, objB: T): boolean {
  // 1. 기본 타입이거나 null인 경우 처리
  if (objA === objB) {
    return true; // 값이 같으면 true
  }
  // >> null이거나 기본 타입이 다르면 false
  if (
    objA === null ||
    objB === null ||
    typeof objA !== "object" ||
    typeof objB !== "object"
  ) {
    return false;
  }

  // 2. 둘 다 객체인 경우
  // 2-1. 배열인지 확인
  if (Array.isArray(objA) && Array.isArray(objB)) {
    // 배열 길이체크
    if (objA.length !== objB.length) {
      return false;
    }
    // 재귀적 호출로 배열 요소 체크
    for (let i = 0; i < objA.length; i++) {
      if (!deepEquals(objA[i], objB[i])) {
        return false;
      }
    }
    // 배열이 같을때 true
    return true;
  }

  // 2-2. 객체의 키 개수가 다른 경우 처리
  //const keysA = Object.keys(objA);
  //const keysB = Object.keys(objB);

  // typescript 배열타입선언
  const keysA = Object.keys(objA) as Array<keyof T>;
  const keysB = Object.keys(objB) as Array<keyof T>;

  if (keysA.length !== keysB.length) {
    return false;
  }

  for (const key of keysA) {
    if (!deepEquals(objA[key], objB[key])) {
      return false;
    }
  }

  return true;
}
