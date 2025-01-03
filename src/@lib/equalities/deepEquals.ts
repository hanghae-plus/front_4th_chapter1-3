// deepEquals 함수는 두 값의 깊은 비교를 수행합니다.
export function deepEquals<T>(objA: T, objB: T): boolean {
  // 1. 기본 타입이거나 null인 경우 처리
  if (objA === objB) {
    return true;
  }

  if (objA === null || objB === null) {
    return false;
  }
  // 2. 둘 다 객체인 경우:
  // - 재귀적으로 각 속성에 대해 deepEquals 호출
  if (typeof objA === "object" && typeof objB === "object") {
    //    - 배열인지 확인
    if (Array.isArray(objA) && Array.isArray(objB)) {
      if (objA.length !== objB.length) {
        return false;
      }
      return objA.every((item, index) => deepEquals(item, objB[index]));
    }

    const keysA = Object.keys(objA);
    const keysB = Object.keys(objB);
    // - 객체의 키 개수가 다른 경우 처리
    if (keysA.length !== keysB.length) {
      return false;
    }
    return keysA.every((key) =>
      deepEquals(
        (objA as { [key: string]: object })[key],
        (objB as { [key: string]: object })[key],
      ),
    );
  }
  // 이 부분을 적절히 수정하세요.
  return objA === objB;
}
