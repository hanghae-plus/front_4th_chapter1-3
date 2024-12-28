export function deepEquals<T>(objA: T, objB: T): boolean {
  if (objA === objB) {
    return true;
  }

  // 1. 기본 타입이거나 null인 경우 처리
  // NOTE: 기본 타입인 경우는 object가 아니고 function도 아닌 경우를 뜻함
  if (
    (typeof objA !== "object" && typeof objA !== "function") ||
    (typeof objB !== "object" && typeof objB !== "function")
  ) {
    return objA === objB;
  }

  if (objA === null || objB === null) {
    return false;
  }

  // 2. 둘 다 객체인 경우:
  //    - 배열인 경우
  if (Array.isArray(objA) && Array.isArray(objB)) {
    if (objA.length !== objB.length) {
      return false;
    }
    return objA.every((item, index) => deepEquals(item, objB[index]));
  }

  //    -한쪽만 배열인 경우
  if (Array.isArray(objA) || Array.isArray(objB)) {
    return false;
  }

  //    - 객체의 키 개수가 다른 경우 처리
  const keysA = Object.keys(objA);
  const keysB = Object.keys(objB);

  if (keysA.length !== keysB.length) {
    return false;
  }

  // 나머지 타입일 경우 재귀적으로 비교
  return keysA.every((key) =>
    // NOTE: 타입 단언 문법 없이 String일 때 에러가 발생해서 key as keyof typeof objA 추가
    deepEquals(objA[key as keyof typeof objA], objB[key as keyof typeof objB]),
  );
}
