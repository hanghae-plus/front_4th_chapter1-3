// 1. 기본 타입이거나 null인 경우 처리

// 2. 둘 다 객체인 경우:
//    - 배열인지 확인
//    - 객체의 키 개수가 다른 경우 처리
//    - 재귀적으로 각 속성에 대해 deepEquals 호출

export function deepEquals<T>(objA: T, objB: T): boolean {
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

  //4. 배열 처리
  const isArrayA = Array.isArray(objA);
  const isArrayB = Array.isArray(objB);

  if (isArrayA !== isArrayB) {
    return false;
  }

  if (isArrayA && isArrayB) {
    if (objA.length !== objB.length) {
      return false;
    }

    return objA.every((item, index) => deepEquals(item, objB[index]));
  }

  //5. 객체 처리
  const keysA = Object.keys(objA);
  const keysB = Object.keys(objB);

  if (keysA.length !== keysB.length) {
    return false;
  }

  return keysA.every((key) => {
    const valueA = (objA as Record<string, unknown>)[key];
    const valueB = (objB as Record<string, unknown>)[key];

    if (
      typeof valueA === "object" &&
      typeof valueB === "object" &&
      valueA !== null &&
      valueB !== null
    ) {
      return deepEquals(valueA, valueB);
    }

    return valueA === valueB;
  });
}
