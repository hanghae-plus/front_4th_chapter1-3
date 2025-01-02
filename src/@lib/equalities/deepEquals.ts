// deepEquals 함수는 두 값의 깊은 비교를 수행합니다.
export function deepEquals<T>(objA: T, objB: T): boolean {
  if (objA === objB) return true;

  // 1. 기본 타입이거나 null인 경우 처리
  if (typeof objA !== "object" || typeof objB !== "object")
    return Object.is(objA, objB);

  if (objA === null || objB === null) return Object.is(objA, objB);

  // 2. 둘 다 객체인 경우:

  if (typeof objA === "object" && typeof objB === "object") {
    //    - 배열인지 확인
    if (Array.isArray(objA) && Array.isArray(objB)) {
      return objA.every((value, index) => deepEquals(value, objB[index]));
    }

    //    - 객체의 키 개수가 다른 경우 처리
    const countObjectA = Object.keys(objA);
    const countObjectB = Object.keys(objB);

    if (countObjectA.length !== countObjectB.length) {
      return false;
    }

    //    - 재귀적으로 각 속성에 대해 deepEquals 호출
    return countObjectA.every((key) =>
      deepEquals(objA[key as keyof T], objB[key as keyof T]),
    );
  }

  return false;
}
