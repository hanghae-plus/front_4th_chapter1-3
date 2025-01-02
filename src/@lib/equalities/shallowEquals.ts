// 얕은 비교
export function shallowEquals<T>(objA: T, objB: T): boolean {
  
  // 두 값이 정확히 같은지 확인(참조가 같은 경우)
  if (objA === objB) {
    return true;
  }
  // 하나라고 null이면 false이다. 둘 다 null인 경우는 위의 if문에서 처리됨
  if (objA === null || objB === null) {
    return false;
  }
  
  // 둘 다 객체인 경우(배열 포함)
  if (typeof objA === "object" && typeof objB === "object") {
    const objAKeys = Object.keys(objA);
    const objBKeys = Object.keys(objB);
    if (objAKeys.length !== objBKeys.length) {
      return false;
    } else {
      for (const key of objAKeys) {
        if (objA[key] !== objB[key]) {
          return false;
        }
      }
      return true;
    }
  // 모두 아닌 경우
  } else {
    return objA === objB;
  }
}
