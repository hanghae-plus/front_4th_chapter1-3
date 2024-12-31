export function shallowEquals<T>(objA: T, objB: T): boolean {
  
  // 두 값이 정확히 같은지 확인(참조가 같은 경우)
  if (objA === objB) {
    return true;
  }
    
  if (objA === null || objB === null) {
    return objA === objB;
  }
  
  if (typeof objA === "object" && typeof objB === "object") {
    if (Object.keys(objA).length !== Object.keys(objB).length) {
      return false;
    } else {
      for (const key of Object.keys(objA)) {
        if (objA[key] !== objB[key]) {
          return false;
        }
      }
      return true;
    }
  } else {
    return objA === objB;
  }
}
