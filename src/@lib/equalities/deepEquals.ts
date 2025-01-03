export function deepEquals<T>(objA: T, objB: T): boolean {
  // 1. 기본 타입이거나 null인 경우 처리
  // primitive type 외에는 모두 Object를 상속받음.
  // symbole은 deepEquals 시 비교 X -> 필요시 추후 구현
  // Q. 그냥 objA === objB로 비교해도 되지 않나?
  if (
    typeof objA !== "object" ||
    objA === null ||
    typeof objB !== "object" ||
    objB === null
  ) {
    return objA === objB;
  }

  // 2. 둘 다 객체인 경우:
  //    - 배열인지 확인
  //    - 객체의 키 개수가 다른 경우 처리
  //    - 재귀적으로 각 속성에 대해 deepEquals 호출
  if (Array.isArray(objA) && Array.isArray(objB)) {
    if (objA.length !== objB.length) {
      return false;
    }

    for (let i = 0; i < objA.length; i++) {
      if (!deepEquals(objA[i], objB[i])) {
        return false;
      }
    }
  } else {
    // 두 객체의 키 개수가 다른 경우
    const keysA = Object.keys(objA) as (keyof T)[];
    const keysB = Object.keys(objB) as (keyof T)[];

    if (keysA.length !== keysB.length) {
      return false;
    }

    for (const key of keysA) {
      if (
        // general하게 사용되는 deepEquals이므로, Object.prototype.hasOwnProperty를 사용 (call로 매핑해줌으로써, 예외상황을 처리)
        !Object.prototype.hasOwnProperty.call(objB, key) ||
        !deepEquals(objA[key], objB[key])
      ) {
        return false;
      }
    }
  }

  // 이 부분을 적절히 수정하세요.
  return true;
}
