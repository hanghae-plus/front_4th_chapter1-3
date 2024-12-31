// 깊은 비교
export function deepEquals<T>(objA: T, objB: T): boolean {
  // 원시 타입이 같은 경우 확실한 true이다.
  if (objA === objB) {
    return true;
  }
  // 하나라도 null이 있을 경우
  if (objA === null || objB === null) {
    return objA === objB;
  }
  
  // 타입이 객체인 경우(배열 포함)
  if (typeof objA === "object" && typeof objB === "object") {
    const keysA = Object.keys(objA);
    const keysB = Object.keys(objB);
    
    // 키 길이가 같은 경우 return false;
    if (keysA.length !== keysB.length) {
      return false;
    }
    
    for (const key of keysA) {
      // keysB에 keysA에 있는 키가 없는 경우
      if (!keysB.includes(key)) {
        return false;
      }
      // 항상 objA[key], objB[key]를 재귀적으로 deepEquals를 해주는게 포인트
      if (!deepEquals(objA[key], objB[key])) {
        return false;
      }
    }
    // key와 value가 모두 같다면 return true
    return true;
  }
  // 어떠한 경우도 아니면 false
  return false;
}