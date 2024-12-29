export function shallowEquals<T>(objA: T, objB: T): boolean {
  // 두 값이 정확히 같은지 확인 (참조가 같은 경우)
  if (objA === objB) {
    return true;
  }
  // 둘 중 하나라도 객체가 아닌 경우 처리
  if (typeof objA !== "object" || typeof objB !== "object") {
    return false;
  }
  // 객체의 키 개수가 다른 경우 처리
  if (Object.keys({ objA }).length !== Object.keys({ objB }).length) {
    return false;
  }
  // 객체 안에 얕은 비교
  if (objA && objB && !Array.isArray(objA) && !Array.isArray(objB)) {
    let isShallowEqual = false;
    for (const key in objA) {
      if (objA[key] !== objB[key]) {
        isShallowEqual = false;
      } else {
        isShallowEqual = true;
      }
    }
    return isShallowEqual;
  }
  // 배열 안에 얕은 비교
  if (Array.isArray(objA) && Array.isArray(objB)) {
    return objA.every((value, index) => value === objB[index]);
  }
  return objA === objB;
}
