//    - 재귀적으로 각 속성에 대해 deepEquals 호출
export function deepEquals<T>(objA: T, objB: T): boolean {
  if (objA === objB) {
    return true;
  }
  // 2. 둘 다 객체인 경우:
  //    - 배열인지 확인
  if (Array.isArray(objA) && Array.isArray(objB)) {
    return objA.every((v, i) => deepEquals(v, objB[i]));
  }

  //    - 객체의 키 개수가 다른 경우 처리
  if (
    typeof objA === "object" &&
    typeof objB === "object" &&
    Object.keys(objA).length === Object.keys(objB).length
  ) {
    return Object.keys(objA).every((key) => deepEquals(objA[key], objB[key]));
  }

  return false;
}
