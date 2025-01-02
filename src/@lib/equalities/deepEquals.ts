// deepEquals 함수는 두 값의 깊은 비교를 수행합니다.

export function deepEquals<T>(objA: T, objB: T): boolean {
  // 1. 기본 타입이거나 null인 경우 처리
  if (objA === objB) {
    return true;
  }

  // 2. 둘 다 객체인 경우:
  if (
    objA !== null &&
    objB !== null &&
    typeof objA === "object" &&
    typeof objB === "object"
  ) {
    //    - 배열인지 확인
    if (Array.isArray(objA) && Array.isArray(objB)) {
      //    - 배열의 길이가 다른 경우 처리
      if (objA.length !== objB.length) {
        return false;
      }
      //    - 재귀적으로 각 속성에 대해 deepEquals 호출
      for (let i = 0; i < objA.length; i++) {
        if (!deepEquals(objA[i], objB[i])) {
          return false;
        }
      }
      return true;
    }
    //    - 객체의 키 개수가 다른 경우 처리
    if (Object.keys(objA).length !== Object.keys(objB).length) {
      return false;
    }
    //    - 재귀적으로 각 속성에 대해 deepEquals 호출
    for (const key in objA) {
      if (Object.prototype.hasOwnProperty.call(objA, key)) {
        if (!deepEquals(objA[key], objB[key])) {
          return false;
        }
      }
    }
    return true;
  }
  // 3. 기본형 비교
  return false;
}
